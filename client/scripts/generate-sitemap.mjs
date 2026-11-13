// Generates public/sitemap.xml and dist/sitemap.xml automatically from route-meta.mjs
// This ensures that whenever routes, services, or website pages are added or updated,
// the XML sitemap is kept in sync with the current build date and canonical URLs.
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

export function generateSitemapXml() {
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

  xml += '</urlset>\n'
  return xml
}

const xml = generateSitemapXml()

// Write to public/sitemap.xml
fs.mkdirSync(publicDir, { recursive: true })
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml, 'utf8')
console.log(`generate-sitemap: wrote public/sitemap.xml (${today})`)

// Also write to dist/sitemap.xml if dist directory exists
if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml, 'utf8')
  console.log(`generate-sitemap: updated dist/sitemap.xml`)
}

