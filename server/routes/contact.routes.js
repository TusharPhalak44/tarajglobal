import express from 'express'
import { body } from 'express-validator'
import { validate } from '../middleware/validation.middleware.js'
import { authenticate, authorize } from '../middleware/auth.middleware.js'
import Contact from '../models/Contact.js'
import Meeting from '../models/Meeting.js'
import nodemailer from 'nodemailer'
import db from '../config/db.js'
import notificationHelper from '../helpers/notificationHelper.js'

const router = express.Router()

// Email transporter configuration using SMTP
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || 'careers@tarajglobal.com',
    pass: process.env.EMAIL_PASSWORD || process.env.EMAIL_PASS || 'your-email-password'
  }
})

// Admin email for notifications
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@tarajglobal.com'
const FROM_EMAIL = process.env.EMAIL_FROM || 'careers@tarajglobal.com'

// @route   POST /api/contact/meeting
// @desc    Book a meeting and send confirmation email
// @access  Public
router.post('/meeting', [
  body('fullName').trim().notEmpty().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('company').trim().notEmpty().withMessage('Company name is required'),
  body('date').notEmpty().withMessage('Date is required'),
  body('time').notEmpty().withMessage('Time is required')
], validate, async (req, res) => {
  try {
    const { fullName, email, company, phone, date, time, timeZone } = req.body
    
    // Default timezone if not provided
    const finalTimeZone = timeZone || 'Asia/Kolkata'
    
    // Check for duplicate booking
    const isDuplicate = await Meeting.checkDuplicateBooking(email, date, time)
    if (isDuplicate) {
      return res.status(400).json({ 
        success: false, 
        message: 'You already have a booking for this date and time.' 
      })
    }
    
    // Format the date for database (YYYY-MM-DD)
    const meetingDate = new Date(date)
    const formattedDate = meetingDate.toISOString().split('T')[0]
    
    // Save booking to database
    const bookingResult = await Meeting.create({
      fullName,
      email,
      company,
      phone: phone || '',
      date: formattedDate,
      time,
      timeZone: finalTimeZone,
      meetingType: 'Strategy Call'
    })
    
    // Format the date for email display
    const displayDate = meetingDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
    
    // User confirmation email
    const userMailOptions = {
      from: FROM_EMAIL,
      to: email,
      subject: 'Your Meeting with Taraj Global is Confirmed',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Meeting Confirmation</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #00A6FF, #FF6D00);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .meeting-details {
              background: white;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              border-left: 4px solid #00A6FF;
            }
            .meeting-details h3 {
              color: #00A6FF;
              margin-top: 0;
            }
            .detail-item {
              margin: 10px 0;
              padding: 10px;
              background: #f0f0f0;
              border-radius: 5px;
            }
            .detail-label {
              font-weight: bold;
              color: #666;
            }
            .detail-value {
              color: #333;
              margin-top: 5px;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #ddd;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Your Meeting with Taraj Global is Confirmed</h1>
            <p>Your meeting has been successfully scheduled</p>
          </div>
          <div class="content">
            <p>Hi ${fullName},</p>
            <p>Thank you for scheduling a meeting with Taraj Global.</p>
            <p>Your meeting has been successfully confirmed.</p>
            
            <div class="meeting-details">
              <h3>Meeting Details</h3>
              <div class="detail-item">
                <div class="detail-label">Date:</div>
                <div class="detail-value">${displayDate}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Time:</div>
                <div class="detail-value">${time}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Time Zone:</div>
                <div class="detail-value">${finalTimeZone}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Email:</div>
                <div class="detail-value">${email}</div>
              </div>
            </div>
            
            <p>Our team looks forward to speaking with you and discussing how Taraj Global can support your B2B growth and lead generation goals.</p>
            
            <p>Best regards,<br>Taraj Global<br>info@tarajglobal.com<br>+91 96655-99442</p>
            
            <div class="footer">
              <p>Taraj Global</p>
              <p>The Space Business Complex, Office No. 512–516, Grant Rd, Kharadi, Pune, Maharashtra 411014</p>
              <p>Email: careers@tarajglobal.com | Phone: +91 96655-99442</p>
            </div>
          </div>
        </body>
        </html>
      `
    }
    
    // Admin notification email
    const adminMailOptions = {
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: 'New Meeting Booking - Taraj Global',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Meeting Booking</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #00A6FF, #FF6D00);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .booking-details {
              background: white;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              border-left: 4px solid #FF6D00;
            }
            .detail-item {
              margin: 10px 0;
              padding: 10px;
              background: #f0f0f0;
              border-radius: 5px;
            }
            .detail-label {
              font-weight: bold;
              color: #666;
            }
            .detail-value {
              color: #333;
              margin-top: 5px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>New Meeting Booking</h1>
            <p>A new meeting has been booked</p>
          </div>
          <div class="content">
            <div class="booking-details">
              <h3>Customer Details</h3>
              <div class="detail-item">
                <div class="detail-label">Customer Name:</div>
                <div class="detail-value">${fullName}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Customer Email:</div>
                <div class="detail-value">${email}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Company:</div>
                <div class="detail-value">${company}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Phone:</div>
                <div class="detail-value">${phone || 'Not provided'}</div>
              </div>
            </div>
            
            <div class="booking-details">
              <h3>Meeting Details</h3>
              <div class="detail-item">
                <div class="detail-label">Date:</div>
                <div class="detail-value">${displayDate}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Time:</div>
                <div class="detail-value">${time}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Time Zone:</div>
                <div class="detail-value">${finalTimeZone}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Meeting Type:</div>
                <div class="detail-value">Strategy Call</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Booking ID:</div>
                <div class="detail-value">${bookingResult.bookingId}</div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    }
    
    // Send user confirmation email
    let userEmailSent = false
    try {
      await transporter.sendMail(userMailOptions)
      userEmailSent = true
      console.log('User confirmation email sent successfully to:', email)
    } catch (emailError) {
      console.error('User email sending failed:', emailError.message)
    }
    
    // Send admin notification email
    try {
      await transporter.sendMail(adminMailOptions)
      console.log('Admin notification email sent successfully')
    } catch (adminEmailError) {
      console.error('Admin email sending failed:', adminEmailError.message)
    }
    
    // Return success response
    if (userEmailSent) {
      res.status(201).json({ 
        success: true, 
        message: 'Meeting booked successfully. Confirmation email sent.',
        bookingId: bookingResult.bookingId
      })
    } else {
      res.status(201).json({ 
        success: true, 
        message: 'Meeting booked successfully, but confirmation email could not be sent.',
        bookingId: bookingResult.bookingId,
        emailWarning: true
      })
    }
  } catch (error) {
    console.error('Booking error:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Failed to book meeting. Please try again.' 
    })
  }
})

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
    
    // Notify admins about new lead
    try {
      await notificationHelper.notifyAdmins(notificationHelper.notifications.newLead(name, result.insertId))
    } catch (notificationError) {
      console.error('Failed to create notification:', notificationError)
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
