import express from 'express'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { renderBlogHtml } from '../services/blogSeoRenderer.js'
// import { publishScheduledBlogs } from '../controllers/admin/blog.controller.js'
import { optionalAuthenticate } from '../middleware/auth.middleware.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

// Route handler for blog landing page (/blog or /blog/)
router.get('/', (req, res, next) => {
  const candidateBlogPaths = [
    path.resolve(process.cwd(), 'client/dist/blog/index.html'),
    path.resolve(process.cwd(), 'dist/blog/index.html'),
    path.resolve(__dirname, '../../client/dist/blog/index.html'),
    path.resolve(__dirname, '../client/dist/blog/index.html')
  ]
  const blogIndexPath = candidateBlogPaths.find((p) => fs.existsSync(p))
  if (blogIndexPath) {
    return res.sendFile(blogIndexPath)
  }

  const candidateMainPaths = [
    path.resolve(process.cwd(), 'client/dist/index.html'),
    path.resolve(process.cwd(), 'dist/index.html'),
    path.resolve(__dirname, '../../client/dist/index.html'),
    path.resolve(__dirname, '../client/dist/index.html')
  ]
  const mainIndexPath = candidateMainPaths.find((p) => fs.existsSync(p))
  if (mainIndexPath) {
    return res.sendFile(mainIndexPath)
  }

  next()
})

// Route handler for blog article rendering with server-side dynamic SEO metadata
router.get('/:slug', optionalAuthenticate, async (req, res, next) => {
  try {
    const { slug } = req.params

    // If slug is empty or matches static root, delegate to next
    if (!slug || slug === '' || slug === 'index.html') {
      return next()
    }

    const isPreview =
      req.query.preview === 'true' &&
      Boolean(req.user?.id)

    const isDev =
      req.headers['x-vite-dev'] === '1' ||
      req.query.format === 'dev'

    // If not preview or dev, prefer the statically prerendered blog file on disk matching current build assets
    if (!isPreview && !isDev) {
      const candidateStaticBlogPaths = [
        path.resolve(process.cwd(), 'client/dist/blog', slug, 'index.html'),
        path.resolve(process.cwd(), 'dist/blog', slug, 'index.html'),
        path.resolve(__dirname, '../../client/dist/blog', slug, 'index.html'),
        path.resolve(__dirname, '../client/dist/blog', slug, 'index.html')
      ]
      const staticBlogPath = candidateStaticBlogPaths.find((p) => fs.existsSync(p))
      if (staticBlogPath) {
        return res
          .status(200)
          .set('Content-Type', 'text/html; charset=utf-8')
          .set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300')
          .sendFile(staticBlogPath)
      }
    }

    const { statusCode, html } = await renderBlogHtml(
      slug,
      isPreview,
      isDev
    )

    if (statusCode === 404) {
      return res
        .status(404)
        .set('Content-Type', 'text/html; charset=utf-8')
        .set('Cache-Control', 'no-cache, no-store, must-revalidate')
        .send(html)
    }

    if (isPreview) {
      return res
        .status(200)
        .set('Content-Type', 'text/html; charset=utf-8')
        .set('Cache-Control', 'no-cache, no-store, must-revalidate')
        .send(html)
    }

    return res
      .status(200)
      .set('Content-Type', 'text/html; charset=utf-8')
      .set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300')
      .send(html)
  } catch (error) {
    console.error('Error rendering blog page SEO:', error)
    next(error)
  }
})


export default router
