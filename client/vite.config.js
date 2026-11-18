import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import viteCompression from 'vite-plugin-compression'
import { ROUTES, SITE_URL, DEFAULT_IMAGE } from './scripts/route-meta.mjs'

const esc = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({ algorithm: 'gzip' }),
    {
      name: 'mitel-asset-case-fallback',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && req.url.startsWith('/Mitel.png')) {
            req.url = req.url.replace('/Mitel.png', '/mitel.png')
          }
          next()
        })
      },
    },
    {
      name: 'blog-seo-dev-proxy',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          // Intercept dynamic blog URLs: /blog/:slug (excluding /blog, /blog/, or asset files)
          const urlMatch = req.url && req.url.match(/^\/blog\/([^/?#]+)(\/|\?.*)?$/)
          if (!urlMatch) {
            return next()
          }

          const slug = urlMatch[1]
          if (!slug || slug === 'index.html') {
            return next()
          }

          const accept = req.headers.accept || ''
          const isDocRequest = accept.includes('text/html') || !accept || accept === '*/*'
          if (!isDocRequest) {
            return next()
          }

          try {
            const http = await import('http')
            const zlib = await import('zlib')
            const queryPart = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : ''

            // Forward headers but force identity (uncompressed) encoding from backend
            const forwardedHeaders = { ...req.headers }
            delete forwardedHeaders['accept-encoding']
            delete forwardedHeaders['content-length']
            forwardedHeaders['accept-encoding'] = 'identity'
            forwardedHeaders['host'] = 'localhost:5001'
            forwardedHeaders['x-vite-dev'] = '1'

            const backendReq = http.request(
              {
                hostname: 'localhost',
                port: 5001,
                path: `/blog/${encodeURIComponent(slug)}${queryPart}`,
                method: req.method || 'GET',
                headers: forwardedHeaders,
              },
              (backendRes) => {
                const chunks = []
                backendRes.on('data', (chunk) => {
                  chunks.push(chunk)
                })
                backendRes.on('end', async () => {
                  try {
                    let buffer = Buffer.concat(chunks)
                    const encoding = backendRes.headers['content-encoding']
                    if (encoding === 'gzip') {
                      buffer = zlib.gunzipSync(buffer)
                    } else if (encoding === 'deflate') {
                      buffer = zlib.inflateSync(buffer)
                    } else if (encoding === 'br') {
                      buffer = zlib.brotliDecompressSync(buffer)
                    }
                    const rawHtml = buffer.toString('utf-8')
                    const transformedHtml = await server.transformIndexHtml(req.originalUrl || req.url, rawHtml)
                    res.statusCode = backendRes.statusCode || 200
                    res.setHeader('Content-Type', 'text/html; charset=utf-8')
                    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
                    res.end(transformedHtml)
                  } catch (transformErr) {
                    res.statusCode = backendRes.statusCode || 200
                    res.setHeader('Content-Type', 'text/html; charset=utf-8')
                    res.end(Buffer.concat(chunks).toString('utf-8'))
                  }
                })
              }
            )

            backendReq.on('error', (err) => {
              console.warn('[blog-seo-dev-proxy] Backend unavailable on 5001, falling back to Vite SPA:', err.message)
              next()
            })

            backendReq.end()
          } catch (err) {
            console.error('[blog-seo-dev-proxy] Error:', err)
            next()
          }
        })
      },
    },
    {
      name: 'dev-seo-html-transform',
      apply: 'serve',
      transformIndexHtml: {
        order: 'pre',
        async handler(html, ctx) {
          const rawUrl = ctx.originalUrl || ctx.path || '/'
          const cleanPath = rawUrl.split('?')[0].replace(/\/+$/, '') || '/'

          // Let blog-seo-dev-proxy handle dynamic blog detail pages
          if (cleanPath.startsWith('/blog/') && cleanPath !== '/blog' && cleanPath !== '/blog/index.html') {
            return html
          }

          // Alias resolution matching AppRoutes.jsx redirects
          const aliasMap = {
            '/about': '/who-we-are',
            '/about-us': '/who-we-are',
            '/company': '/who-we-are',
            '/career': '/careers',
            '/jobs': '/careers',
            '/blogs': '/blog',
            '/contact-us': '/contact',
            '/privacy-policy': '/privacy',
            '/terms-and-conditions': '/terms',
            '/cookie-policy': '/cookies',
            '/demand-gen': '/demand-generation',
            '/b2b-demand-generation': '/demand-generation',
            '/sql': '/sql-services',
            '/mql': '/mql-services',
            '/hql': '/hql-services',
            '/bant': '/bant-lead-generation',
            '/abx': '/account-based-experience',
            '/fullfunnel': '/full-funnel-demand',
            '/full-funnel': '/full-funnel-demand',
            '/demandflow': '/demandflow-bridge',
          }

          const targetRoute = aliasMap[cleanPath] || cleanPath
          const meta = ROUTES[targetRoute]
          if (!meta) return html

          const url = `${SITE_URL}${targetRoute === '/' ? '/' : targetRoute}`
          const image = meta.image || DEFAULT_IMAGE

          const headTags = [
            `<title data-prerender>${esc(meta.title)}</title>`,
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

          return html
            .replace(/<title[\s\S]*?<\/title>/i, '')
            .replace(/<meta[^>]*data-prerender[^>]*>\s*/gi, '')
            .replace(/<link[^>]*data-prerender[^>]*>\s*/gi, '')
            .replace('</head>', `    ${headTags}\n  </head>`)
        }
      }
    },
  ],
  resolve: ({
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@api': path.resolve(__dirname, './src/api'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@context': path.resolve(__dirname, './src/context'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@seo': path.resolve(__dirname, './src/seo'),
      '@animations': path.resolve(__dirname, './src/animations'),
    },
  }),
  server: {
    host: true,
    port: 3001,
    strictPort: false,   // allow fallback if 3001 is taken
    proxy: {
      '/assets': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
      },
      // Local backend proxy for all API endpoints (blogs, auth, admin, contact, etc.)
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('error', (err) => {
            console.error('[proxy error]', err.message)
          })
        },
      },
      '/sitemap.xml': {
        target: 'http://localhost:5001/api/seo/sitemap.xml',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/sitemap.xml$/, '')
      },
      '/robots.txt': {
        target: 'http://localhost:5001/api/seo/robots.txt',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/robots.txt$/, '')
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
  }
})
