// Post-build: write dist/<route>/index.html with route-specific <head> tags and a crawlable
// <noscript> fallback, so search engines and social previews get real content without JS.
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { ROUTES, SERVICES, SITE_URL, DEFAULT_IMAGE } from './route-meta.mjs'

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist')
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const navLinks = [
  ['/', 'Home'], ['/services', 'Services'], ['/about', 'About Us'], ['/blog', 'Blog'],
  ['/careers', 'Careers'], ['/contact', 'Contact Us'],
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

let count = 0
for (const [route, meta] of Object.entries(ROUTES)) {
  const html = render(route, meta)
  const outDir = route === '/' ? dist : path.join(dist, route.slice(1))
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, 'index.html'), html)
  count++
}
console.log(`prerender-meta: wrote ${count} route HTML files`)
