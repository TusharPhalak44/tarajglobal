import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import db from '../config/db.js'
import { formatAuthorName } from '../utils/authorFormatter.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SITE_URL = (process.env.SITE_URL || 'https://tarajglobal.com').replace(/\/+$/, '')
const DEFAULT_IMAGE = `${SITE_URL}/OnlyTG-%203.png`

// HTML entity escaper
const esc = (s) =>
  String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

// In-memory HTML cache with TTL
const htmlCache = new Map()
const CACHE_TTL_MS = 10 * 60 * 1000 // 10 minutes

/**
 * Invalidate HTML cache for a specific slug or all blogs
 */
export const invalidateBlogCache = (slugOrId = null) => {
  if (!slugOrId) {
    htmlCache.clear()
    console.log('🧹 [BlogSeoRenderer] Cleared entire blog HTML cache')
    return
  }
  const key = String(slugOrId).toLowerCase().trim()
  let deleted = 0
  for (const cacheKey of htmlCache.keys()) {
    if (cacheKey === key || cacheKey.includes(key)) {
      htmlCache.delete(cacheKey)
      deleted++
    }
  }
  console.log(`🧹 [BlogSeoRenderer] Invalidated ${deleted} cache entries for: ${slugOrId}`)
}

/**
 * Locate and read base HTML template
 */
let cachedProdTemplate = null
let prodTemplateMtime = 0
let cachedDevTemplate = null
let devTemplateMtime = 0

const getBaseTemplate = (isDev = false) => {
  const devPaths = [
    path.resolve(process.cwd(), 'client', 'index.html'),
    path.resolve(process.cwd(), '..', 'client', 'index.html'),
    path.resolve(__dirname, '..', '..', 'client', 'index.html'),
  ]

  const prodPaths = [
    path.resolve(process.cwd(), 'client', 'dist', 'index.html'),
    path.resolve(process.cwd(), '..', 'client', 'dist', 'index.html'),
    path.resolve(__dirname, '..', '..', 'client', 'dist', 'index.html'),
    path.resolve('/usr/share/nginx/html/index.html'),
  ]

  const candidatePaths = isDev
    ? [...devPaths, ...prodPaths]
    : [...prodPaths, ...devPaths]

  for (const p of candidatePaths) {
    try {
      if (fs.existsSync(p)) {
        const stats = fs.statSync(p)
        if (isDev) {
          if (!cachedDevTemplate || stats.mtimeMs > devTemplateMtime) {
            cachedDevTemplate = fs.readFileSync(p, 'utf8')
            devTemplateMtime = stats.mtimeMs
          }
          return cachedDevTemplate
        } else {
          if (!cachedProdTemplate || stats.mtimeMs > prodTemplateMtime) {
            cachedProdTemplate = fs.readFileSync(p, 'utf8')
            prodTemplateMtime = stats.mtimeMs
          }
          return cachedProdTemplate
        }
      }
    } catch {
      // Continue to next candidate
    }
  }

  // Minimal fallback template if no file found
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body>
  <div id="root"></div>
</body>
</html>`
}

/**
 * Format image URL to ensure absolute URL with proper protocol
 */
const toAbsoluteUrl = (img) => {
  if (!img || typeof img !== 'string') return DEFAULT_IMAGE
  const trimmed = img.trim()
  if (!trimmed) return DEFAULT_IMAGE
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed
  if (trimmed.startsWith('//')) return `https:${trimmed}`
  const cleanPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  return `${SITE_URL}${cleanPath}`
}

/**
 * Format canonical URL
 */
const toCanonicalUrl = (canonical, slug) => {
  if (canonical && typeof canonical === 'string' && canonical.trim()) {
    const trimmed = canonical.trim()
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed
    const cleanPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
    return `${SITE_URL}${cleanPath}`
  }
  return `${SITE_URL}/blog/${slug}`
}

/**
 * Clean text from HTML/markdown tags and excessive whitespace
 */
const cleanExcerpt = (text, maxLength = 160) => {
  if (!text) return ''
  const stripped = String(text)
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  if (stripped.length <= maxLength) return stripped
  return stripped.substring(0, maxLength).trimEnd() + '...'
}

/**
 * Fetch blog data and SEO metadata from database
 */
export const fetchBlogWithSeo = async (slug, isPreview = false) => {
  const idVal = isNaN(slug) ? 0 : parseInt(slug, 10)

  const whereClause = isPreview
    ? 'WHERE (b.slug = ? OR b.id = ?)'
    : `WHERE (b.slug = ? OR b.id = ?) AND (
        b.status = 'published' OR 
        (b.status = 'scheduled' AND b.scheduled_at IS NOT NULL AND b.scheduled_at <= NOW())
      )`

  const query = `
    SELECT 
      b.*,
      s.meta_title AS s_meta_title,
      s.meta_description AS s_meta_description,
      s.meta_keywords AS s_meta_keywords,
      s.canonical_url AS s_canonical_url,
      s.og_title AS s_og_title,
      s.og_description AS s_og_description,
      s.og_image AS s_og_image,
      s.twitter_title AS s_twitter_title,
      s.twitter_description AS s_twitter_description,
      s.twitter_image AS s_twitter_image,
      s.robots AS s_robots,
      s.structured_data AS s_structured_data,
      c.name AS category_name,
      c.slug AS category_slug,
      CASE
        WHEN u.name IS NOT NULL AND u.name != '' AND u.name NOT LIKE '%@%' THEN u.name
        WHEN a.name IS NOT NULL AND a.name != '' AND a.name NOT LIKE '%@%' THEN a.name
        ELSE COALESCE(u.name, a.name, 'Taraj Global')
      END AS author_name,
      COALESCE(u.avatar, a.profile_photo) AS author_photo,
      COALESCE(a.designation, u.department, 'Author & Contributor') AS author_designation
    FROM blogs b
    LEFT JOIN seo_metadata s ON s.entity_type = 'blog' AND (s.entity_id = CAST(b.id AS CHAR) OR s.entity_id = b.slug COLLATE utf8mb4_unicode_ci)
    LEFT JOIN categories c ON b.category_id = c.id
    LEFT JOIN authors a ON b.author_id = a.id
    LEFT JOIN users u ON u.id = IFNULL(b.created_by, a.user_id)
    ${whereClause}
    ORDER BY b.id DESC
    LIMIT 1
  `

  const [rows] = await db.execute(query, [slug, idVal])
  if (!rows || rows.length === 0) return null

  const blog = rows[0]
  blog.author_name = formatAuthorName(blog.author_name || 'Taraj Global')
  blog.featured_image = blog.featured_image || blog.image
  blog.image = blog.image || blog.featured_image

  return blog
}

/**
 * Build resolved SEO metadata object with proper fallback hierarchy
 */
export const resolveBlogSeoMetadata = (blog) => {
  const baseTitle = (blog.seo_title || blog.s_meta_title || blog.title || '').trim()
  const pageTitle = baseTitle
    ? (baseTitle.includes('Taraj Global') ? baseTitle : `${baseTitle} | Taraj Global`)
    : 'B2B Strategy & Insights | Taraj Global'

  const metaDescription = (
    blog.seo_description ||
    blog.s_meta_description ||
    blog.excerpt ||
    cleanExcerpt(blog.content) ||
    blog.title ||
    ''
  ).trim()

  const canonicalUrl = toCanonicalUrl(blog.canonical_url || blog.s_canonical_url, blog.slug)

  const metaKeywords = (
    blog.seo_keywords ||
    blog.s_meta_keywords ||
    `${blog.title}, B2B demand generation, ABM insights, Taraj Global`
  ).trim()

  const ogTitle = (
    blog.og_title ||
    blog.s_og_title ||
    blog.seo_title ||
    blog.s_meta_title ||
    blog.title ||
    pageTitle
  ).trim()

  const ogDescription = (
    blog.og_description ||
    blog.s_og_description ||
    metaDescription
  ).trim()

  const rawOgImage = blog.og_image || blog.s_og_image || blog.featured_image || blog.image
  const ogImage = toAbsoluteUrl(rawOgImage)

  const twitterTitle = (
    blog.twitter_title ||
    blog.s_twitter_title ||
    ogTitle
  ).trim()

  const twitterDescription = (
    blog.twitter_description ||
    blog.s_twitter_description ||
    ogDescription
  ).trim()

  const rawTwitterImage = blog.twitter_image || blog.s_twitter_image || rawOgImage
  const twitterImage = toAbsoluteUrl(rawTwitterImage)

  // Robots
  const rawRobots = blog.robots || blog.s_robots
  let robots = 'index, follow, max-image-preview:large'
  if (rawRobots) {
    if (rawRobots.includes('noindex')) {
      robots = 'noindex, nofollow'
    } else {
      robots = rawRobots
    }
  }

  // Schema JSON-LD
  const publishedDate = blog.published_at || blog.created_at || new Date().toISOString()
  const modifiedDate = blog.updated_at || blog.published_at || blog.created_at || new Date().toISOString()

  let customStructured = null
  if (blog.s_structured_data) {
    try {
      customStructured = typeof blog.s_structured_data === 'string'
        ? JSON.parse(blog.s_structured_data)
        : blog.s_structured_data
    } catch {
      customStructured = null
    }
  }

  const structuredData = customStructured || {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: blog.title,
        description: metaDescription,
        image: ogImage,
        datePublished: new Date(publishedDate).toISOString(),
        dateModified: new Date(modifiedDate).toISOString(),
        author: {
          '@type': 'Person',
          name: blog.author_name || 'Taraj Global'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Taraj Global',
          url: SITE_URL,
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/OnlyTG-%203.png`
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl
        }
      }
    ]
  }

  return {
    pageTitle,
    metaDescription,
    canonicalUrl,
    metaKeywords,
    ogTitle,
    ogDescription,
    ogImage,
    twitterTitle,
    twitterDescription,
    twitterImage,
    robots,
    structuredData
  }
}

/**
 * Render complete HTML for a blog post
 */
export const renderBlogHtml = async (slug, isPreview = false, isDev = false) => {
  const cacheKey = `${slug.toLowerCase().trim()}:${isPreview ? 'preview' : 'live'}:${isDev ? 'dev' : 'prod'}`

  // Serve from cache if available and not preview
  if (!isPreview) {
    const cached = htmlCache.get(cacheKey)
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return cached
    }
  }

  const blog = await fetchBlogWithSeo(slug, isPreview)
  const template = getBaseTemplate(isDev)

  if (!blog) {
    const notFoundHtml = template
      .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '')
      .replace(/<meta[^>]*data-prerender[^>]*>\s*/gi, '')
      .replace(/<link[^>]*data-prerender[^>]*>\s*/gi, '')
      .replace(/<script[^>]*data-prerender[^>]*>[\s\S]*?<\/script>\s*/gi, '')
      .replace(
        '</head>',
        `  <title>Article Not Found | Taraj Global</title>\n` +
        `  <meta data-prerender name="robots" content="noindex, nofollow" />\n` +
        `  <meta data-prerender name="description" content="The requested article could not be found." />\n` +
        `</head>`
      )

    const result = { statusCode: 404, html: notFoundHtml }
    if (!isPreview) htmlCache.set(cacheKey, { ...result, timestamp: Date.now() })
    return result
  }

  const seo = resolveBlogSeoMetadata(blog)

  const headTags = [
    `<title>${esc(seo.pageTitle)}</title>`,
    `<meta data-prerender name="description" content="${esc(seo.metaDescription)}" />`,
    `<link data-prerender rel="canonical" href="${esc(seo.canonicalUrl)}" />`,
    `<meta data-prerender name="keywords" content="${esc(seo.metaKeywords)}" />`,
    `<meta data-prerender name="robots" content="${esc(seo.robots)}" />`,
    `<meta data-prerender property="og:type" content="article" />`,
    `<meta data-prerender property="og:site_name" content="Taraj Global" />`,
    `<meta data-prerender property="og:title" content="${esc(seo.ogTitle)}" />`,
    `<meta data-prerender property="og:description" content="${esc(seo.ogDescription)}" />`,
    `<meta data-prerender property="og:url" content="${esc(seo.canonicalUrl)}" />`,
    `<meta data-prerender property="og:image" content="${esc(seo.ogImage)}" />`,
    `<meta data-prerender property="og:locale" content="en_US" />`,
    `<meta data-prerender name="twitter:card" content="summary_large_image" />`,
    `<meta data-prerender name="twitter:site" content="@tarajglobal" />`,
    `<meta data-prerender name="twitter:creator" content="@tarajglobal" />`,
    `<meta data-prerender name="twitter:title" content="${esc(seo.twitterTitle)}" />`,
    `<meta data-prerender name="twitter:description" content="${esc(seo.twitterDescription)}" />`,
    `<meta data-prerender name="twitter:image" content="${esc(seo.twitterImage)}" />`,
    `<script data-prerender type="application/ld+json">${JSON.stringify(seo.structuredData)}</script>`
  ].join('\n    ')

  const noscriptHtml = `<noscript>
    <article style="max-width:880px;margin:0 auto;padding:32px 20px;font-family:system-ui,-apple-system,sans-serif;line-height:1.6">
      <header>
        <p><a href="/blog">&larr; Back to all insights</a></p>
        <h1>${esc(blog.title)}</h1>
        <p><strong>Published:</strong> ${esc(new Date(blog.published_at || blog.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }))} | <strong>Author:</strong> ${esc(blog.author_name || 'Taraj Global')}</p>
      </header>
      <div class="excerpt"><p>${esc(blog.excerpt || '')}</p></div>
      <section class="content">${blog.content || ''}</section>
      <footer>
        <p><a href="/contact">Schedule a B2B strategy discussion with Taraj Global</a></p>
      </footer>
    </article>
  </noscript>`

  // Strip existing homepage or template head tags
  const renderedHtml = template
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '')
    .replace(/<meta[^>]*data-prerender[^>]*>\s*/gi, '')
    .replace(/<link[^>]*data-prerender[^>]*>\s*/gi, '')
    .replace(/<script[^>]*data-prerender[^>]*>[\s\S]*?<\/script>\s*/gi, '')
    .replace('</head>', `    ${headTags}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root"></div>\n  ${noscriptHtml}`)

  const result = { statusCode: 200, html: renderedHtml, seo }
  if (!isPreview) {
    htmlCache.set(cacheKey, { ...result, timestamp: Date.now() })
  }
  return result
}
