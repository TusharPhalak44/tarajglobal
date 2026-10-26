import express from 'express'
import { trackPageView, saveCookieConsent, trackCtaClick } from '../controllers/analytics.controller.js'

const router = express.Router()

// POST /api/analytics/track
router.post('/track', trackPageView)

// POST /api/analytics/consent
router.post('/consent', saveCookieConsent)

// POST /api/analytics/cta-click
router.post('/cta-click', trackCtaClick)

export default router