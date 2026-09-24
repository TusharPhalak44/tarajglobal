import express from 'express'
import { body } from 'express-validator'
import { validate } from '../middleware/validation.middleware.js'
import db from '../config/db.js'
import notificationHelper from '../helpers/notificationHelper.js'
import crypto from 'crypto'

const router = express.Router()

// @route   POST /api/chatbot/leads
// @desc    Submit pre-chat lead capture form and initialize chatbot session
// @access  Public
router.post(
  '/leads',
  [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Please enter your name.')
      .isLength({ max: 150 })
      .withMessage('Name must be under 150 characters.'),
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Please enter your business email.')
      .isEmail()
      .withMessage('Please enter a valid business email.')
      .normalizeEmail(),
    body('phone')
      .trim()
      .notEmpty()
      .withMessage('Please enter your phone number.')
      .isLength({ min: 6, max: 30 })
      .withMessage('Please enter a valid phone number.'),
    body('question')
      .trim()
      .notEmpty()
      .withMessage('Please tell us how we can help.')
      .isLength({ max: 2000 })
      .withMessage('Question must be under 2000 characters.'),
  ],
  validate,
  async (req, res) => {
    try {
      const { name, email, phone, question } = req.body

      // Generate a unique session ID for the chatbot conversation
      const sessionId = `cb_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`

      // Extract referrer / page URL
      const pageUrl = req.headers.referer || req.headers.origin || '/'

      // Insert into contacts table for centralized admin / CRM management
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
        ) VALUES (?, ?, ?, ?, ?, ?, 'new', 'Chatbot', ?, NOW(), NOW())
      `

      const [result] = await db.execute(insertQuery, [
        name,
        email,
        phone,
        '', // company is optional for pre-chat
        `Chatbot Inquiry — ${name}`,
        question,
        pageUrl,
      ])

      const leadId = result.insertId

      // Notify admins in background
      try {
        if (notificationHelper && notificationHelper.notifyAdmins) {
          await notificationHelper.notifyAdmins(
            notificationHelper.notifications.newLead(name, leadId)
          )
        }
      } catch (notificationError) {
        console.error('Chatbot lead notification error:', notificationError)
      }

      return res.status(201).json({
        success: true,
        message: 'Chatbot session initialized and lead saved successfully',
        data: {
          leadId,
          sessionId,
          name,
          email,
          phone,
          question,
          createdAt: new Date().toISOString(),
        },
      })
    } catch (error) {
      console.error('Chatbot lead capture error:', error)
      return res.status(500).json({
        success: false,
        message: 'Failed to start chat session. Please try again.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      })
    }
  }
)

export default router
