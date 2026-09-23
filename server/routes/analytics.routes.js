import express from 'express'
import { trackPageView, saveCookieConsent } from '../controllers/analytics.controller.js'

const router = express.Router()

// POST /api/analytics/track
router.post('/track', trackPageView)

// POST /api/analytics/consent
router.post('/consent', saveCookieConsent)

export default router
