import express from 'express'
import { body } from 'express-validator'
import { validate } from '../../middleware/validation.middleware.js'
import * as footerController from '../../controllers/admin/footer.controller.js'

const router = express.Router()

// ==================== FOOTER SETTINGS ROUTES ====================

// @route   GET /api/admin/footer/settings
// @desc    Get footer settings
// @access  Private
router.get('/settings', footerController.getFooterSettings)

// @route   PUT /api/admin/footer/settings
// @desc    Update footer settings
// @access  Private
router.put('/settings', [
  body('company_name').optional().trim(),
  body('company_description').optional().trim(),
  body('short_description').optional().trim(),
  body('logo_url').optional().trim(),
  body('is_logo_visible').optional().isBoolean(),
  body('is_description_visible').optional().isBoolean(),
  body('copyright_text').optional().trim()
], validate, footerController.updateFooterSettings)

// ==================== FOOTER SECTIONS ROUTES ====================

// @route   GET /api/admin/footer/sections
// @desc    Get all footer sections
// @access  Private
router.get('/sections', footerController.getAllFooterSections)

// @route   POST /api/admin/footer/sections
// @desc    Create footer section
// @access  Private
router.post('/sections', [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('section_type').optional().isIn(['links', 'contact', 'offices', 'custom']).withMessage('Invalid section type'),
  body('is_visible').optional().isBoolean(),
  body('sort_order').optional().isInt()
], validate, footerController.createFooterSection)

// @route   PUT /api/admin/footer/sections/:id
// @desc    Update footer section
// @access  Private
router.put('/sections/:id', [
  body('title').optional().trim().notEmpty(),
  body('section_type').optional().isIn(['links', 'contact', 'offices', 'custom']),
  body('is_visible').optional().isBoolean(),
  body('sort_order').optional().isInt()
], validate, footerController.updateFooterSection)

// @route   DELETE /api/admin/footer/sections/:id
// @desc    Delete footer section
// @access  Private
router.delete('/sections/:id', footerController.deleteFooterSection)

// @route   POST /api/admin/footer/sections/reorder
// @desc    Reorder footer sections
// @access  Private
router.post('/sections/reorder', [
  body('items').isArray().withMessage('Items must be an array')
], validate, footerController.reorderFooterSections)

// ==================== FOOTER LINKS ROUTES ====================

// @route   GET /api/admin/footer/links
// @desc    Get all footer links
// @access  Private
router.get('/links', footerController.getAllFooterLinks)

// @route   GET /api/admin/footer/links/section/:sectionId
// @desc    Get footer links by section
// @access  Private
router.get('/links/section/:sectionId', footerController.getFooterLinksBySection)

// @route   POST /api/admin/footer/links
// @desc    Create footer link
// @access  Private
router.post('/links', [
  body('section_id').isInt().withMessage('Section ID must be an integer'),
  body('label').trim().notEmpty().withMessage('Label is required'),
  body('url').optional().trim(),
  body('link_type').optional().isIn(['internal', 'external', 'custom_action']),
  body('target').optional().isIn(['_self', '_blank']),
  body('custom_action').optional().trim(),
  body('is_visible').optional().isBoolean(),
  body('sort_order').optional().isInt()
], validate, footerController.createFooterLink)

// @route   PUT /api/admin/footer/links/:id
// @desc    Update footer link
// @access  Private
router.put('/links/:id', [
  body('section_id').optional().isInt(),
  body('label').optional().trim().notEmpty(),
  body('url').optional().trim(),
  body('link_type').optional().isIn(['internal', 'external', 'custom_action']),
  body('target').optional().isIn(['_self', '_blank']),
  body('custom_action').optional().trim(),
  body('is_visible').optional().isBoolean(),
  body('sort_order').optional().isInt()
], validate, footerController.updateFooterLink)

// @route   DELETE /api/admin/footer/links/:id
// @desc    Delete footer link
// @access  Private
router.delete('/links/:id', footerController.deleteFooterLink)

// @route   POST /api/admin/footer/links/reorder
// @desc    Reorder footer links
// @access  Private
router.post('/links/reorder', [
  body('items').isArray().withMessage('Items must be an array')
], validate, footerController.reorderFooterLinks)

// ==================== FOOTER OFFICES ROUTES ====================

// @route   GET /api/admin/footer/offices
// @desc    Get all footer offices
// @access  Private
router.get('/offices', footerController.getAllFooterOffices)

// @route   POST /api/admin/footer/offices
// @desc    Create footer office
// @access  Private
router.post('/offices', [
  body('name').trim().notEmpty().withMessage('Office name is required'),
  body('address_line_1').optional().trim(),
  body('address_line_2').optional().trim(),
  body('city').optional().trim(),
  body('state').optional().trim(),
  body('country').optional().trim(),
  body('postal_code').optional().trim(),
  body('map_url').optional().trim(),
  body('phone').optional().trim(),
  body('email').optional().trim().isEmail(),
  body('icon').optional().trim(),
  body('is_visible').optional().isBoolean(),
  body('sort_order').optional().isInt()
], validate, footerController.createFooterOffice)

// @route   PUT /api/admin/footer/offices/:id
// @desc    Update footer office
// @access  Private
router.put('/offices/:id', [
  body('name').optional().trim().notEmpty(),
  body('address_line_1').optional().trim(),
  body('address_line_2').optional().trim(),
  body('city').optional().trim(),
  body('state').optional().trim(),
  body('country').optional().trim(),
  body('postal_code').optional().trim(),
  body('map_url').optional().trim(),
  body('phone').optional().trim(),
  body('email').optional().trim().isEmail(),
  body('icon').optional().trim(),
  body('is_visible').optional().isBoolean(),
  body('sort_order').optional().isInt()
], validate, footerController.updateFooterOffice)

// @route   DELETE /api/admin/footer/offices/:id
// @desc    Delete footer office
// @access  Private
router.delete('/offices/:id', footerController.deleteFooterOffice)

// @route   POST /api/admin/footer/offices/reorder
// @desc    Reorder footer offices
// @access  Private
router.post('/offices/reorder', [
  body('items').isArray().withMessage('Items must be an array')
], validate, footerController.reorderFooterOffices)

// ==================== FOOTER CONTACT ITEMS ROUTES ====================

// @route   GET /api/admin/footer/contact-items
// @desc    Get all footer contact items
// @access  Private
router.get('/contact-items', footerController.getAllFooterContactItems)

// @route   POST /api/admin/footer/contact-items
// @desc    Create footer contact item
// @access  Private
router.post('/contact-items', [
  body('type').isIn(['address', 'phone', 'email', 'whatsapp', 'custom']).withMessage('Invalid contact type'),
  body('label').optional().trim(),
  body('value').optional().trim(),
  body('action_url').optional().trim(),
  body('icon').optional().trim(),
  body('is_visible').optional().isBoolean(),
  body('sort_order').optional().isInt()
], validate, footerController.createFooterContactItem)

// @route   PUT /api/admin/footer/contact-items/:id
// @desc    Update footer contact item
// @access  Private
router.put('/contact-items/:id', [
  body('type').optional().isIn(['address', 'phone', 'email', 'whatsapp', 'custom']),
  body('label').optional().trim(),
  body('value').optional().trim(),
  body('action_url').optional().trim(),
  body('icon').optional().trim(),
  body('is_visible').optional().isBoolean(),
  body('sort_order').optional().isInt()
], validate, footerController.updateFooterContactItem)

// @route   DELETE /api/admin/footer/contact-items/:id
// @desc    Delete footer contact item
// @access  Private
router.delete('/contact-items/:id', footerController.deleteFooterContactItem)

// @route   POST /api/admin/footer/contact-items/reorder
// @desc    Reorder footer contact items
// @access  Private
router.post('/contact-items/reorder', [
  body('items').isArray().withMessage('Items must be an array')
], validate, footerController.reorderFooterContactItems)

// ==================== FOOTER SOCIAL LINKS ROUTES ====================

// @route   GET /api/admin/footer/social-links
// @desc    Get all footer social links
// @access  Private
router.get('/social-links', footerController.getAllFooterSocialLinks)

// @route   POST /api/admin/footer/social-links
// @desc    Create footer social link
// @access  Private
router.post('/social-links', [
  body('platform').trim().notEmpty().withMessage('Platform is required'),
  body('icon').trim().notEmpty().withMessage('Icon is required'),
  body('url').trim().notEmpty().withMessage('URL is required'),
  body('is_visible').optional().isBoolean(),
  body('sort_order').optional().isInt()
], validate, footerController.createFooterSocialLink)

// @route   PUT /api/admin/footer/social-links/:id
// @desc    Update footer social link
// @access  Private
router.put('/social-links/:id', [
  body('platform').optional().trim().notEmpty(),
  body('icon').optional().trim().notEmpty(),
  body('url').optional().trim().notEmpty(),
  body('is_visible').optional().isBoolean(),
  body('sort_order').optional().isInt()
], validate, footerController.updateFooterSocialLink)

// @route   DELETE /api/admin/footer/social-links/:id
// @desc    Delete footer social link
// @access  Private
router.delete('/social-links/:id', footerController.deleteFooterSocialLink)

// @route   POST /api/admin/footer/social-links/reorder
// @desc    Reorder footer social links
// @access  Private
router.post('/social-links/reorder', [
  body('items').isArray().withMessage('Items must be an array')
], validate, footerController.reorderFooterSocialLinks)

export default router
