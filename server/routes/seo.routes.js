import express from 'express'
import { getSEOData, checkRedirect, log404, getRobotsTxt, getSitemapXml } from '../controllers/seo.controller.js'

const router = express.Router()

// GET /api/seo/redirects/check
router.get('/redirects/check', checkRedirect)

// POST /api/seo/404
router.post('/404', log404)

// GET /api/seo/robots.txt
router.get('/robots.txt', getRobotsTxt)

// GET /api/seo/sitemap.xml
router.get('/sitemap.xml', getSitemapXml)

// GET /api/seo/:entityType/:entityId
router.get('/:entityType/:entityId', getSEOData)

export default router
