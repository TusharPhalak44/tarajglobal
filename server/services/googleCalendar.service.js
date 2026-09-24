/**
 * Google Calendar & Google Meet Integration Service
 * Uses official googleapis client.
 */

import { google } from 'googleapis'
import { v4 as uuidv4 } from 'uuid'
import { BOOKING_CONFIG, buildDateTimeISO } from '../config/booking.config.js'

/**
 * Initialize Google Calendar OAuth2 client
 */
const getOAuth2Client = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || 'https://developers.google.com/oauthplayground'
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN

  if (!clientId || !clientSecret || !refreshToken) {
    console.warn('⚠️ Google Calendar credentials (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN) not fully configured in .env')
    return null
  }

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri)
  oauth2Client.setCredentials({ refresh_token: refreshToken })
  return oauth2Client
}

/**
 * Get Google Calendar instance
 */
const getCalendarClient = () => {
  const auth = getOAuth2Client()
  if (!auth) return null
  return google.calendar({ version: 'v3', auth })
}

/**
 * Format event description
 */
const buildEventDescription = (meeting) => {
  const customerName = meeting.fullName || meeting.full_name || meeting.name || 'Valued Client'
  const phone = meeting.phone || 'Not provided'
  const interest = meeting.interest || 'B2B Growth / Demand Generation'
  const message = meeting.message || 'No additional notes provided'
  const bookingId = meeting.bookingId || meeting.booking_id || 'N/A'

  return [
    'Taraj Global Solutions — Strategy Call',
    '',
    'Customer Details:',
    `Name: ${customerName}`,
    `Email: ${meeting.email}`,
    `Phone: ${phone}`,
    `Company: ${meeting.company || 'Not provided'}`,
    '',
    'Area of Interest:',
    interest,
    '',
    'Message / Requirements:',
    message,
    '',
    `Booking ID: ${bookingId}`,
    '',
    'Website: https://tarajglobal.com',
    'Contact: info@tarajglobal.com | +91 96655-99442'
  ].join('\n')
}

/**
 * Create a real Google Calendar Event with Google Meet conference data and invite visitor
 * @param {Object} meeting
 * @returns {Promise<{ calendar_event_id: string, calendar_event_link: string, meeting_link: string }>}
 */
export const createStrategyCallCalendarEvent = async (meeting) => {
  // Check if calendar event already exists (Idempotency)
  if (meeting.calendar_event_id || meeting.calendarEventId) {
    console.log(`[CALENDAR] Event already exists (${meeting.calendar_event_id || meeting.calendarEventId}), skipping duplicate creation`)
    return {
      calendar_event_id: meeting.calendar_event_id || meeting.calendarEventId,
      calendar_event_link: meeting.calendar_event_link || meeting.calendarEventLink || '',
      meeting_link: meeting.meeting_link || meeting.meetingLink || ''
    }
  }

  const calendar = getCalendarClient()
  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary'
  const timezone = meeting.timeZone || meeting.time_zone || BOOKING_CONFIG.timezone

  // Build proper ISO dates
  const dateStr = typeof meeting.meeting_date === 'string'
    ? meeting.meeting_date.split('T')[0]
    : meeting.meeting_date
      ? new Date(meeting.meeting_date).toISOString().split('T')[0]
      : meeting.date.split('T')[0]

  const timeStr = meeting.start_time || meeting.meeting_time || meeting.time
  const { startDateTime, endDateTime } = buildDateTimeISO(dateStr, timeStr, BOOKING_CONFIG.durationMinutes)

  const customerName = meeting.fullName || meeting.full_name || meeting.name || 'Client'
  const summary = `Strategy Call — ${customerName}`
  const description = buildEventDescription(meeting)

  // If credentials are not configured, handle graceful fallback simulation in development
  if (!calendar) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[CALENDAR_DEV_FALLBACK] Google credentials missing. Generating simulated meeting details for local testing.')
      const mockEventId = `sim_evt_${uuidv4().substring(0, 12)}`
      const mockMeetCode = `${uuidv4().substring(0, 3)}-${uuidv4().substring(0, 4)}-${uuidv4().substring(0, 3)}`
      return {
        calendar_event_id: mockEventId,
        calendar_event_link: `https://calendar.google.com/calendar/r/eventedit/${mockEventId}`,
        meeting_link: `https://meet.google.com/${mockMeetCode}`,
        isSimulated: true
      }
    }
    throw new Error('Google Calendar credentials are not configured on the server.')
  }

  try {
    const eventPayload = {
      summary,
      description,
      start: {
        dateTime: startDateTime,
        timeZone: timezone
      },
      end: {
        dateTime: endDateTime,
        timeZone: timezone
      },
      attendees: [
        {
          email: meeting.email,
          displayName: customerName,
          responseStatus: 'needsAction'
        }
      ],
      conferenceData: {
        createRequest: {
          requestId: uuidv4(),
          conferenceSolutionKey: {
            type: 'hangoutsMeet'
          }
        }
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 30 }
        ]
      }
    }

    console.log(`[CALENDAR_EVENT_CREATING] Inserting calendar event for ${meeting.email} on ${dateStr} ${timeStr}`)

    const response = await calendar.events.insert({
      calendarId,
      requestBody: eventPayload,
      conferenceDataVersion: 1,
      sendUpdates: 'all' // Real email invite to attendee
    })

    const event = response.data
    const calendarEventId = event.id
    const calendarEventLink = event.htmlLink

    // Extract Google Meet link
    let meetingLink = ''
    if (event.conferenceData?.entryPoints) {
      const videoEntry = event.conferenceData.entryPoints.find(e => e.entryPointType === 'video')
      if (videoEntry?.uri) {
        meetingLink = videoEntry.uri
      }
    }
    if (!meetingLink && event.hangoutLink) {
      meetingLink = event.hangoutLink
    }

    console.log(`[CALENDAR_EVENT_CREATED] Successfully created event ID: ${calendarEventId}, Meet: ${meetingLink}`)

    return {
      calendar_event_id: calendarEventId,
      calendar_event_link: calendarEventLink,
      meeting_link: meetingLink
    }
  } catch (error) {
    console.error('[CALENDAR_EVENT_FAILED] Error creating Google Calendar event:', error.message)
    throw error
  }
}

/**
 * Reschedule an existing Google Calendar event
 * @param {string} calendarEventId
 * @param {Object} updatedMeeting
 */
export const updateStrategyCallCalendarEvent = async (calendarEventId, updatedMeeting) => {
  if (!calendarEventId) return null

  const calendar = getCalendarClient()
  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary'
  const timezone = updatedMeeting.timeZone || updatedMeeting.time_zone || BOOKING_CONFIG.timezone

  const dateStr = typeof updatedMeeting.meeting_date === 'string'
    ? updatedMeeting.meeting_date.split('T')[0]
    : updatedMeeting.meeting_date
      ? new Date(updatedMeeting.meeting_date).toISOString().split('T')[0]
      : updatedMeeting.date.split('T')[0]

  const timeStr = updatedMeeting.start_time || updatedMeeting.meeting_time || updatedMeeting.time
  const { startDateTime, endDateTime } = buildDateTimeISO(dateStr, timeStr, BOOKING_CONFIG.durationMinutes)

  if (!calendar) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[CALENDAR_DEV_FALLBACK] Simulating reschedule for event ${calendarEventId}`)
      return { success: true }
    }
    throw new Error('Google Calendar credentials are not configured.')
  }

  try {
    const patchPayload = {
      start: { dateTime: startDateTime, timeZone: timezone },
      end: { dateTime: endDateTime, timeZone: timezone },
      description: buildEventDescription(updatedMeeting)
    }

    const response = await calendar.events.patch({
      calendarId,
      eventId: calendarEventId,
      requestBody: patchPayload,
      sendUpdates: 'all'
    })

    console.log(`[MEETING_RESCHEDULED] Google Calendar event updated: ${calendarEventId}`)
    return response.data
  } catch (error) {
    console.error('[CALENDAR_UPDATE_FAILED] Error updating Google Calendar event:', error.message)
    throw error
  }
}

/**
 * Cancel an existing Google Calendar event
 * @param {string} calendarEventId
 */
export const cancelStrategyCallCalendarEvent = async (calendarEventId) => {
  if (!calendarEventId) return null

  const calendar = getCalendarClient()
  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary'

  if (!calendar) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[CALENDAR_DEV_FALLBACK] Simulating cancellation for event ${calendarEventId}`)
      return { success: true }
    }
    return null
  }

  try {
    await calendar.events.delete({
      calendarId,
      eventId: calendarEventId,
      sendUpdates: 'all'
    })
    console.log(`[MEETING_CANCELLED] Google Calendar event deleted: ${calendarEventId}`)
    return { success: true }
  } catch (error) {
    console.error('[CALENDAR_DELETE_FAILED] Error cancelling Google Calendar event:', error.message)
    // Don't throw if event was already deleted on calendar
    return { success: false, error: error.message }
  }
}

export default {
  createStrategyCallCalendarEvent,
  updateStrategyCallCalendarEvent,
  cancelStrategyCallCalendarEvent
}
