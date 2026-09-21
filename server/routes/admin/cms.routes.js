import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { body } from 'express-validator'
import { validate } from '../../middleware/validation.middleware.js'
import { checkPermission, hasAnyPermission } from '../../middleware/permission.middleware.js'
import * as cmsController from '../../controllers/admin/cms.controller.js'

const router = express.Router()

// Multer for client logo uploads
const clientLogoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/clients'
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    cb(null, dir)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname))
  }
})
const clientLogoUpload = multer({
  storage: clientLogoStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = /jpeg|jpg|png|webp|svg|gif/.test(path.extname(file.originalname).toLowerCase())
    ok ? cb(null, true) : cb(new Error('Only image files allowed'))
  }
})

// ==================== NAVBAR ROUTES ====================

// @route   GET /api/admin/cms/navbar
// @desc    Get all navbar items
// @access  Private
router.get('/navbar', cmsController.getAllNavbarItems)

// @route   POST /api/admin/cms/navbar
// @desc    Create navbar item
// @access  Private
router.post('/navbar', [
  body('section').optional().isIn(['header', 'navbar']).withMessage('Section must be header or navbar'),
  body('label').trim().notEmpty().withMessage('Label is required'),
  body('url').trim().notEmpty().withMessage('URL is required'),
  body('parent_id').optional({ values: 'falsy' }),
  body('display_order').optional(),
  body('is_active').optional()
], validate, cmsController.createNavbarItem)

// @route   PUT /api/admin/cms/navbar/reorder
// @desc    Reorder navbar items
// @access  Private
router.put('/navbar/reorder', [
  body('items').isArray().withMessage('Items must be an array')
], validate, cmsController.reorderNavbarItems)

// @route   PUT /api/admin/cms/navbar/:id
// @desc    Update navbar item
// @access  Private
router.put('/navbar/:id', [
  body('section').optional().isIn(['header', 'navbar']).withMessage('Section must be header or navbar'),
  body('label').optional().trim().notEmpty().withMessage('Label cannot be empty'),
  body('url').optional().trim().notEmpty().withMessage('URL cannot be empty'),
  body('parent_id').optional({ values: 'falsy' }),
  body('display_order').optional(),
  body('is_active').optional()
], validate, cmsController.updateNavbarItem)

// @route   DELETE /api/admin/cms/navbar/:id
// @desc    Delete navbar item
// @access  Private
router.delete('/navbar/:id', cmsController.deleteNavbarItem)

// @route   GET /api/admin/cms/logo
// @desc    Get company logo
// @access  Private
router.get('/logo', cmsController.getLogo)

// @route   PUT /api/admin/cms/logo
// @desc    Update company logo and header settings
// @access  Private
router.put('/logo', [
  body('logo_url').optional(),
  body('logo_text').optional(),
  body('logo_alt').optional(),
  body('header_visible').optional()
], validate, cmsController.updateLogo)

// ==================== FOOTER LINKS ROUTES ====================

// @route   GET /api/admin/cms/footer-links
// @desc    Get all footer links
// @access  Private
router.get('/footer-links', cmsController.getAllFooterLinks)

// @route   POST /api/admin/cms/footer-links
// @desc    Create footer link
// @access  Private
router.post('/footer-links', [
  body('section').trim().notEmpty().withMessage('Section is required'),
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('url').optional().trim(),
  body('display_order').optional().isInt().withMessage('Display order must be an integer'),
  body('is_active').optional().isBoolean().withMessage('Active status must be a boolean')
], validate, cmsController.createFooterLink)

// @route   PUT /api/admin/cms/footer-links/:id
// @desc    Update footer link
// @access  Private
router.put('/footer-links/:id', [
  body('section').optional().trim().notEmpty(),
  body('title').optional().trim().notEmpty(),
  body('url').optional().trim(),
  body('display_order').optional().isInt(),
  body('is_active').optional().isBoolean()
], validate, cmsController.updateFooterLink)

// @route   DELETE /api/admin/cms/footer-links/:id
// @desc    Delete footer link
// @access  Private
router.delete('/footer-links/:id', cmsController.deleteFooterLink)

// @route   PUT /api/admin/cms/footer-links/reorder
// @desc    Reorder footer links
// @access  Private
router.put('/footer-links/reorder', [
  checkPermission('cms.edit'),
  body('items').isArray().withMessage('Items must be an array')
], validate, cmsController.reorderFooterLinks)

// ==================== FOOTER SOCIAL LINKS ROUTES ====================

// @route   GET /api/admin/cms/footer-social-links
// @desc    Get all footer social links
// @access  Private
router.get('/footer-social-links', cmsController.getAllFooterSocialLinks)

// @route   POST /api/admin/cms/footer-social-links
// @desc    Create footer social link
// @access  Private
router.post('/footer-social-links', [
  body('platform').trim().notEmpty().withMessage('Platform is required'),
  body('icon').trim().notEmpty().withMessage('Icon is required'),
  body('url').trim().notEmpty().withMessage('URL is required'),
  body('display_order').optional().isInt().withMessage('Display order must be an integer'),
  body('is_active').optional().isBoolean().withMessage('Active status must be a boolean')
], validate, cmsController.createFooterSocialLink)

// @route   PUT /api/admin/cms/footer-social-links/:id
// @desc    Update footer social link
// @access  Private
router.put('/footer-social-links/:id', [
  body('platform').optional().trim().notEmpty(),
  body('icon').optional().trim().notEmpty(),
  body('url').optional().trim().notEmpty(),
  body('display_order').optional().isInt(),
  body('is_active').optional().isBoolean()
], validate, cmsController.updateFooterSocialLink)

// @route   DELETE /api/admin/cms/footer-social-links/:id
// @desc    Delete footer social link
// @access  Private
router.delete('/footer-social-links/:id', cmsController.deleteFooterSocialLink)

// @route   PUT /api/admin/cms/footer-social-links/reorder
// @desc    Reorder footer social links
// @access  Private
router.put('/footer-social-links/reorder', [
  checkPermission('cms.edit'),
  body('items').isArray().withMessage('Items must be an array')
], validate, cmsController.reorderFooterSocialLinks)

// ==================== CLIENTS ROUTES ====================

// @route   GET /api/admin/cms/clients
// @desc    Get all clients
// @access  Private
router.get('/clients', cmsController.getAllClients)

// @route   POST /api/admin/cms/clients
// @desc    Create client
// @access  Private
router.post('/clients', [
  body('client_name').trim().notEmpty().withMessage('Client name is required'),
  body('logo_path').trim().notEmpty().withMessage('Logo path is required'),
  body('website_url').optional().trim().isURL().withMessage('Website URL must be valid'),
  body('display_order').optional().isInt().withMessage('Display order must be an integer'),
  body('is_active').optional().isBoolean().withMessage('Active status must be a boolean')
], validate, cmsController.createClient)

// @route   PUT /api/admin/cms/clients/:id
// @desc    Update client
// @access  Private
router.put('/clients/:id', [
  body('client_name').optional().trim().notEmpty(),
  body('logo_path').optional().trim().notEmpty(),
  body('website_url').optional().trim().isURL(),
  body('display_order').optional().isInt(),
  body('is_active').optional().isBoolean()
], validate, cmsController.updateClient)

// @route   DELETE /api/admin/cms/clients/:id
// @desc    Delete client
// @access  Private
router.delete('/clients/:id', cmsController.deleteClient)

// @route   PUT /api/admin/cms/clients/reorder
// @desc    Reorder clients
// @access  Private
router.put('/clients/reorder', [
  checkPermission('cms.edit'),
  body('items').isArray().withMessage('Items must be an array')
], validate, cmsController.reorderClients)

// @route   POST /api/admin/cms/clients/upload-logo
// @desc    Upload a client logo image
// @access  Private
router.post('/clients/upload-logo', clientLogoUpload.single('logo'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' })
  const publicUrl = '/uploads/clients/' + req.file.filename
  res.json({ success: true, url: publicUrl, filename: req.file.filename })
})

// ==================== CLIENT SECTION SETTINGS ROUTES ====================

// @route   GET /api/admin/cms/clients-section
// @desc    Get client section settings
// @access  Private
router.get('/clients-section', cmsController.getClientSectionSettings)

// @route   PUT /api/admin/cms/clients-section
// @desc    Update client section settings
// @access  Private
router.put('/clients-section', cmsController.updateClientSectionSettings)

export default router
