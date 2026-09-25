import express from 'express'
import { body } from 'express-validator'
import { validate } from '../middleware/validation.middleware.js'
import { authenticate, authorize } from '../middleware/auth.middleware.js'
import Contact from '../models/Contact.js'
import Meeting from '../models/Meeting.js'
import db from '../config/db.js'
import notificationHelper from '../helpers/notificationHelper.js'
import { sendLeadNotification } from '../services/email.service.js'
import { createMeeting } from '../controllers/meeting.controller.js'

const router = express.Router()

// @route   POST /api/contact/meeting
// @desc    Book a meeting (delegates to centralized meeting controller)
// @access  Public
router.post('/meeting', createMeeting)


// @route   POST /api/contact
// @desc    Submit contact form and create lead
// @access  Public
router.post('/', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('message').trim().notEmpty().withMessage('Message is required')
], validate, async (req, res) => {
  try {
    const { name, email, phone, subject, message, company } = req.body
    
    // Save to contacts table (for leads management)
    const insertQuery = `
      INSERT INTO contacts (
        name,
        email,
        phone,
        company,
        subject,
        message,
        status,
        source,
        page_url,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, 'new', 'contact_form', ?, NOW(), NOW())
    `
    
    const [result] = await db.execute(insertQuery, [
      name,
      email,
      phone || '',
      company || '',
      subject || '',
      message,
      req.headers.referer || req.headers.origin || '/'
    ])
    
    // Notify admins about new lead in DB notifications
    try {
      await notificationHelper.notifyAdmins(notificationHelper.notifications.newLead(name, result.insertId))
    } catch (notificationError) {
      console.error('Failed to create notification:', notificationError)
    }

    // Send lead notification email to admin via Hostinger SMTP
    try {
      const adminEmail = process.env.MEETING_NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL || 'info@tarajglobal.com'
      await sendLeadNotification({ name, email, phone, company, message, subject }, adminEmail)
    } catch (emailError) {
      console.warn('Failed to send contact notification email:', emailError.message)
    }
    
    res.status(201).json({ 
      success: true, 
      message: 'Your message has been received. We\'ll be in touch shortly.', 
      id: result.insertId,
      leadId: result.insertId
    })
  } catch (error) {
    console.error('Contact submission error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   GET /api/contact
// @desc    Get all contact submissions
// @access  Private/Admin
router.get('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const contacts = await Contact.getAll()
    res.json({ success: true, data: contacts })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   GET /api/contact/:id
// @desc    Get contact submission by ID
// @access  Private/Admin
router.get('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
    if (!contact) return res.status(404).json({ success: false, message: 'Contact submission not found' })
    res.json({ success: true, data: contact })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   PATCH /api/contact/:id/status
// @desc    Update contact status
// @access  Private/Admin
router.patch('/:id/status', authenticate, authorize('admin'), async (req, res) => {
  try {
    const updated = await Contact.updateStatus(req.params.id, req.body.status)
    if (!updated) return res.status(404).json({ success: false, message: 'Contact not found' })
    res.json({ success: true, message: 'Status updated' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   DELETE /api/contact/:id
// @desc    Delete contact submission
// @access  Private/Admin
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const deleted = await Contact.delete(req.params.id)
    if (!deleted) return res.status(404).json({ success: false, message: 'Contact not found' })
    res.json({ success: true, message: 'Deleted successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
