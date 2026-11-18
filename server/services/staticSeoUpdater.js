import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const esc = (s) =>
  String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

/**
 * Synchronize static prerendered HTML file on disk when SEO is updated via Admin Panel.
 * This guarantees production crawlers and Nginx never serve stale metadata after CMS updates.
 */
export const updateStaticPrerenderFile = (entityType, entityId, meta = {}) => {
  try {
    const candidateDistPaths = [
      path.resolve(__dirname, '../../client/dist'),
      path.resolve(process.cwd(), 'client', 'dist'),
      path.resolve(process.cwd(), 'dist'),
      '/usr/share/nginx/html'
    ]
    const distPath = candidateDistPaths.find((p) => fs.existsSync(p))
    if (!distPath) return

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

    for (const relFile of targetRelFiles) {
      const filePath = path.join(distPath, relFile)
      if (!fs.existsSync(filePath)) continue

      let html = fs.readFileSync(filePath, 'utf8')

      if (meta.meta_title) {
        if (html.includes('<title')) {
          html = html.replace(/<title[\s\S]*?<\/title>/i, `<title data-prerender>${esc(meta.meta_title)}</title>`)
        }
        if (html.includes('property="og:title"')) {
          html = html.replace(/(<meta[^>]*property=["']og:title["'][^>]*content=["'])[^"']*(")/i, `$1${esc(meta.og_title || meta.meta_title)}$2`)
        }
        if (html.includes('name="twitter:title"')) {
          html = html.replace(/(<meta[^>]*name=["']twitter:title["'][^>]*content=["'])[^"']*(")/i, `$1${esc(meta.twitter_title || meta.og_title || meta.meta_title)}$2`)
        }
      }

      if (meta.meta_description) {
        if (html.includes('name="description"')) {
          html = html.replace(/(<meta[^>]*name=["']description["'][^>]*content=["'])[^"']*(")/i, `$1${esc(meta.meta_description)}$2`)
        }
        if (html.includes('property="og:description"')) {
          html = html.replace(/(<meta[^>]*property=["']og:description["'][^>]*content=["'])[^"']*(")/i, `$1${esc(meta.og_description || meta.meta_description)}$2`)
        }
        if (html.includes('name="twitter:description"')) {
          html = html.replace(/(<meta[^>]*name=["']twitter:description["'][^>]*content=["'])[^"']*(")/i, `$1${esc(meta.twitter_description || meta.og_description || meta.meta_description)}$2`)
        }
      }

      if (meta.canonical_url) {
        if (html.includes('rel="canonical"')) {
          html = html.replace(/(<link[^>]*rel=["']canonical["'][^>]*href=["'])[^"']*(")/i, `$1${esc(meta.canonical_url)}$2`)
        }
        if (html.includes('property="og:url"')) {
          html = html.replace(/(<meta[^>]*property=["']og:url["'][^>]*content=["'])[^"']*(")/i, `$1${esc(meta.canonical_url)}$2`)
        }
      }

      if (meta.robots && html.includes('name="robots"')) {
        html = html.replace(/(<meta[^>]*name=["']robots["'][^>]*content=["'])[^"']*(")/i, `$1${esc(meta.robots)}$2`)
      }

      if (meta.og_image) {
        if (html.includes('property="og:image"')) {
          html = html.replace(/(<meta[^>]*property=["']og:image["'][^>]*content=["'])[^"']*(")/i, `$1${esc(meta.og_image)}$2`)
        }
        if (html.includes('name="twitter:image"')) {
          html = html.replace(/(<meta[^>]*name=["']twitter:image["'][^>]*content=["'])[^"']*(")/i, `$1${esc(meta.twitter_image || meta.og_image)}$2`)
        }
      }

      fs.writeFileSync(filePath, html, 'utf8')
      console.log(`✅ [StaticSeoUpdater] Synchronized disk HTML: ${filePath}`)
    }
  } catch (err) {
    console.warn('⚠️ [StaticSeoUpdater] Could not update static prerender file:', err.message)
  }
}

export default updateStaticPrerenderFile
