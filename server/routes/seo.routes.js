import express from 'express'
import { getSEOData } from '../controllers/seo.controller.js'

const router = express.Router()

// GET /api/seo/:entityType/:entityId
router.get('/:entityType/:entityId', getSEOData)

export default router
