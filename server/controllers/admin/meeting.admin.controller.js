/**
 * Admin Meetings Controller
 * Handles meeting management, status updates, rescheduling, and cancellation.
 */

import Meeting from '../../models/Meeting.js'
import {
  updateStrategyCallCalendarEvent,
  cancelStrategyCallCalendarEvent
} from '../../services/googleCalendar.service.js'
import {
  sendMeetingConfirmationEmail,
  sendMeetingAdminNotificationEmail,
  sendMeetingRescheduledEmail,
  sendMeetingCancellationEmail,
  verifySMTPConnection
} from '../../services/email.service.js'

/**
 * GET /api/admin/meetings
 */
export const getAllMeetings = async (req, res) => {
  try {
    const { status, search, date, page = 1, limit = 20 } = req.query
    const result = await Meeting.getAll({ status, search, date, page, limit })

    return res.json({
      success: true,
      data: result.meetings,
      pagination: {
        total: result.total,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        totalPages: Math.ceil(result.total / (parseInt(limit, 10) || 20))
      }
    })
  } catch (error) {
    console.error('[ADMIN_GET_MEETINGS_ERROR]', error)
    return res.status(500).json({ success: false, message: 'Failed to retrieve meetings.' })
  }
}

/**
 * GET /api/admin/meetings/:id
 */
export const getMeetingById = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id)
    if (!meeting) {
      return res.status(404).json({ success: false, message: 'Meeting not found.' })
    }
    return res.json({ success: true, data: meeting })
  } catch (error) {
    console.error('[ADMIN_GET_MEETING_DETAIL_ERROR]', error)
    return res.status(500).json({ success: false, message: 'Failed to retrieve meeting details.' })
  }
}

/**
 * PATCH /api/admin/meetings/:id/status
 */
export const updateMeetingStatus = async (req, res) => {
  try {
    const { status } = req.body
    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed', 'failed']

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      })
    }

    const meeting = await Meeting.findById(req.params.id)
    if (!meeting) {
      return res.status(404).json({ success: false, message: 'Meeting not found.' })
    }

    await Meeting.updateStatus(req.params.id, status)
    return res.json({ success: true, message: `Meeting status updated to ${status}.` })
  } catch (error) {
    console.error('[ADMIN_UPDATE_MEETING_STATUS_ERROR]', error)
    return res.status(500).json({ success: false, message: 'Failed to update meeting status.' })
  }
}

/**
 * POST /api/admin/meetings/:id/reschedule
 * Updates Google Calendar event, updates DB, sends reschedule email
 */
export const rescheduleMeeting = async (req, res) => {
  try {
    const { date, time, timeZone } = req.body

    if (!date || !time) {
      return res.status(400).json({
        success: false,
        message: 'Both new date and time slot are required for rescheduling.'
      })
    }

    const meeting = await Meeting.findById(req.params.id)
    if (!meeting) {
      return res.status(404).json({ success: false, message: 'Meeting not found.' })
    }

    // 1. Reschedule in Database (checks for slot conflict)
    try {
      await Meeting.reschedule(meeting.id, { date, time, timeZone })
    } catch (slotErr) {
      if (slotErr.code === 'SLOT_ALREADY_BOOKED' || slotErr.status === 409) {
        return res.status(409).json({
          success: false,
          message: 'The selected time slot is already booked. Please choose another time.'
        })
      }
      throw slotErr
    }

    const updatedMeeting = await Meeting.findById(meeting.id)

    // 2. Update existing Google Calendar event instead of creating another one
    if (meeting.calendar_event_id) {
      try {
        await updateStrategyCallCalendarEvent(meeting.calendar_event_id, updatedMeeting)
        await Meeting.update(meeting.id, { calendar_sync_status: 'synced' })
      } catch (calErr) {
        console.error('[ADMIN_CALENDAR_UPDATE_FAILED]', calErr.message)
        await Meeting.update(meeting.id, { calendar_sync_status: 'failed' })
      }
    }

    // 3. Send reschedule notification email to customer
    try {
      await sendMeetingRescheduledEmail(updatedMeeting)
    } catch (emailErr) {
      console.error('[ADMIN_RESCHEDULE_EMAIL_FAILED]', emailErr.message)
    }

    console.log(`[MEETING_RESCHEDULED] Meeting ${meeting.id} rescheduled to ${date} ${time}`)

    return res.json({
      success: true,
      message: 'Meeting rescheduled successfully and attendee notified.',
      data: updatedMeeting
    })
  } catch (error) {
    console.error('[ADMIN_RESCHEDULE_ERROR]', error)
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to reschedule meeting.'
    })
  }
}

/**
 * POST /api/admin/meetings/:id/cancel
 * Cancels meeting in DB, deletes Google Calendar event, sends cancellation email, frees slot
 */
export const cancelMeeting = async (req, res) => {
  try {
    const { cancellationReason } = req.body

    const meeting = await Meeting.findById(req.params.id)
    if (!meeting) {
      return res.status(404).json({ success: false, message: 'Meeting not found.' })
    }

    // 1. Update database record status to cancelled (retaining record for audit)
    await Meeting.cancel(meeting.id, cancellationReason)

    // 2. Delete/cancel Google Calendar event
    if (meeting.calendar_event_id) {
      try {
        await cancelStrategyCallCalendarEvent(meeting.calendar_event_id)
      } catch (calErr) {
        console.error('[ADMIN_CANCEL_CALENDAR_ERROR]', calErr.message)
      }
    }

    // 3. Send cancellation email to customer
    try {
      await sendMeetingCancellationEmail(meeting, cancellationReason)
    } catch (emailErr) {
      console.error('[ADMIN_CANCEL_EMAIL_FAILED]', emailErr.message)
    }

    console.log(`[MEETING_CANCELLED] Meeting ${meeting.id} cancelled. Reason: ${cancellationReason || 'N/A'}`)

    return res.json({
      success: true,
      message: 'Meeting cancelled successfully and slot released.'
    })
  } catch (error) {
    console.error('[ADMIN_CANCEL_ERROR]', error)
    return res.status(500).json({ success: false, message: 'Failed to cancel meeting.' })
  }
}

/**
 * POST /api/admin/meetings/:id/retry-email
 * Retries sending confirmation & admin notification email WITHOUT recreating Google Calendar event
 */
export const retryMeetingEmail = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id)
    if (!meeting) {
      return res.status(404).json({ success: false, message: 'Meeting not found.' })
    }

    console.log(`[ADMIN_RETRY_EMAIL] Initiating email retry for booking ${meeting.booking_id} (Calendar event ID preserved: ${meeting.calendar_event_id || 'N/A'})`)

    // IMPORTANT: If calendar event is already created, do NOT touch Google Calendar API!
    const emailResult = await sendMeetingConfirmationEmail(meeting)

    if (emailResult.success) {
      await Meeting.update(meeting.id, { email_status: 'sent' })

      // Also trigger admin notification in background
      try {
        await sendMeetingAdminNotificationEmail(meeting)
      } catch (adminErr) {
        console.warn('[ADMIN_RETRY_EMAIL_ADMIN_NOTIFY_WARN]', adminErr.message)
      }

      return res.json({
        success: true,
        message: `Confirmation email successfully delivered to ${meeting.email}.`,
        messageId: emailResult.messageId
      })
    } else {
      await Meeting.update(meeting.id, { email_status: 'failed' })

      return res.status(502).json({
        success: false,
        message: 'Email delivery failed.',
        error: emailResult.details || { message: emailResult.error }
      })
    }
  } catch (error) {
    console.error('[ADMIN_RETRY_EMAIL_ERROR]', error)
    return res.status(500).json({
      success: false,
      message: 'Unexpected error during email retry.',
      error: error.message
    })
  }
}

/**
 * GET /api/admin/meetings/diagnostics/smtp
 * Diagnostic endpoint to test SMTP connection and authentication safely
 */
export const getSMTPDiagnostics = async (req, res) => {
  try {
    const result = await verifySMTPConnection()
    return res.json(result)
  } catch (error) {
    console.error('[ADMIN_SMTP_DIAGNOSTICS_ERROR]', error)
    return res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

export default {
  getAllMeetings,
  getMeetingById,
  updateMeetingStatus,
  rescheduleMeeting,
  cancelMeeting,
  retryMeetingEmail,
  getSMTPDiagnostics
}

