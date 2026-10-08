import express from 'express'
import { body } from 'express-validator'
import { validate } from '../middleware/validation.middleware.js'
import { authenticate, authorize } from '../middleware/auth.middleware.js'
import Contact from '../models/Contact.js'
import Meeting from '../models/Meeting.js'
import nodemailer from 'nodemailer'
import db from '../config/db.js'
import notificationHelper from '../helpers/notificationHelper.js'
import emailService from '../services/email.service.js'

const router = express.Router()

// Helper functions to dynamically fetch current environment settings
const getTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
    secure: process.env.EMAIL_PORT === '465',
    auth: {
      user: process.env.EMAIL_USER || 'tgs.admin001@gmail.com',
      pass: process.env.EMAIL_PASSWORD || process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  })
}

const getAdminEmail = () => process.env.ADMIN_EMAIL || process.env.EMAIL_USER || 'tgs.admin001@gmail.com'
const getFromEmail = () => process.env.EMAIL_FROM || process.env.EMAIL_USER || 'tgs.admin001@gmail.com'

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
    const FROM_EMAIL = getFromEmail()
    const ADMIN_EMAIL = getAdminEmail()
    
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
    
    // Calculate UTC Dates for RFC 5545 iCalendar standard & Google Calendar 1-Click Link
    const [hours, minutes] = time.split(':').map(n => parseInt(n, 10))
    const [year, month, day] = formattedDate.split('-').map(n => parseInt(n, 10))

    let startDateObj = new Date(Date.UTC(year, month - 1, day, hours, minutes, 0))
    if (finalTimeZone.includes('Kolkata') || finalTimeZone.includes('India') || finalTimeZone === 'IST' || finalTimeZone.includes('Asia')) {
      startDateObj = new Date(startDateObj.getTime() - (5.5 * 60 * 60 * 1000))
    } else if (finalTimeZone.includes('New_York') || finalTimeZone === 'EST' || finalTimeZone === 'EDT') {
      startDateObj = new Date(startDateObj.getTime() + (5 * 60 * 60 * 1000))
    } else if (finalTimeZone.includes('Los_Angeles') || finalTimeZone === 'PST' || finalTimeZone === 'PDT') {
      startDateObj = new Date(startDateObj.getTime() + (8 * 60 * 60 * 1000))
    }

    const endDateObj = new Date(startDateObj.getTime() + 30 * 60 * 1000)
    const formatICalUTC = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

    const startUTC = formatICalUTC(startDateObj)
    const endUTC = formatICalUTC(endDateObj)
    const dtStamp = formatICalUTC(new Date())

    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Strategy Call with Taraj Global')}&dates=${startUTC}/${endUTC}&details=${encodeURIComponent(`Strategy Call meeting with ${fullName} (${company}).\nEmail: ${email}\nPhone: ${phone || 'N/A'}`)}&location=${encodeURIComponent('Online Strategy Call (Taraj Global)')}&add=${encodeURIComponent(email)}`

    const eventUid = `meeting-${bookingResult.bookingId || Date.now()}@tarajglobal.com`

    const icalContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Taraj Global Solutions//Meeting System//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:REQUEST',
      'BEGIN:VEVENT',
      `UID:${eventUid}`,
      `DTSTAMP:${dtStamp}`,
      `DTSTART:${startUTC}`,
      `DTEND:${endUTC}`,
      'SUMMARY:Strategy Call with Taraj Global',
      `DESCRIPTION:Strategy Call meeting booked by ${fullName} (${company}, ${email}, Phone: ${phone || 'N/A'}).`,
      'LOCATION:Online Strategy Call (Taraj Global)',
      `ORGANIZER;CN="Taraj Global":mailto:${FROM_EMAIL}`,
      `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE;CN="${fullName}":mailto:${email}`,
      `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;RSVP=TRUE;CN="Taraj Global Admin":mailto:${ADMIN_EMAIL}`,
      'STATUS:CONFIRMED',
      'SEQUENCE:0',
      'TRANSP:OPAQUE',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n')

    // User confirmation email
    const userMailOptions = {
      from: getFromEmail(),
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

            <div style="text-align: center; margin: 25px 0;">
              <a href="${googleCalUrl}" target="_blank" style="background: linear-gradient(135deg, #00A6FF, #0077CC); color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px; display: inline-block; box-shadow: 0 4px 8px rgba(0,166,255,0.3);">
                📅 Add to Google Calendar
              </a>
            </div>
            
            <p>Our team looks forward to speaking with you and discussing how Taraj Global can support your B2B growth and lead generation goals.</p>
            
            <p>Best regards,<br>Taraj Global<br>info@tarajglobal.com<br>+91 96655-99442</p>
            
            <div class="footer">
              <p>Taraj Global</p>
              <p>The Space Business Complex, Office No. 512 to 517, Grant Rd, Kharadi, Pune, Maharashtra 411014</p>
              <p>Email: careers@tarajglobal.com | Phone: +91 96655-99442</p>
            </div>
          </div>
        </body>
        </html>
      `,
      icalEvent: {
        filename: 'invite.ics',
        method: 'REQUEST',
        content: icalContent
      }
    }
    
    // Admin notification email
    const adminMailOptions = {
      from: getFromEmail(),
      to: getAdminEmail(),
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

            <div style="text-align: center; margin: 25px 0;">
              <a href="${googleCalUrl}" target="_blank" style="background: linear-gradient(135deg, #FF6D00, #E65100); color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px; display: inline-block; box-shadow: 0 4px 8px rgba(255,109,0,0.3);">
                📅 Add to Admin Google Calendar
              </a>
            </div>
          </div>
        </body>
        </html>
      `,
      icalEvent: {
        filename: 'invite.ics',
        method: 'REQUEST',
        content: icalContent
      }
    }
    
    const activeTransporter = getTransporter()

    // Send user confirmation email
    let userEmailSent = false
    try {
      await activeTransporter.sendMail(userMailOptions)
      userEmailSent = true
      console.log('User confirmation email sent successfully to:', email)
    } catch (emailError) {
      console.error('User email sending failed:', emailError.message)
    }
    
    // Send admin notification email
    try {
      await activeTransporter.sendMail(adminMailOptions)
      console.log('Admin notification email sent successfully to:', getAdminEmail())
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
    
    // Notify admins about new lead and send email
    try {
      await notificationHelper.notifyAdmins(notificationHelper.notifications.newLead(name, result.insertId))
      
      // Also send email notification to admin
      await emailService.sendLeadNotification(
        { name, email, company, phone, message },
        getAdminEmail()
      )
      
      // Send confirmation email to the user
      await emailService.sendLeadConfirmation({ name, email, subject, message })
    } catch (notificationError) {
      console.error('Failed to create notification or send email:', notificationError)
    }
    
    res.status(201).json({ 
      success: true, 
      message: 'Your message has been received. We\'ll be in touch shortly.', 
      id: result.insertId,
      leadId: result.insertId
    })
  } catch (error) {
    console.error('Contact submission error:', error)
    res.status(500).json({ success: false, message: 'Internal server error' })
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
    res.status(500).json({ success: false, message: 'Internal server error' })
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
    res.status(500).json({ success: false, message: 'Internal server error' })
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
    res.status(500).json({ success: false, message: 'Internal server error' })
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
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

export default router
