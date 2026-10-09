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
  body('website_url').optional({ checkFalsy: true }).trim().isURL().withMessage('Website URL must be valid'),
  body('display_order').optional().isInt().withMessage('Display order must be an integer'),
  body('is_active').optional().isBoolean().withMessage('Active status must be a boolean')
], validate, cmsController.createClient)

// @route   PUT /api/admin/cms/clients/:id
// @desc    Update client
// @access  Private
router.put('/clients/:id', [
  body('client_name').optional().trim().notEmpty(),
  body('logo_path').optional().trim().notEmpty(),
  body('website_url').optional({ checkFalsy: true }).trim().isURL().withMessage('Website URL must be valid'),
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
