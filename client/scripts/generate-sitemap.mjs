// Generates public/sitemap.xml and dist/sitemap.xml automatically from route-meta.mjs and published blogs
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { SERVICES, SITE_URL } from './route-meta.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.resolve(__dirname, '../public')
const distDir = path.resolve(__dirname, '../dist')

const today = new Date().toISOString().split('T')[0]

const getPriorityAndFreq = (route) => {
  if (route === '/') return { priority: '1.0', changefreq: 'daily' }
  if (['/services', '/contact'].includes(route)) return { priority: '0.9', changefreq: 'weekly' }
  if (['/who-we-are'].includes(route)) return { priority: '0.9', changefreq: 'monthly' }
  if (['/blog'].includes(route)) return { priority: '0.85', changefreq: 'daily' }
  if (['/careers', '/sitemap'].includes(route)) return { priority: '0.8', changefreq: 'weekly' }
  if (['/privacy', '/terms', '/cookies'].includes(route)) return { priority: '0.5', changefreq: 'yearly' }
  // All B2B service offerings
  return { priority: '0.85', changefreq: 'monthly' }
}

export async function generateSitemapXml() {
  const canonicalRoutes = [
    // Primary Pages
    '/',
    '/who-we-are',
    '/services',
    '/blog',
    '/careers',
    '/contact',
    '/sitemap',
    // Service Pages (from SERVICES definition in route-meta.mjs)
    ...SERVICES.map((s) => s.path),
    // Legal & Compliance Pages
    '/privacy',
    '/terms',
    '/cookies',
  ]

  const uniqueRoutes = [...new Set(canonicalRoutes)].filter(
    (route) => route !== '/demand-generation'
  )

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`

  for (const route of uniqueRoutes) {
    const { priority, changefreq } = getPriorityAndFreq(route)
    const loc = `${SITE_URL}${route === '/' ? '/' : route}`
    xml += `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>\n`
  }

  // Fetch published blogs if DB is reachable
  try {
    const dbModule = await import('../../server/config/db.js').catch(() => null)
    if (dbModule?.default) {
      const db = dbModule.default
      const [blogs] = await db.execute(`
        SELECT 
          b.slug, 
          b.canonical_url,
          b.updated_at,
          b.published_at,
          b.created_at,
          b.robots,
          s.canonical_url AS s_canonical_url,
          s.robots AS s_robots
        FROM blogs b
        LEFT JOIN seo_metadata s ON s.entity_type = 'blog' AND (s.entity_id = CAST(b.id AS CHAR) OR s.entity_id = b.slug COLLATE utf8mb4_unicode_ci)
        WHERE (b.status = 'published' OR (b.status = 'scheduled' AND b.scheduled_at IS NOT NULL AND b.scheduled_at <= NOW()))
          AND (b.robots IS NULL OR b.robots NOT LIKE '%noindex%')
          AND (s.robots IS NULL OR s.robots NOT LIKE '%noindex%')
        ORDER BY COALESCE(b.updated_at, b.published_at, b.created_at) DESC
      `)

      const seenUrls = new Set()
      for (const blog of blogs) {
        if (!blog.slug) continue
        let loc = blog.canonical_url || blog.s_canonical_url
        if (loc) {
          loc = loc.trim()
          if (!loc.startsWith('http://') && !loc.startsWith('https://')) {
            loc = `${SITE_URL}${loc.startsWith('/') ? '' : '/'}${loc}`
          }
        } else {
          loc = `${SITE_URL}/blog/${blog.slug}`
        }

        if (seenUrls.has(loc)) continue
        seenUrls.add(loc)

        const d = blog.updated_at || blog.published_at || blog.created_at || new Date()
        const lastmod = new Date(d).toISOString().split('T')[0]
        xml += `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>\n`
      }
    }
  } catch {
    // Dynamic sitemap served by Express will serve full list at runtime
  }

  xml += '</urlset>\n'
  return xml
}

const xml = await generateSitemapXml()

// Write to public/sitemap.xml
fs.mkdirSync(publicDir, { recursive: true })
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml, 'utf8')
console.log(`generate-sitemap: wrote public/sitemap.xml (${today})`)

// Also write to dist/sitemap.xml if dist directory exists
if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml, 'utf8')
  console.log(`generate-sitemap: updated dist/sitemap.xml`)
}

process.exit(0)
