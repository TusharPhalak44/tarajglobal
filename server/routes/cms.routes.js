import express from 'express'
import * as cmsController from '../controllers/admin/cms.controller.js'

const router = express.Router()

// ==================== PUBLIC NAVBAR ROUTES ====================

// @route   GET /api/cms/navbar
// @desc    Get active navbar items
// @access  Public
router.get('/navbar', cmsController.getActiveNavbarItems)

// @route   GET /api/cms/logo
// @desc    Get company logo
// @access  Public
router.get('/logo', cmsController.getLogo)

// ==================== PUBLIC CLIENTS ROUTES ====================

// @route   GET /api/cms/clients
// @desc    Get active clients
// @access  Public
router.get('/clients', cmsController.getActiveClients)

// @route   GET /api/cms/clients-section
// @desc    Get client section settings
// @access  Public
router.get('/clients-section', cmsController.getClientSectionSettings)

export default router
