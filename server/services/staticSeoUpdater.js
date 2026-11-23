import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { invalidatePageCache } from './pageSeoRenderer.js'
import { invalidateBlogCache } from './blogSeoRenderer.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const esc = (s) =>
  String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

/**
 * Synchronize static prerendered HTML file on disk when SEO is updated via Admin Panel.
 * This guarantees production crawlers, Ctrl+U view-source, and Nginx never serve stale metadata after CMS updates.
 */
export const updateStaticPrerenderFile = (entityType, entityId, meta = {}) => {
  try {
    // 1. Invalidate in-memory server HTML caches immediately
    if (entityType === 'page') {
      invalidatePageCache(entityId)
    } else if (entityType === 'blog') {
      invalidateBlogCache(entityId)
    }

    const candidateDistPaths = [
      path.resolve(__dirname, '../../client/dist'),
      path.resolve(process.cwd(), 'client', 'dist'),
      path.resolve(process.cwd(), 'dist'),
      '/usr/share/nginx/html'
    ]
    const distPath = candidateDistPaths.find((p) => fs.existsSync(p))

    const targetRelFiles = []
    if (entityType === 'page') {
      if (entityId === 'home') {
        targetRelFiles.push('index.html')
      } else {
        targetRelFiles.push(path.join(entityId, 'index.html'))
        if (entityId === 'who-we-are') targetRelFiles.push(path.join('about', 'index.html'))
        if (entityId === 'about') targetRelFiles.push(path.join('who-we-are', 'index.html'))
      }
    } else if (entityType === 'blog') {
      targetRelFiles.push(path.join('blog', entityId, 'index.html'))
    }

    if (distPath) {
      for (const relFile of targetRelFiles) {
        const filePath = path.join(distPath, relFile)
        const fileDir = path.dirname(filePath)

        // If file doesn't exist yet, try to create it using dist/index.html as template
        if (!fs.existsSync(filePath)) {
          const rootTemplate = path.join(distPath, 'index.html')
          if (fs.existsSync(rootTemplate)) {
            try {
              fs.mkdirSync(fileDir, { recursive: true })
              fs.copyFileSync(rootTemplate, filePath)
            } catch (copyErr) {
              continue
            }
          } else {
            continue
          }
        }

        let html = fs.readFileSync(filePath, 'utf8')

        // Thoroughly replace ALL existing <title> tags to eliminate duplicates
        if (meta.meta_title) {
          const formattedTitle = meta.meta_title.includes('Taraj Global') || meta.meta_title.includes('TaRaj Global')
            ? meta.meta_title
            : `${meta.meta_title} | Taraj Global`

          html = html.replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '')
          html = html.replace('</head>', `  <title data-prerender>${esc(formattedTitle)}</title>\n</head>`)

          // OG & Twitter Title
          const ogTitle = meta.og_title || formattedTitle
          html = html.replace(/<meta\s+[^>]*property=["']og:title["'][^>]*>\s*/gi, '')
          html = html.replace(/<meta\s+[^>]*name=["']twitter:title["'][^>]*>\s*/gi, '')
          html = html.replace('</head>', `  <meta data-prerender property="og:title" content="${esc(ogTitle)}" />\n  <meta data-prerender name="twitter:title" content="${esc(ogTitle)}" />\n</head>`)
        }

        // Meta Description
        if (meta.meta_description) {
          html = html.replace(/<meta\s+[^>]*name=["']description["'][^>]*>\s*/gi, '')
          html = html.replace(/<meta\s+[^>]*property=["']og:description["'][^>]*>\s*/gi, '')
          html = html.replace(/<meta\s+[^>]*name=["']twitter:description["'][^>]*>\s*/gi, '')
          html = html.replace('</head>', `  <meta data-prerender name="description" content="${esc(meta.meta_description)}" />\n  <meta data-prerender property="og:description" content="${esc(meta.og_description || meta.meta_description)}" />\n  <meta data-prerender name="twitter:description" content="${esc(meta.twitter_description || meta.meta_description)}" />\n</head>`)
        }

        // Canonical URL
        if (meta.canonical_url) {
          html = html.replace(/<link\s+[^>]*rel=["']canonical["'][^>]*>\s*/gi, '')
          html = html.replace(/<meta\s+[^>]*property=["']og:url["'][^>]*>\s*/gi, '')
          html = html.replace('</head>', `  <link data-prerender rel="canonical" href="${esc(meta.canonical_url)}" />\n  <meta data-prerender property="og:url" content="${esc(meta.canonical_url)}" />\n</head>`)
        }

        // Robots
        if (meta.robots) {
          html = html.replace(/<meta\s+[^>]*name=["']robots["'][^>]*>\s*/gi, '')
          html = html.replace('</head>', `  <meta data-prerender name="robots" content="${esc(meta.robots)}" />\n</head>`)
        }

        // Images
        if (meta.og_image) {
          html = html.replace(/<meta\s+[^>]*property=["']og:image["'][^>]*>\s*/gi, '')
          html = html.replace(/<meta\s+[^>]*name=["']twitter:image["'][^>]*>\s*/gi, '')
          html = html.replace('</head>', `  <meta data-prerender property="og:image" content="${esc(meta.og_image)}" />\n  <meta data-prerender name="twitter:image" content="${esc(meta.twitter_image || meta.og_image)}" />\n</head>`)
        }

        fs.writeFileSync(filePath, html, 'utf8')
        console.log(`✅ [StaticSeoUpdater] Synchronized disk HTML: ${filePath}`)
      }
    }

    // Also update dev template client/index.html if entityId is home
    if (entityType === 'page' && entityId === 'home') {
      const devIndexHtml = path.resolve(process.cwd(), 'client', 'index.html')
      if (fs.existsSync(devIndexHtml) && meta.meta_title) {
        let devHtml = fs.readFileSync(devIndexHtml, 'utf8')
        devHtml = devHtml.replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, `<title data-prerender>${esc(meta.meta_title)}</title>`)
        if (meta.meta_description) {
          devHtml = devHtml.replace(/(<meta[^>]*name=["']description["'][^>]*content=["'])[^"']*(")/i, `$1${esc(meta.meta_description)}$2`)
        }
        fs.writeFileSync(devIndexHtml, devHtml, 'utf8')
      }
    }
  } catch (err) {
    console.warn('⚠️ [StaticSeoUpdater] Could not update static prerender file:', err.message)
  }
}

export default updateStaticPrerenderFile
