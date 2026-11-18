// Post-build: write dist/<route>/index.html with route-specific <head> tags and a crawlable
// <noscript> fallback, so search engines and social previews get real content without JS.
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { ROUTES, SERVICES, SITE_URL, DEFAULT_IMAGE } from './route-meta.mjs'

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist')
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

const esc = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const navLinks = [
  ['/', 'Home'], ['/services', 'Services'], ['/careers', 'Careers'], ['/blog', 'Blog'],
  ['/who-we-are', 'Who We Are'], ['/contact', 'Contact Us'],
]

function headTags(route, meta) {
  const url = `${SITE_URL}${route === '/' ? '/' : route}`
  const image = meta.image || DEFAULT_IMAGE
  return [
    `<title>${esc(meta.title)}</title>`,
    `<meta data-prerender name="description" content="${esc(meta.description)}" />`,
    `<link data-prerender rel="canonical" href="${url}" />`,
    `<meta data-prerender name="robots" content="index, follow, max-image-preview:large" />`,
    `<meta data-prerender property="og:type" content="website" />`,
    `<meta data-prerender property="og:site_name" content="Taraj Global" />`,
    `<meta data-prerender property="og:title" content="${esc(meta.title)}" />`,
    `<meta data-prerender property="og:description" content="${esc(meta.description)}" />`,
    `<meta data-prerender property="og:url" content="${url}" />`,
    `<meta data-prerender property="og:image" content="${image}" />`,
    `<meta data-prerender name="twitter:card" content="summary_large_image" />`,
    `<meta data-prerender name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta data-prerender name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta data-prerender name="twitter:image" content="${image}" />`,
  ].join('\n    ')
}

function noscript(meta) {
  const links = (list) => list.map(([href, label]) => `<li><a href="${href}">${esc(label)}</a></li>`).join('')
  return `<noscript>
    <main style="max-width:880px;margin:0 auto;padding:32px 20px;font-family:system-ui,sans-serif;line-height:1.6">
      <h1>${esc(meta.h1)}</h1>
      <p>${esc(meta.description)}</p>
      <p><a href="/contact">Book a discovery call with Taraj Global</a></p>
      <nav aria-label="Main"><ul>${links(navLinks)}</ul></nav>
      <h2>B2B lead generation services</h2>
      <ul>${links(SERVICES.map((s) => [s.path, s.name]))}</ul>
      <p>Taraj Global, The Space Business Complex, Office 512-517, Kharadi, Pune 411014, India. info@tarajglobal.com | +91-96655-99442</p>
    </main>
  </noscript>`
}

function render(route, meta) {
  return template
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .replace(/<meta[^>]*data-prerender[^>]*>\s*/g, '')
    .replace(/<link[^>]*data-prerender[^>]*>\s*/g, '')
    .replace('</head>', `    ${headTags(route, meta)}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root"></div>\n  ${noscript(meta)}`)
}

// 1. Fetch DB overrides if database is reachable
let dbOverrides = {}
try {
  const dbModule = await import('../../server/config/db.js').catch(() => null)
  if (dbModule?.default) {
    const [pageRows] = await dbModule.default.execute("SELECT * FROM seo_metadata WHERE entity_type = 'page'")
    for (const row of pageRows) {
      if (row.entity_id) {
        dbOverrides[row.entity_id] = row
      }
    }
  }
} catch (dbErr) {
  // DB unavailable; fall back to static route-meta.mjs definitions
}

// 2. Prerender static routes
let count = 0
for (const [route, defaultMeta] of Object.entries(ROUTES)) {
  const entityId = route === '/' ? 'home' : route.slice(1)
  const dbRow = dbOverrides[entityId] || (entityId === 'who-we-are' ? dbOverrides['about'] : null)

  const meta = {
    ...defaultMeta,
    title: dbRow?.meta_title || defaultMeta.title,
    description: dbRow?.meta_description || defaultMeta.description,
    canonical: dbRow?.canonical_url || `${SITE_URL}${route === '/' ? '/' : route}`,
    robots: dbRow?.robots || 'index, follow, max-image-preview:large',
    image: dbRow?.og_image || defaultMeta.image || DEFAULT_IMAGE,
  }

  const html = render(route, meta)
  const outDir = route === '/' ? dist : path.join(dist, route.slice(1))
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, 'index.html'), html)
  count++
}
console.log(`prerender-meta: wrote ${count} static route HTML files`)

// 3. Prerender published blogs if database is reachable
try {
  const { renderBlogHtml } = await import('../../server/services/blogSeoRenderer.js')
  const dbModule = await import('../../server/config/db.js').catch(() => null)
  if (dbModule?.default) {
    const db = dbModule.default
    const [blogs] = await db.execute(`
      SELECT slug FROM blogs 
      WHERE status = 'published' OR (status = 'scheduled' AND scheduled_at IS NOT NULL AND scheduled_at <= NOW())
    `)

    let blogCount = 0
    for (const b of blogs) {
      if (!b.slug) continue
      const { statusCode, html } = await renderBlogHtml(b.slug)
      if (statusCode === 200 && html) {
        try {
          const blogDir = path.join(dist, 'blog', b.slug)
          fs.mkdirSync(blogDir, { recursive: true })
          fs.writeFileSync(path.join(blogDir, 'index.html'), html, 'utf8')
          blogCount++
        } catch (writeErr) {
          console.warn(`prerender-meta: skipped static file for '${b.slug}':`, writeErr.message)
        }
      }
    }
    console.log(`prerender-meta: wrote ${blogCount} published blog HTML files to dist/blog/:slug/index.html`)
  }
} catch (blogErr) {
  console.log('prerender-meta notice: blog static prerender deferred to runtime server:', blogErr.message)
}

process.exit(0)
