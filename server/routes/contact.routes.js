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
import { formLimiter } from '../middleware/rateLimit.middleware.js'

const router = express.Router()

// Helper functions to dynamically fetch current environment settings
const getTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
    secure: process.env.EMAIL_PORT === '465',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD || process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: process.env.NODE_ENV === 'production'
    }
  })
}

const getAdminEmail = () => process.env.ADMIN_EMAIL || process.env.EMAIL_USER
const getFromEmail = () => {
  const addr = process.env.EMAIL_FROM || process.env.EMAIL_USER || 'info@tarajglobal.com'
  return `"TaRaj Global" <${addr}>`
}

const logEmailError = (label, err) => {
  if (err?.message?.includes('550-5.4.5') || err?.message?.includes('Daily user sending limit exceeded')) {
    console.error(`❌ GMAIL DAILY SENDING LIMIT EXCEEDED [${label}]: Google has blocked outgoing emails on account (${getFromEmail()}) with error 550-5.4.5. Please update EMAIL_USER & EMAIL_PASSWORD in server/.env with another Gmail account or domain SMTP.`)
  } else {
    console.error(`❌ Email send failed [${label}]:`, err?.message || err)
  }
}

// Helper to calculate exact UTC dates for Google Calendar and iCalendar across US and world time zones
const getMeetingUtcDates = (formattedDate, timeStr, finalTimeZone) => {
  const isPM = /pm/i.test(timeStr)
  const isAM = /am/i.test(timeStr)
  const cleanTime = (timeStr || '').replace(/[^0-9:]/g, '')
  const parts = cleanTime.split(':')
  let hours = parseInt(parts[0], 10) || 0
  const minutes = parseInt(parts[1], 10) || 0
  if (isPM && hours < 12) hours += 12
  if (isAM && hours === 12) hours = 0

  const [year, month, day] = (formattedDate || '').split('-').map(n => parseInt(n, 10))
  let startDateObj = new Date(Date.UTC(year, (month || 1) - 1, day || 1, hours, minutes, 0))

  if (finalTimeZone.includes('New_York') || finalTimeZone === 'EST' || finalTimeZone === 'EDT' || finalTimeZone.includes('Eastern')) {
    startDateObj = new Date(startDateObj.getTime() + (5 * 60 * 60 * 1000))
  } else if (finalTimeZone.includes('Chicago') || finalTimeZone === 'CST' || finalTimeZone === 'CDT' || finalTimeZone.includes('Central')) {
    startDateObj = new Date(startDateObj.getTime() + (6 * 60 * 60 * 1000))
  } else if (finalTimeZone.includes('Denver') || finalTimeZone === 'MST' || finalTimeZone === 'MDT' || finalTimeZone.includes('Mountain')) {
    startDateObj = new Date(startDateObj.getTime() + (7 * 60 * 60 * 1000))
  } else if (finalTimeZone.includes('Los_Angeles') || finalTimeZone === 'PST' || finalTimeZone === 'PDT' || finalTimeZone.includes('Pacific')) {
    startDateObj = new Date(startDateObj.getTime() + (8 * 60 * 60 * 1000))
  } else if (finalTimeZone.includes('Kolkata') || finalTimeZone.includes('India') || finalTimeZone === 'IST' || finalTimeZone.includes('Asia')) {
    startDateObj = new Date(startDateObj.getTime() - (5.5 * 60 * 60 * 1000))
  }

  const endDateObj = new Date(startDateObj.getTime() + 30 * 60 * 1000)
  const formatICalUTC = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

  return {
    startDateObj,
    endDateObj,
    startUTC: formatICalUTC(startDateObj),
    endUTC: formatICalUTC(endDateObj),
    dtStamp: formatICalUTC(new Date())
  }
}

// @route   POST /api/contact/meeting
// @desc    Book a meeting and send confirmation email
// @access  Public
router.post('/meeting', formLimiter, [
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
    
    // Default timezone if not provided (US Eastern Time)
    const finalTimeZone = timeZone || 'America/New_York'
    
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
    const { startUTC, endUTC, dtStamp } = getMeetingUtcDates(formattedDate, time, finalTimeZone)

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
      replyTo: getAdminEmail(),
      subject: 'Your Meeting with Taraj Global is Confirmed',
      text: `Hi ${fullName},\n\nThank you for scheduling a meeting with Taraj Global.\n\nYour meeting has been successfully confirmed.\n\nMeeting Details:\n- Date: ${displayDate}\n- Time: ${time}\n- Time Zone: ${finalTimeZone}\n- Email: ${email}\n\nAdd to Google Calendar:\n${googleCalUrl}\n\nBest regards,\nTaraj Global\ninfo@tarajglobal.com | +91 96655-99442`,
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
    
    // Admin notification email (clean HTML + plain-text fallback, no redundant ical to avoid self-spoofing filter)
    const adminMailOptions = {
      from: getFromEmail(),
      to: getAdminEmail(),
      replyTo: email,
      subject: `New Meeting Booking: ${fullName} (${company})`,
      text: `New Meeting Booking Received\n\nCustomer Details:\n- Customer Name: ${fullName}\n- Customer Email: ${email}\n- Company: ${company}\n- Phone: ${phone || 'Not provided'}\n\nMeeting Details:\n- Date: ${displayDate}\n- Time: ${time}\n- Time Zone: ${finalTimeZone}\n- Meeting Type: Strategy Call\n- Booking ID: ${bookingResult.bookingId}\n\nAdd to Admin Google Calendar:\n${googleCalUrl}`,
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
      `
    }
    
    // Send instant success response to client for zero-delay UI update
    res.status(201).json({ 
      success: true, 
      message: 'Meeting booked successfully. Confirmation email sent.',
      bookingId: bookingResult.bookingId
    })

    // Dispatch confirmation and admin emails concurrently in background without blocking client
    const activeTransporter = getTransporter()
    Promise.allSettled([
      activeTransporter.sendMail(userMailOptions)
        .then(() => console.log('User confirmation email sent successfully to:', email))
        .catch((emailError) => logEmailError('User Booking Confirmation', emailError)),
      activeTransporter.sendMail(adminMailOptions)
        .then(() => console.log('Admin notification email sent successfully to:', getAdminEmail()))
        .catch((adminEmailError) => logEmailError('Admin Booking Notification', adminEmailError))
    ]).catch((err) => console.error('Meeting email background error:', err))
  } catch (error) {
    console.error('Booking error:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Failed to book meeting. Please try again.' 
    })
  }
})

// @route   POST /api/contact/meeting/cancel
// @desc    Cancel an appointment and send cancellation confirmation email
// @access  Public
router.post('/meeting/cancel', formLimiter, [
  body('email').isEmail().withMessage('Valid email is required')
], validate, async (req, res) => {
  try {
    const { bookingId, email, fullName, date, time, timeZone, reason } = req.body
    const FROM_EMAIL = getFromEmail()
    const ADMIN_EMAIL = getAdminEmail()
    const finalTimeZone = timeZone || 'America/New_York'

    let formattedDate = ''
    let displayDate = date || 'Scheduled Date'
    if (date) {
      try {
        const meetingDate = new Date(date)
        if (!isNaN(meetingDate.getTime())) {
          formattedDate = meetingDate.toISOString().split('T')[0]
          displayDate = meetingDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        }
      } catch (e) {
        console.error('Cancel date format error:', e)
      }
    }

    // Update meeting status in database
    await Meeting.cancelByBookingOrDetails({
      bookingId,
      email,
      date: formattedDate || date,
      time
    })

    // Compute RFC 5545 iCalendar cancellation event
    let icalContent = null
    if (formattedDate && time) {
      const { startUTC, endUTC, dtStamp } = getMeetingUtcDates(formattedDate, time, finalTimeZone)
      const eventUid = `meeting-${bookingId || email}@tarajglobal.com`
      icalContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Taraj Global Solutions//Meeting System//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:CANCEL',
        'BEGIN:VEVENT',
        `UID:${eventUid}`,
        `DTSTAMP:${dtStamp}`,
        `DTSTART:${startUTC}`,
        `DTEND:${endUTC}`,
        'SUMMARY:Cancelled: Strategy Call with Taraj Global',
        `DESCRIPTION:This strategy call with ${fullName || email} has been cancelled.`,
        'STATUS:CANCELLED',
        'SEQUENCE:1',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n')
    }

    // Client cancellation email
    const clientCancelMail = {
      from: FROM_EMAIL,
      to: email,
      replyTo: ADMIN_EMAIL,
      subject: 'Your Meeting with Taraj Global has been Cancelled',
      text: `Hi ${fullName || 'there'},\n\nThis email confirms that your scheduled strategy call with Taraj Global on ${displayDate}${time ? ` at ${time}` : ''} (${finalTimeZone}) has been cancelled as requested.\n\nBest regards,\nTaraj Global Team\ninfo@tarajglobal.com | +91 96655-99442`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Meeting Cancelled</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #EF4444, #B91C1C); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #EF4444; }
            .detail-item { margin: 10px 0; padding: 10px; background: #f0f0f0; border-radius: 5px; }
            .detail-label { font-weight: bold; color: #666; }
            .detail-value { color: #333; margin-top: 5px; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Your Meeting Has Been Cancelled</h1>
            <p>Confirmation of cancelled appointment</p>
          </div>
          <div class="content">
            <p>Hi ${fullName || 'there'},</p>
            <p>This email confirms that your scheduled strategy call with Taraj Global has been cancelled as requested.</p>
            
            <div class="details">
              <h3 style="color: #EF4444; margin-top: 0;">Cancelled Appointment Details</h3>
              <div class="detail-item">
                <div class="detail-label">Date:</div>
                <div class="detail-value">${displayDate}</div>
              </div>
              ${time ? `
              <div class="detail-item">
                <div class="detail-label">Time:</div>
                <div class="detail-value">${time}</div>
              </div>
              ` : ''}
              <div class="detail-item">
                <div class="detail-label">Time Zone:</div>
                <div class="detail-value">${finalTimeZone}</div>
              </div>
            </div>

            <p>If your plans change or you would like to book a meeting at a different time, you are welcome to schedule a new appointment anytime on our website.</p>
            
            <div style="text-align: center; margin: 25px 0;">
              <a href="https://tarajglobal.com" target="_blank" style="background: linear-gradient(135deg, #00A6FF, #0077CC); color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px; display: inline-block;">
                Book a New Appointment
              </a>
            </div>

            <p>Best regards,<br>Taraj Global Team<br>info@tarajglobal.com<br>+91 96655-99442</p>

            <div class="footer">
              <p>Taraj Global</p>
              <p>The Space Business Complex, Office No. 512 to 517, Grant Rd, Kharadi, Pune, Maharashtra 411014</p>
            </div>
          </div>
        </body>
        </html>
      `,
      ...(icalContent ? {
        icalEvent: {
          filename: 'cancelled.ics',
          method: 'CANCEL',
          content: icalContent
        }
      } : {})
    }

    // Admin cancellation alert
    const adminCancelMail = {
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: `Meeting Cancelled: ${fullName || email}`,
      text: `Meeting Cancellation Notice\n\nCustomer: ${fullName || 'N/A'} (${email})\nOriginal Date: ${displayDate}\nOriginal Time: ${time || 'N/A'} (${finalTimeZone})\nBooking ID: ${bookingId || 'N/A'}${reason ? `\nReason: ${reason}` : ''}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Meeting Cancelled Alert</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #EF4444; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .details { background: white; padding: 15px; border-radius: 6px; margin: 15px 0; border-left: 4px solid #EF4444; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>Meeting Cancellation Notice</h2>
          </div>
          <div class="content">
            <p>A client has cancelled their scheduled strategy call.</p>
            <div class="details">
              <p><strong>Customer:</strong> ${fullName || 'N/A'} (${email})</p>
              <p><strong>Original Date:</strong> ${displayDate}</p>
              <p><strong>Original Time:</strong> ${time || 'N/A'} (${finalTimeZone})</p>
              <p><strong>Booking ID:</strong> ${bookingId || 'N/A'}</p>
              ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
            </div>
          </div>
        </body>
        </html>
      `
    }

    // Instant response to client for zero-delay UI update
    res.status(200).json({
      success: true,
      message: 'Your appointment has been cancelled successfully. Confirmation email sent.'
    })

    // Concurrently dispatch emails in background
    const activeTransporter = getTransporter()
    Promise.allSettled([
      activeTransporter.sendMail(clientCancelMail)
        .then(() => console.log('Cancellation email sent to:', email))
        .catch(err => logEmailError('Client Cancellation', err)),
      activeTransporter.sendMail(adminCancelMail)
        .then(() => console.log('Admin cancellation alert sent to:', ADMIN_EMAIL))
        .catch(err => logEmailError('Admin Cancellation Alert', err))
    ]).catch(err => console.error('Background cancel email error:', err))

  } catch (error) {
    console.error('Cancel error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to cancel appointment. Please try again.'
    })
  }
})

// @route   POST /api/contact/meeting/reschedule
// @desc    Reschedule an appointment and send updated confirmation email
// @access  Public
router.post('/meeting/reschedule', formLimiter, [
  body('email').isEmail().withMessage('Valid email is required'),
  body('date').notEmpty().withMessage('New date is required'),
  body('time').notEmpty().withMessage('New time is required')
], validate, async (req, res) => {
  try {
    const { bookingId, email, fullName, company, phone, oldDate, oldTime, date, time, timeZone } = req.body
    const FROM_EMAIL = getFromEmail()
    const ADMIN_EMAIL = getAdminEmail()
    const finalTimeZone = timeZone || 'America/New_York'

    const meetingDate = new Date(date)
    const formattedDate = meetingDate.toISOString().split('T')[0]

    let oldFormattedDate = null
    let oldDisplayDate = oldDate || ''
    if (oldDate) {
      try {
        const d = new Date(oldDate)
        if (!isNaN(d.getTime())) {
          oldFormattedDate = d.toISOString().split('T')[0]
          oldDisplayDate = d.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        }
      } catch (e) {
        console.error('Old date format error:', e)
      }
    }

    // Update in database
    await Meeting.rescheduleByBookingOrDetails({
      bookingId,
      email,
      oldDate: oldFormattedDate || oldDate,
      date: formattedDate,
      time,
      timeZone: finalTimeZone
    })

    const displayDate = meetingDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    const { startUTC, endUTC, dtStamp } = getMeetingUtcDates(formattedDate, time, finalTimeZone)

    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Rescheduled: Strategy Call with Taraj Global')}&dates=${startUTC}/${endUTC}&details=${encodeURIComponent(`Rescheduled Strategy Call meeting with ${fullName || email} (${company || ''}).\nEmail: ${email}\nPhone: ${phone || 'N/A'}`)}&location=${encodeURIComponent('Online Strategy Call (Taraj Global)')}&add=${encodeURIComponent(email)}`

    const eventUid = `meeting-${bookingId || Date.now()}@tarajglobal.com`

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
      'SUMMARY:Rescheduled: Strategy Call with Taraj Global',
      `DESCRIPTION:Rescheduled Strategy Call with ${fullName || email} (${company || ''}, Phone: ${phone || 'N/A'}).`,
      'LOCATION:Online Strategy Call (Taraj Global)',
      `ORGANIZER;CN="Taraj Global":mailto:${FROM_EMAIL}`,
      `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE;CN="${fullName || email}":mailto:${email}`,
      `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;RSVP=TRUE;CN="Taraj Global Admin":mailto:${ADMIN_EMAIL}`,
      'STATUS:CONFIRMED',
      'SEQUENCE:1',
      'TRANSP:OPAQUE',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n')

    // Client reschedule confirmation email
    const clientRescheduleMail = {
      from: FROM_EMAIL,
      to: email,
      replyTo: ADMIN_EMAIL,
      subject: 'Your Meeting with Taraj Global is Rescheduled',
      text: `Hi ${fullName || 'there'},\n\nYour strategy call appointment with Taraj Global has been rescheduled.\n\nNew Schedule:\n- Date: ${displayDate}\n- Time: ${time}\n- Time Zone: ${finalTimeZone}\n\nAdd to Google Calendar:\n${googleCalUrl}\n\nBest regards,\nTaraj Global Team\ninfo@tarajglobal.com | +91 96655-99442`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Meeting Rescheduled</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #00A6FF, #0055AA); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #00A6FF; }
            .detail-item { margin: 10px 0; padding: 10px; background: #f0f0f0; border-radius: 5px; }
            .detail-label { font-weight: bold; color: #666; }
            .detail-value { color: #333; margin-top: 5px; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Your Meeting Has Been Rescheduled</h1>
            <p>Updated appointment details</p>
          </div>
          <div class="content">
            <p>Hi ${fullName || 'there'},</p>
            <p>Your strategy call appointment with Taraj Global has been successfully rescheduled to the new date and time below.</p>
            
            <div class="details">
              <h3 style="color: #00A6FF; margin-top: 0;">Updated Meeting Details</h3>
              <div class="detail-item">
                <div class="detail-label">New Date:</div>
                <div class="detail-value" style="font-weight: bold; color: #00A6FF;">${displayDate}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">New Time:</div>
                <div class="detail-value" style="font-weight: bold; color: #00A6FF;">${time}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Time Zone:</div>
                <div class="detail-value">${finalTimeZone}</div>
              </div>
              ${oldDisplayDate ? `
              <div class="detail-item" style="opacity: 0.7;">
                <div class="detail-label">Previous Schedule:</div>
                <div class="detail-value"><del>${oldDisplayDate} ${oldTime ? `at ${oldTime}` : ''}</del></div>
              </div>
              ` : ''}
            </div>

            <div style="text-align: center; margin: 25px 0;">
              <a href="${googleCalUrl}" target="_blank" style="background: linear-gradient(135deg, #00A6FF, #0077CC); color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px; display: inline-block; box-shadow: 0 4px 8px rgba(0,166,255,0.3);">
                📅 Add Updated Meeting to Google Calendar
              </a>
            </div>

            <p>Our team looks forward to connecting with you at the updated time.</p>
            <p>Best regards,<br>Taraj Global Team<br>info@tarajglobal.com<br>+91 96655-99442</p>

            <div class="footer">
              <p>Taraj Global</p>
              <p>The Space Business Complex, Office No. 512 to 517, Grant Rd, Kharadi, Pune, Maharashtra 411014</p>
            </div>
          </div>
        </body>
        </html>
      `,
      icalEvent: {
        filename: 'rescheduled.ics',
        method: 'REQUEST',
        content: icalContent
      }
    }

    // Admin reschedule notification
    const adminRescheduleMail = {
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: `Meeting Rescheduled: ${fullName || email}`,
      text: `Meeting Rescheduled Notice\n\nCustomer: ${fullName || 'N/A'} (${email})\nCompany: ${company || 'N/A'}${oldDisplayDate ? `\nPrevious: ${oldDisplayDate} at ${oldTime || 'N/A'}` : ''}\nNew Date: ${displayDate}\nNew Time: ${time} (${finalTimeZone})\nBooking ID: ${bookingId || 'N/A'}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Meeting Rescheduled Alert</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #00A6FF; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .details { background: white; padding: 15px; border-radius: 6px; margin: 15px 0; border-left: 4px solid #00A6FF; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>Meeting Rescheduled Notice</h2>
          </div>
          <div class="content">
            <p>A client has rescheduled their strategy call.</p>
            <div class="details">
              <p><strong>Customer:</strong> ${fullName || 'N/A'} (${email})</p>
              <p><strong>Company:</strong> ${company || 'N/A'}</p>
              ${oldDisplayDate ? `<p><strong>Previous:</strong> ${oldDisplayDate} at ${oldTime || 'N/A'}</p>` : ''}
              <p><strong>NEW Date:</strong> ${displayDate}</p>
              <p><strong>NEW Time:</strong> ${time} (${finalTimeZone})</p>
              <p><strong>Booking ID:</strong> ${bookingId || 'N/A'}</p>
            </div>
          </div>
        </body>
        </html>
      `
    }

    // Instant response to client
    res.status(200).json({
      success: true,
      message: 'Your appointment has been rescheduled successfully. Updated confirmation email sent.',
      bookingId: bookingId || null
    })

    // Concurrently dispatch emails in background
    const activeTransporter = getTransporter()
    Promise.allSettled([
      activeTransporter.sendMail(clientRescheduleMail)
        .then(() => console.log('Reschedule email sent to:', email))
        .catch(err => logEmailError('Client Reschedule', err)),
      activeTransporter.sendMail(adminRescheduleMail)
        .then(() => console.log('Admin reschedule alert sent to:', ADMIN_EMAIL))
        .catch(err => logEmailError('Admin Reschedule Alert', err))
    ]).catch(err => console.error('Background reschedule email error:', err))

  } catch (error) {
    console.error('Reschedule error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to reschedule appointment. Please try again.'
    })
  }
})

// @route   POST /api/contact
// @desc    Submit contact form and create lead
// @access  Public
router.post('/', formLimiter, [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('message').trim().notEmpty().withMessage('Message is required')
], validate, async (req, res) => {
  try {
    const { name, email, phone, subject, message, company } = req.body
    const attribution = req.body.attribution && typeof req.body.attribution === 'object' ? req.body.attribution : {}
    const clip = (value, max) => String(value || '').slice(0, max)
    const leadSource = clip(attribution.channel || 'contact_form', 100)
    const pageUrl = clip(
      [
        attribution.source_page && `from: ${attribution.source_page}`,
        attribution.landing_page && `landing: ${attribution.landing_page}`,
        attribution.referrer && `referrer: ${attribution.referrer}`,
      ].filter(Boolean).join(' | ') || req.headers.referer || '/',
      500
    )
    
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
      ) VALUES (?, ?, ?, ?, ?, ?, 'new', ?, ?, NOW(), NOW())
    `
    
    const [result] = await db.execute(insertQuery, [
      name,
      email,
      phone || '',
      company || '',
      subject || '',
      message,
      leadSource,
      pageUrl
    ])
    
    // Notify admins about new lead and send email
    try {
      await notificationHelper.notifyAdmins(notificationHelper.notifications.newLead(name, result.insertId))
      
      // Also send email notification to admin
      await emailService.sendLeadNotification(
        { name, email, company, phone, message, source: leadSource, page_url: pageUrl },
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
