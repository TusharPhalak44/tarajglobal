/**
 * Meeting Public Controller
 * Handles booking requests, slot availability, and confirmation retrieval.
 */

import Meeting from '../models/Meeting.js'
import {
  BOOKING_CONFIG,
  generateStandardSlotsForDate,
  normalizeTimeTo24h,
  formatTime12h
} from '../config/booking.config.js'
import { createStrategyCallCalendarEvent } from '../services/googleCalendar.service.js'
import {
  sendMeetingConfirmationEmail,
  sendMeetingAdminNotificationEmail
} from '../services/email.service.js'

/**
 * GET /api/meetings/availability?date=YYYY-MM-DD
 * Returns slots with available boolean
 */
export const getAvailability = async (req, res) => {
  try {
    const { date } = req.query

    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Date parameter is required in YYYY-MM-DD format.'
      })
    }

    const targetDate = new Date(`${date}T00:00:00+05:30`)
    if (isNaN(targetDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format. Expected YYYY-MM-DD.'
      })
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const dateOnlyTarget = new Date(targetDate)
    dateOnlyTarget.setHours(0, 0, 0, 0)

    // Past date check
    if (dateOnlyTarget < today) {
      return res.status(200).json({
        success: true,
        date,
        timezone: BOOKING_CONFIG.timezone,
        slots: []
      })
    }

    // Weekend or blocked day check
    const standardSlots = generateStandardSlotsForDate(targetDate)
    if (standardSlots.length === 0) {
      return res.status(200).json({
        success: true,
        date,
        timezone: BOOKING_CONFIG.timezone,
        slots: []
      })
    }

    // Query booked slots from database for this date
    const bookedRecords = await Meeting.getBookedSlotsForDate(date)
    const bookedTimesSet = new Set(
      bookedRecords.flatMap(r => [
        normalizeTimeTo24h(r.meeting_time),
        normalizeTimeTo24h(r.start_time)
      ]).filter(Boolean)
    )

    // Current time cutoff for same-day bookings
    const now = new Date()
    const isToday = dateOnlyTarget.getTime() === today.getTime()
    const nowMinutes = now.getHours() * 60 + now.getMinutes() + BOOKING_CONFIG.minAdvanceNoticeMinutes

    const slots = standardSlots.map(slot => {
      const [h, m] = slot.time24.split(':').map(Number)
      const slotMinutes = h * 60 + m

      let isAvailable = true

      // If already booked in database
      if (bookedTimesSet.has(slot.time24)) {
        isAvailable = false
      }

      // If today and within advance notice threshold
      if (isToday && slotMinutes <= nowMinutes) {
        isAvailable = false
      }

      return {
        time: slot.time12,
        time24: slot.time24,
        endTime: slot.endTime12,
        available: isAvailable
      }
    })

    return res.json({
      success: true,
      date,
      timezone: BOOKING_CONFIG.timezone,
      slots
    })
  } catch (error) {
    console.error('[AVAILABILITY_ERROR]', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve slot availability. Please try again.'
    })
  }
}

/**
 * POST /api/meetings
 * Books a strategy call, creates Google Calendar event & Meet link, sends emails
 */
export const createMeeting = async (req, res) => {
  const {
    fullName,
    name,
    email,
    phone,
    company,
    interest,
    message,
    date,
    time,
    timeZone
  } = req.body

  const clientName = (fullName || name || '').trim()
  const clientEmail = (email || '').trim().toLowerCase()
  const clientCompany = (company || '').trim()
  const clientPhone = (phone || '').trim()
  const clientInterest = (interest || 'B2B Growth / Demand Generation').trim()
  const clientMessage = (message || '').trim()
  const clientDate = typeof date === 'string' ? date.split('T')[0] : date
  const clientTime = (time || '').trim()
  const clientTimeZone = timeZone || BOOKING_CONFIG.timezone

  // 1. Validation
  if (!clientName) {
    return res.status(400).json({ success: false, message: 'Full name is required.' })
  }
  if (!clientEmail || !/^\S+@\S+\.\S+$/.test(clientEmail)) {
    return res.status(400).json({ success: false, message: 'A valid email address is required.' })
  }
  if (!clientCompany) {
    return res.status(400).json({ success: false, message: 'Company name is required.' })
  }
  if (!clientDate) {
    return res.status(400).json({ success: false, message: 'Preferred date is required.' })
  }
  if (!clientTime) {
    return res.status(400).json({ success: false, message: 'Preferred time slot is required.' })
  }

  // Prevent past dates
  const meetingDateObj = new Date(`${clientDate}T00:00:00+05:30`)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  if (meetingDateObj < today) {
    return res.status(400).json({ success: false, message: 'Meeting date cannot be in the past.' })
  }

  // 2. Database transaction & slot availability check
  let createdMeeting = null
  try {
    createdMeeting = await Meeting.create({
      fullName: clientName,
      email: clientEmail,
      company: clientCompany,
      phone: clientPhone,
      interest: clientInterest,
      message: clientMessage,
      date: clientDate,
      time: clientTime,
      timeZone: clientTimeZone,
      status: 'pending'
    })

    console.log(`[BOOKING_CREATED] Pending meeting created: ${createdMeeting.booking_id} for ${clientEmail} on ${clientDate} ${clientTime}`)
  } catch (dbError) {
    if (dbError.code === 'SLOT_ALREADY_BOOKED' || dbError.status === 409) {
      return res.status(409).json({
        success: false,
        message: 'This time slot was just booked. Please select another available time.'
      })
    }
    console.error('[BOOKING_DB_ERROR]', dbError)
    return res.status(500).json({
      success: false,
      message: 'Failed to record meeting reservation. Please try again.'
    })
  }

  // 3. Create Google Calendar Event with Google Meet conference
  let calendarResult = null
  try {
    calendarResult = await createStrategyCallCalendarEvent(createdMeeting)
    console.log(`[CALENDAR_EVENT_CREATED] Event synced for booking ${createdMeeting.booking_id}: ID ${calendarResult.calendar_event_id}`)
  } catch (calError) {
    console.error(`[CALENDAR_EVENT_FAILED] Failed creating Google Calendar event for ${createdMeeting.booking_id}:`, calError.message)

    // Mark as failed in DB, do not send confirmation email, do not deceive customer
    await Meeting.update(createdMeeting.id, {
      status: 'failed',
      calendar_sync_status: 'failed'
    })

    return res.status(500).json({
      success: false,
      message: "We couldn't complete your booking right now. Please try another time."
    })
  }

  // 4. Update meeting with Google Calendar ID, Meet link, and set status to confirmed
  await Meeting.update(createdMeeting.id, {
    status: 'confirmed',
    calendar_event_id: calendarResult.calendar_event_id,
    calendar_event_link: calendarResult.calendar_event_link,
    meeting_link: calendarResult.meeting_link,
    calendar_sync_status: 'synced'
  })

  const confirmedMeeting = {
    ...createdMeeting,
    calendar_event_id: calendarResult.calendar_event_id,
    calendar_event_link: calendarResult.calendar_event_link,
    meeting_link: calendarResult.meeting_link,
    status: 'confirmed'
  }

  // 5. Send confirmation email to customer
  let emailStatus = 'sent'
  try {
    const emailResult = await sendMeetingConfirmationEmail(confirmedMeeting)
    if (!emailResult.success) {
      emailStatus = 'failed'
    }
  } catch (emailErr) {
    console.error('[EMAIL_FAILED] Customer confirmation email exception:', emailErr.message)
    emailStatus = 'failed'
  }

  // 6. Send internal notification email to Taraj admin
  try {
    await sendMeetingAdminNotificationEmail(confirmedMeeting)
  } catch (adminEmailErr) {
    console.error('[EMAIL_FAILED] Admin notification email exception:', adminEmailErr.message)
  }

  // Update email delivery status in DB (meeting remains confirmed even if email failed)
  await Meeting.update(createdMeeting.id, { email_status: emailStatus })

  // 7. Return successful response
  return res.status(201).json({
    success: true,
    message: 'Your strategy call has been scheduled successfully.',
    data: {
      id: confirmedMeeting.id,
      bookingId: confirmedMeeting.booking_id,
      fullName: confirmedMeeting.full_name,
      email: confirmedMeeting.email,
      company: confirmedMeeting.company,
      phone: confirmedMeeting.phone,
      interest: confirmedMeeting.interest,
      message: confirmedMeeting.message,
      date: confirmedMeeting.meeting_date,
      time: confirmedMeeting.meeting_time,
      timezone: confirmedMeeting.time_zone,
      meetingLink: confirmedMeeting.meeting_link,
      calendarLink: confirmedMeeting.calendar_event_link,
      status: 'confirmed',
      emailWarning: emailStatus === 'failed'
    }
  })
}

/**
 * GET /api/meetings/:id
 * Retrieve meeting details by database ID
 */
export const getMeetingById = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id)
    if (!meeting) {
      return res.status(404).json({ success: false, message: 'Meeting not found.' })
    }
    return res.json({ success: true, data: meeting })
  } catch (error) {
    console.error('[GET_MEETING_ERROR]', error)
    return res.status(500).json({ success: false, message: 'Failed to fetch meeting details.' })
  }
}

/**
 * GET /api/meetings/booking/:bookingId
 * Retrieve public meeting details by Booking ID (e.g. for booking success page)
 */
export const getMeetingByBookingId = async (req, res) => {
  try {
    const meeting = await Meeting.findByBookingId(req.params.bookingId)
    if (!meeting) {
      return res.status(404).json({ success: false, message: 'Booking record not found.' })
    }

    return res.json({
      success: true,
      data: {
        bookingId: meeting.booking_id,
        fullName: meeting.full_name,
        company: meeting.company,
        email: meeting.email,
        date: meeting.meeting_date,
        time: meeting.meeting_time,
        timezone: meeting.time_zone,
        meetingLink: meeting.meeting_link,
        calendarLink: meeting.calendar_event_link,
        status: meeting.status,
        interest: meeting.interest
      }
    })
  } catch (error) {
    console.error('[GET_BOOKING_ERROR]', error)
    return res.status(500).json({ success: false, message: 'Failed to retrieve booking information.' })
  }
}

export default {
  getAvailability,
  createMeeting,
  getMeetingById,
  getMeetingByBookingId
}
