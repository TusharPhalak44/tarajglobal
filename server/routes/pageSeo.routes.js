import express from 'express'
import { renderPageHtml } from '../services/pageSeoRenderer.js'

const router = express.Router()

// Intercept HTML page requests and serve dynamically rendered SEO
router.get('*', async (req, res, next) => {
  try {
    const urlPath = req.path

    // Skip API, uploads, assets, blog (handled by blogPageRoutes), and static files
    if (
      urlPath.startsWith('/api') ||
      urlPath.startsWith('/uploads') ||
      urlPath.startsWith('/assets') ||
      urlPath.startsWith('/blog') ||
      /\.(js|css|png|jpg|jpeg|gif|webp|svg|ico|json|map|xml|txt|woff|woff2|ttf|eot)$/i.test(urlPath)
    ) {
      return next()
    }

    const { statusCode, html } = await renderPageHtml(urlPath)

    return res
      .status(statusCode || 200)
      .set('Content-Type', 'text/html; charset=utf-8')
      .set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300')
      .send(html)
  } catch (error) {
    console.error('Error in dynamic page SEO renderer:', error)
    next()
  }
})

export default router
