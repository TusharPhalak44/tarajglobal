/**
 * Booking & Availability Configuration
 * Centralized business hours and slot definitions.
 */

export const BOOKING_CONFIG = {
  // Default timezone
  timezone: process.env.MEETING_TIMEZONE || 'Asia/Kolkata',

  // Meeting duration in minutes
  durationMinutes: parseInt(process.env.MEETING_DURATION_MINUTES, 10) || 30,

  // Business operating days: 0 = Sun, 1 = Mon, ..., 6 = Sat
  workingDays: [1, 2, 3, 4, 5], // Monday - Friday

  // Daily business hours intervals (24-hour format: HH:mm)
  workingHours: [
    { start: '10:00', end: '13:00' }, // 10:00 AM - 1:00 PM
    { start: '14:00', end: '18:00' }  // 02:00 PM - 6:00 PM
  ],

  // Minimum advance notice in minutes before a slot can be booked today
  minAdvanceNoticeMinutes: 60,

  // Max advance booking window in days
  maxAdvanceDays: 60,

  // Blocked dates (YYYY-MM-DD format) e.g. national holidays
  blockedDates: [
    // '2026-10-02', '2026-12-25'
  ]
}

/**
 * Helper to convert 24h 'HH:mm' to 12h display 'h:mm A'
 */
export const formatTime12h = (time24) => {
  const [hStr, mStr] = time24.split(':')
  let h = parseInt(hStr, 10)
  const m = mStr || '00'
  const ampm = h >= 12 ? 'PM' : 'AM'
  h = h % 12
  h = h ? h : 12 // 0 should be 12
  return `${h}:${m} ${ampm}`
}

/**
 * Helper to normalize any time string (e.g. '10:00 AM', '10:00', '02:30 PM') to 24h 'HH:mm'
 */
export const normalizeTimeTo24h = (timeStr) => {
  if (!timeStr) return ''
  const trimmed = timeStr.trim().toUpperCase()
  const match = trimmed.match(/^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?$/i)
  if (!match) return trimmed

  let hours = parseInt(match[1], 10)
  const minutes = match[2]
  const modifier = match[3]

  if (modifier) {
    if (modifier === 'PM' && hours < 12) hours += 12
    if (modifier === 'AM' && hours === 12) hours = 0
  }

  return `${String(hours).padStart(2, '0')}:${minutes}`
}

/**
 * Generate all possible slots for a given date based on configured working hours
 */
export const generateStandardSlotsForDate = (dateObj) => {
  const dayOfWeek = dateObj.getDay()
  if (!BOOKING_CONFIG.workingDays.includes(dayOfWeek)) {
    return []
  }

  const dateStr = dateObj.toISOString().split('T')[0]
  if (BOOKING_CONFIG.blockedDates.includes(dateStr)) {
    return []
  }

  const slots = []
  const duration = BOOKING_CONFIG.durationMinutes

  for (const interval of BOOKING_CONFIG.workingHours) {
    const [startH, startM] = interval.start.split(':').map(Number)
    const [endH, endM] = interval.end.split(':').map(Number)

    let currentMinutes = startH * 60 + startM
    const endMinutes = endH * 60 + endM

    while (currentMinutes + duration <= endMinutes) {
      const h = Math.floor(currentMinutes / 60)
      const m = currentMinutes % 60
      const time24 = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`

      const endHCalc = Math.floor((currentMinutes + duration) / 60)
      const endMCalc = (currentMinutes + duration) % 60
      const endTime24 = `${String(endHCalc).padStart(2, '0')}:${String(endMCalc).padStart(2, '0')}`

      slots.push({
        time24,
        time12: formatTime12h(time24),
        endTime24,
        endTime12: formatTime12h(endTime24)
      })

      currentMinutes += duration
    }
  }

  return slots
}

/**
 * Construct ISO start and end strings with timezone offset for Google Calendar
 */
export const buildDateTimeISO = (dateStr, timeStr, durationMinutes = BOOKING_CONFIG.durationMinutes) => {
  const time24 = normalizeTimeTo24h(timeStr)
  const [h, m] = time24.split(':').map(Number)

  // Construct local date time in target timezone (default Asia/Kolkata +05:30)
  // Format: YYYY-MM-DDTHH:mm:ss+05:30
  const startHoursStr = String(h).padStart(2, '0')
  const startMinsStr = String(m).padStart(2, '0')

  const totalEndMins = h * 60 + m + durationMinutes
  const endHours = Math.floor(totalEndMins / 60)
  const endMins = totalEndMins % 60
  const endHoursStr = String(endHours).padStart(2, '0')
  const endMinsStr = String(endMins).padStart(2, '0')

  // Asia/Kolkata offset is +05:30
  const offset = '+05:30'

  return {
    startDateTime: `${dateStr}T${startHoursStr}:${startMinsStr}:00${offset}`,
    endDateTime: `${dateStr}T${endHoursStr}:${endMinsStr}:00${offset}`,
    startTime12: formatTime12h(time24),
    endTime12: formatTime12h(`${endHoursStr}:${endMinsStr}`)
  }
}
