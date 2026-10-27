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
import {
  validate24HourAdvance,
  getMeetingUtcDates,
  parseMeetingDateTimeToUtc,
  normalizeTimezone
} from '../utils/schedulingValidator.js'
import {
  renderClientMeetingConfirmedEmail,
  renderAdminMeetingConfirmedEmail,
  renderClientRescheduledEmail,
  renderAdminRescheduledEmail,
  renderClientCancelledEmail,
  renderAdminCancelledEmail,
} from '../helpers/emailTemplates.js'

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

// Note: getMeetingUtcDates, validate24HourAdvance, and parseMeetingDateTimeToUtc
// are imported from ../utils/schedulingValidator.js with full DST and IANA support.

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
    
    // Normalize timezone with IANA and DST support
    const finalTimeZone = normalizeTimezone(timeZone)

    // Format the date for database (YYYY-MM-DD)
    let formattedDate = date
    if (typeof date === 'string' && date.includes('T')) {
      formattedDate = date.split('T')[0]
    } else {
      const dObj = new Date(date)
      if (!isNaN(dObj.getTime())) {
        formattedDate = dObj.toISOString().split('T')[0]
      }
    }

    // RULE 1: Mandatory 24-Hour Advance Booking Validation
    const advanceCheck = validate24HourAdvance(formattedDate, time, finalTimeZone)
    if (!advanceCheck.valid) {
      return res.status(400).json({
        success: false,
        code: 'ADVANCE_NOTICE_REQUIRED',
        message: advanceCheck.message
      })
    }

    // RULE 2: Prevent Double Booking (Host & Slot Conflict Check)
    const isSlotTaken = await Meeting.checkSlotConflict(formattedDate, time)
    if (isSlotTaken) {
      return res.status(409).json({
        success: false,
        code: 'SLOT_UNAVAILABLE',
        message: 'This time slot has just been booked. Please select another available time.'
      })
    }

    // Check for duplicate booking by same email
    const isDuplicate = await Meeting.checkDuplicateBooking(email, formattedDate, time)
    if (isDuplicate) {
      return res.status(400).json({ 
        success: false, 
        message: 'You already have an active booking for this date and time.' 
      })
    }

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
      html: renderClientMeetingConfirmedEmail({
        fullName,
        company,
        displayDate,
        time,
        finalTimeZone,
        email,
        googleCalUrl,
        bookingId: bookingResult.bookingId,
      }),
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
      html: renderAdminMeetingConfirmedEmail({
        fullName,
        email,
        company,
        phone,
        displayDate,
        time,
        finalTimeZone,
        bookingId: bookingResult.bookingId,
        googleCalUrl,
      })
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
      html: renderClientCancelledEmail({
        fullName,
        displayDate,
        time,
        finalTimeZone,
        reason,
      }),
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
      html: renderAdminCancelledEmail({
        fullName,
        email,
        displayDate,
        time,
        finalTimeZone,
        bookingId,
        reason,
      })
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
    const finalTimeZone = normalizeTimezone(timeZone)

    let formattedDate = date
    if (typeof date === 'string' && date.includes('T')) {
      formattedDate = date.split('T')[0]
    } else {
      const dObj = new Date(date)
      if (!isNaN(dObj.getTime())) {
        formattedDate = dObj.toISOString().split('T')[0]
      }
    }

    // RULE 1: Mandatory 24-Hour Advance Booking Validation for Rescheduling
    const advanceCheck = validate24HourAdvance(formattedDate, time, finalTimeZone)
    if (!advanceCheck.valid) {
      return res.status(400).json({
        success: false,
        code: 'ADVANCE_NOTICE_REQUIRED',
        message: advanceCheck.message
      })
    }

    // RULE 2: Prevent Double Booking on New Slot
    const isSlotTaken = await Meeting.checkSlotConflict(formattedDate, time, bookingId || null)
    if (isSlotTaken) {
      return res.status(409).json({
        success: false,
        code: 'SLOT_UNAVAILABLE',
        message: 'This time slot has just been booked. Please select another available time.'
      })
    }

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
      html: renderClientRescheduledEmail({
        fullName,
        displayDate,
        time,
        finalTimeZone,
        oldDisplayDate,
        oldTime,
        googleCalUrl,
      }),
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
      html: renderAdminRescheduledEmail({
        fullName,
        email,
        company,
        oldDisplayDate,
        oldTime,
        displayDate,
        time,
        finalTimeZone,
        bookingId,
      })
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

    const ctaButton = clip(attribution.cta_button || '', 150)
    const ctaSection = clip(attribution.cta_section || '', 150)
    const sourcePage = clip(attribution.source_page || '', 255)
    const utmCampaign = clip(attribution.utm_campaign || '', 150)
    const utmSource = clip(attribution.utm_source || '', 100)
    const utmMedium = clip(attribution.utm_medium || '', 100)
    const utmContent = clip(attribution.utm_content || '', 150)
    const utmTerm = clip(attribution.utm_term || '', 150)

    const leadSource = clip(attribution.channel || utmSource || 'contact_form', 100)
    const pageUrl = clip(
      [
        ctaButton && `cta: [${ctaButton}]`,
        ctaSection && `section: [${ctaSection}]`,
        sourcePage && `from: ${sourcePage}`,
        attribution.landing_page && `landing: ${attribution.landing_page}`,
        attribution.referrer && `referrer: ${attribution.referrer}`,
      ].filter(Boolean).join(' | ') || req.headers.referer || '/',
      500
    )
    
    // Save to contacts table with dedicated CTA and UTM columns
    let result
    try {
      const insertQuery = `
        INSERT INTO contacts (
          name, email, phone, company, subject, message, status, source, page_url,
          cta_button, cta_section, source_page, utm_campaign, utm_source, utm_medium, utm_content, utm_term,
          created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, 'new', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
      `
      const [insertRes] = await db.execute(insertQuery, [
        name, email, phone || '', company || '', subject || '', message,
        leadSource, pageUrl,
        ctaButton || null, ctaSection || null, sourcePage || null, utmCampaign || null,
        utmSource || null, utmMedium || null, utmContent || null, utmTerm || null
      ])
      result = insertRes
    } catch (dbErr) {
      // Safe fallback if some columns are pending migration
      const fallbackQuery = `
        INSERT INTO contacts (
          name, email, phone, company, subject, message, status, source, page_url,
          created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, 'new', ?, ?, NOW(), NOW())
      `
      const [fallbackRes] = await db.execute(fallbackQuery, [
        name, email, phone || '', company || '', subject || '', message,
        leadSource, pageUrl
      ])
      result = fallbackRes
    }

    // Save CTA Attribution details as initial automated lead note
    const ctaDetails = [
      ctaButton && `CTA Clicked: "${ctaButton}"`,
      ctaSection && `Section: "${ctaSection}"`,
      sourcePage && `Origin Page: ${sourcePage}`,
      utmCampaign && `UTM Campaign: ${utmCampaign}`,
      utmContent && `UTM Content: ${utmContent}`,
      utmSource && `UTM Source: ${utmSource}`,
    ].filter(Boolean).join(' | ')

    if (ctaDetails && result?.insertId) {
      try {
        await db.execute(
          `INSERT INTO lead_notes (lead_id, added_by, note, created_at) VALUES (?, NULL, ?, NOW())`,
          [result.insertId, `[Attribution Tracking] ${ctaDetails}`]
        )
      } catch (noteErr) {
        // Continue silently if lead_notes is unavailable
      }
    }
    
    // Notify admins about new lead and send email
    try {
      await notificationHelper.notifyAdmins({
        title: '🎯 New Lead Received',
        message: `${name} submitted form${ctaButton ? ` via "${ctaButton}"` : ''} in ${ctaSection || 'website'}${sourcePage ? ` (${sourcePage})` : ''}`,
        type: 'lead',
        link: '/admin/leads'
      })
      
      // Also send email notification to admin with full attribution
      await emailService.sendLeadNotification(
        {
          name,
          email,
          company,
          phone,
          message,
          source: leadSource,
          page_url: pageUrl,
          cta_button: ctaButton,
          cta_section: ctaSection,
          source_page: sourcePage,
          utm_campaign: utmCampaign,
          utm_source: utmSource,
          utm_medium: utmMedium,
        },
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

// @route   POST /api/contact/webhook/calendly
// @desc    Handle official Calendly webhook events (invitee.created, invitee.canceled)
//          Sends premium branded emails to both client & admin on each event.
// @access  Public (Idempotent synchronization)
router.post('/webhook/calendly', async (req, res) => {
  try {
    const eventType = req.body?.event
    const payload = req.body?.payload

    if (!eventType || !payload) {
      return res.status(200).json({ received: true, ignored: true })
    }

    const FROM_EMAIL = getFromEmail()
    const ADMIN_EMAIL = getAdminEmail()

    if (eventType === 'invitee.created') {
      const scheduledEvent = payload.scheduled_event || {}
      const startTime = scheduledEvent.start_time
      const endTime = scheduledEvent.end_time
      const email = payload.email
      const fullName = payload.name || 'Calendly Invitee'
      const bookingUri = payload.uri || ''
      const bookingId = bookingUri ? bookingUri.split('/').pop() : `CAL-${Date.now()}`

      if (startTime && email) {
        const startUtc = new Date(startTime)
        const dateKey = startUtc.toISOString().split('T')[0]
        const timeZone = scheduledEvent.timezone || payload.timezone || 'America/New_York'
        const timeKey = startUtc.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
          timeZone
        })

        const companyQ = payload.questions_and_answers?.find(q => /company/i.test(q.question))
        const company = companyQ?.answer || 'Enterprise Partner'
        const phone = payload.text_reminder_number || ''

        // Deduplication check: check if already synced
        const existing = await Meeting.findByBookingId(bookingId)
        if (!existing) {
          await Meeting.create({
            fullName,
            email,
            company,
            phone,
            date: dateKey,
            time: timeKey,
            timeZone,
            meetingType: scheduledEvent.name || 'Strategy Call'
          })
          console.log(`✅ [Calendly Webhook] Synced booking ${bookingId} (${dateKey} ${timeKey}) for ${email}`)
        }

        // ── Send premium branded emails ──────────────────────────────
        const displayDate = startUtc.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          timeZone,
        })

        // Build iCal & Google Calendar URL
        const fmtIcal = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
        const startUTC = fmtIcal(startUtc)
        const endUTC = endTime ? fmtIcal(new Date(endTime)) : fmtIcal(new Date(startUtc.getTime() + 30 * 60000))
        const dtStamp = fmtIcal(new Date())

        const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
          scheduledEvent.name || 'Strategy Call with Taraj Global'
        )}&dates=${startUTC}/${endUTC}&details=${encodeURIComponent(
          `Strategy Call meeting with ${fullName} (${company}).\nEmail: ${email}\nPhone: ${phone || 'N/A'}`
        )}&location=${encodeURIComponent('Online Strategy Call (Taraj Global)')}&add=${encodeURIComponent(email)}`

        const eventUid = `calendly-${bookingId}@tarajglobal.com`
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
          `SUMMARY:${scheduledEvent.name || 'Strategy Call with Taraj Global'}`,
          `DESCRIPTION:Strategy Call meeting booked by ${fullName} (${company}, ${email}, Phone: ${phone || 'N/A'}).`,
          'LOCATION:Online Strategy Call (Taraj Global)',
          `ORGANIZER;CN="Taraj Global":mailto:${ADMIN_EMAIL}`,
          `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE;CN="${fullName}":mailto:${email}`,
          'STATUS:CONFIRMED',
          'SEQUENCE:0',
          'TRANSP:OPAQUE',
          'END:VEVENT',
          'END:VCALENDAR'
        ].join('\r\n')

        // Client confirmation email (premium branded)
        const userMailOptions = {
          from: FROM_EMAIL,
          to: email,
          replyTo: ADMIN_EMAIL,
          subject: `Your Meeting with Taraj Global is Confirmed — ${displayDate}`,
          text: `Hi ${fullName},\n\nThank you for scheduling a meeting with Taraj Global.\n\nMeeting Details:\n- Date: ${displayDate}\n- Time: ${timeKey}\n- Time Zone: ${timeZone}\n\nAdd to Google Calendar:\n${googleCalUrl}\n\nBest regards,\nTaraj Global\ninfo@tarajglobal.com | +91 96655-99442`,
          html: renderClientMeetingConfirmedEmail({
            fullName,
            company,
            displayDate,
            time: timeKey,
            finalTimeZone: timeZone,
            email,
            googleCalUrl,
            bookingId,
          }),
          icalEvent: {
            filename: 'invite.ics',
            method: 'REQUEST',
            content: icalContent
          }
        }

        // Admin notification email (premium branded)
        const adminMailOptions = {
          from: FROM_EMAIL,
          to: ADMIN_EMAIL,
          replyTo: email,
          subject: `New Calendly Booking: ${fullName} (${company}) — ${displayDate}`,
          text: `New Meeting Booking via Calendly\n\nCustomer: ${fullName}\nEmail: ${email}\nCompany: ${company}\nPhone: ${phone || 'N/A'}\n\nDate: ${displayDate}\nTime: ${timeKey}\nTimezone: ${timeZone}\nBooking ID: ${bookingId}\n\nAdd to Google Calendar:\n${googleCalUrl}`,
          html: renderAdminMeetingConfirmedEmail({
            fullName,
            email,
            company,
            phone,
            displayDate,
            time: timeKey,
            finalTimeZone: timeZone,
            bookingId,
            googleCalUrl,
          })
        }

        // Dispatch emails in background
        const activeTransporter = getTransporter()
        Promise.allSettled([
          activeTransporter.sendMail(userMailOptions)
            .then(() => console.log(`✅ [Calendly Webhook] Client confirmation email sent to: ${email}`))
            .catch((err) => logEmailError('Calendly Client Confirmation', err)),
          activeTransporter.sendMail(adminMailOptions)
            .then(() => console.log(`✅ [Calendly Webhook] Admin notification email sent to: ${ADMIN_EMAIL}`))
            .catch((err) => logEmailError('Calendly Admin Notification', err))
        ]).catch((err) => console.error('[Calendly Webhook] Email dispatch error:', err))
      }

    } else if (eventType === 'invitee.canceled') {
      const scheduledEvent = payload.scheduled_event || {}
      const startTime = scheduledEvent.start_time
      const bookingUri = payload.uri || ''
      const bookingId = bookingUri ? bookingUri.split('/').pop() : null
      const email = payload.email
      const fullName = payload.name || 'Calendly Invitee'
      const timeZone = scheduledEvent.timezone || payload.timezone || 'America/New_York'
      const cancellationReason = payload.cancellation?.reason || ''

      await Meeting.cancelByBookingOrDetails({ bookingId, email })
      console.log(`✅ [Calendly Webhook] Cancelled booking ${bookingId || email}`)

      // ── Send premium branded cancellation emails ───────────────
      let displayDate = 'Scheduled Date'
      let timeKey = ''
      if (startTime) {
        const startUtc = new Date(startTime)
        displayDate = startUtc.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          timeZone,
        })
        timeKey = startUtc.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
          timeZone
        })
      }

      // Client cancellation email
      const clientCancelMail = {
        from: FROM_EMAIL,
        to: email,
        replyTo: ADMIN_EMAIL,
        subject: 'Your Meeting with Taraj Global has been Cancelled',
        text: `Hi ${fullName},\n\nThis email confirms that your scheduled strategy call with Taraj Global on ${displayDate}${timeKey ? ` at ${timeKey}` : ''} (${timeZone}) has been cancelled.\n\nBest regards,\nTaraj Global Team`,
        html: renderClientCancelledEmail({
          fullName,
          displayDate,
          time: timeKey,
          finalTimeZone: timeZone,
          reason: cancellationReason,
        })
      }

      // Admin cancellation alert
      const adminCancelMail = {
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        replyTo: email,
        subject: `Calendly Cancellation: ${fullName || email}`,
        text: `Meeting Cancellation via Calendly\n\nCustomer: ${fullName} (${email})\nDate: ${displayDate}\nTime: ${timeKey || 'N/A'} (${timeZone})\nBooking ID: ${bookingId || 'N/A'}${cancellationReason ? `\nReason: ${cancellationReason}` : ''}`,
        html: renderAdminCancelledEmail({
          fullName,
          email,
          displayDate,
          time: timeKey,
          finalTimeZone: timeZone,
          bookingId,
          reason: cancellationReason,
        })
      }

      // Dispatch cancellation emails in background
      const activeTransporter = getTransporter()
      Promise.allSettled([
        activeTransporter.sendMail(clientCancelMail)
          .then(() => console.log(`✅ [Calendly Webhook] Client cancellation email sent to: ${email}`))
          .catch((err) => logEmailError('Calendly Client Cancellation', err)),
        activeTransporter.sendMail(adminCancelMail)
          .then(() => console.log(`✅ [Calendly Webhook] Admin cancellation email sent to: ${ADMIN_EMAIL}`))
          .catch((err) => logEmailError('Calendly Admin Cancellation', err))
      ]).catch((err) => console.error('[Calendly Webhook] Cancellation email error:', err))
    }

    return res.status(200).json({ received: true, success: true })
  } catch (err) {
    console.error('❌ [Calendly Webhook Error]:', err.message)
    return res.status(200).json({ received: true, error: err.message })
  }
})

export default router
