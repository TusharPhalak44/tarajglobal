import express from 'express'
import { body } from 'express-validator'
import { validate } from '../../middleware/validation.middleware.js'
import { checkPermission } from '../../middleware/permission.middleware.js'
import applicationController from '../../controllers/admin/application.controller.js'

const router = express.Router()

// @route   GET /api/admin/applications
// @desc    Get all applications with filtering
// @access  Private
router.get('/', checkPermission('job.view'), applicationController.getAllApplications)

// @route   GET /api/admin/applications/:id
// @desc    Get application by ID
// @access  Private
router.get('/:id', checkPermission('job.view'), applicationController.getApplicationById)

// @route   DELETE /api/admin/applications/:id
// @desc    Delete application
// @access  Private
router.delete('/:id', checkPermission('job.delete'), applicationController.deleteApplication)

// @route   PATCH /api/admin/applications/:id/status
// @desc    Update application status
// @access  Private
router.patch('/:id/status', [
  checkPermission('job.edit'),
  body('status').notEmpty().withMessage('Status is required')
], validate, applicationController.updateApplicationStatus)

// @route   POST /api/admin/applications/:id/notes
// @desc    Add note to application
// @access  Private
router.post('/:id/notes', [
  checkPermission('job.edit'),
  body('note').notEmpty().withMessage('Note is required')
], validate, applicationController.addApplicationNote)

// @route   POST /api/admin/applications/bulk
// @desc    Bulk action on applications
// @access  Private
router.post('/bulk', [
  checkPermission('job.edit'),
  body('ids').isArray().withMessage('IDs must be an array'),
  body('action').notEmpty().withMessage('Action is required')
], validate, applicationController.bulkApplicationAction)

export default router
