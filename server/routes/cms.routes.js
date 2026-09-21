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

// ==================== PUBLIC FOOTER ROUTES ====================

// @route   GET /api/cms/footer-links
// @desc    Get active footer links
// @access  Public
router.get('/footer-links', cmsController.getActiveFooterLinks)

// @route   GET /api/cms/footer-links/:section
// @desc    Get footer links by section
// @access  Public
router.get('/footer-links/:section', cmsController.getFooterLinksBySection)

// @route   GET /api/cms/footer-social-links
// @desc    Get active footer social links
// @access  Public
router.get('/footer-social-links', cmsController.getActiveFooterSocialLinks)

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
