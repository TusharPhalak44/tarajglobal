import express from 'express'
import { renderBlogHtml } from '../services/blogSeoRenderer.js'
import { publishScheduledBlogs } from '../controllers/admin/blog.controller.js'
import { optionalAuthenticate } from '../middleware/auth.middleware.js'

const router = express.Router()

// Route handler for blog page rendering with server-side dynamic SEO metadata
router.get('/:slug', optionalAuthenticate, async (req, res, next) => {
  try {
    const { slug } = req.params

    // If slug is empty or matches static root, delegate to next
    if (!slug || slug === '' || slug === 'index.html') {
      return next()
    }

    // Check scheduled blogs before rendering
    await publishScheduledBlogs().catch(() => {})

    const isPreview = (req.query.preview === 'true' || req.query.preview === true) && Boolean(req.user?.id)
    const isDev = req.headers['x-vite-dev'] === '1' || req.query.format === 'dev'

    const { statusCode, html } = await renderBlogHtml(slug, isPreview, isDev)

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
