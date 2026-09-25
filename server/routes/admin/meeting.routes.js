import express from 'express'
import {
  getAllMeetings,
  getMeetingById,
  updateMeetingStatus,
  rescheduleMeeting,
  cancelMeeting,
  retryMeetingEmail,
  getSMTPDiagnostics
} from '../../controllers/admin/meeting.admin.controller.js'

const router = express.Router()

// @route   GET /api/admin/meetings/diagnostics/smtp
// @desc    Safe diagnostic test for SMTP connection & auth
// @access  Private/Admin
router.get('/diagnostics/smtp', getSMTPDiagnostics)

// @route   GET /api/admin/meetings
// @desc    List all meetings with search, filter, and pagination
// @access  Private/Admin
router.get('/', getAllMeetings)

// @route   GET /api/admin/meetings/:id
// @desc    Get detailed meeting record by ID
// @access  Private/Admin
router.get('/:id', getMeetingById)

// @route   PATCH /api/admin/meetings/:id/status
// @desc    Update meeting status
// @access  Private/Admin
router.patch('/:id/status', updateMeetingStatus)

// @route   POST /api/admin/meetings/:id/reschedule
// @desc    Reschedule meeting and update Google Calendar
// @access  Private/Admin
router.post('/:id/reschedule', rescheduleMeeting)

// @route   POST /api/admin/meetings/:id/cancel
// @desc    Cancel meeting, release slot, delete Google Calendar event
// @access  Private/Admin
router.post('/:id/cancel', cancelMeeting)

// @route   POST /api/admin/meetings/:id/retry-email
// @desc    Retry sending confirmation email without duplicate calendar creation
// @access  Private/Admin
router.post('/:id/retry-email', retryMeetingEmail)

// @route   POST /api/admin/meetings/:id/resend-email
// @desc    Resend confirmation email (alias for retry-email)
// @access  Private/Admin
router.post('/:id/resend-email', retryMeetingEmail)

export default router

