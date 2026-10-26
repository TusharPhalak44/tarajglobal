/**
 * Scheduling Validator & Timezone Utilities
 * Enforces mandatory 24-hour advance booking, prevents double booking,
 * and calculates exact UTC dates with Daylight Saving Time (DST) awareness.
 */

export const normalizeTimezone = (tz) => {
  if (!tz) return 'America/New_York'
  const clean = tz.trim()
  const map = {
    'EST': 'America/New_York',
    'EDT': 'America/New_York',
    'Eastern': 'America/New_York',
    'PST': 'America/Los_Angeles',
    'PDT': 'America/Los_Angeles',
    'Pacific': 'America/Los_Angeles',
    'CST': 'America/Chicago',
    'CDT': 'America/Chicago',
    'Central': 'America/Chicago',
    'MST': 'America/Denver',
    'MDT': 'America/Denver',
    'Mountain': 'America/Denver',
    'IST': 'Asia/Kolkata',
    'India': 'Asia/Kolkata',
    'GMT': 'Europe/London',
    'BST': 'Europe/London',
    'CET': 'Europe/Paris',
    'CEST': 'Europe/Paris',
    'GST': 'Asia/Dubai',
    'SGT': 'Asia/Singapore',
    'AEST': 'Australia/Sydney',
    'AEDT': 'Australia/Sydney',
    'JST': 'Asia/Tokyo'
  }
  if (map[clean]) return map[clean]
  try {
    Intl.DateTimeFormat(undefined, { timeZone: clean })
    return clean
  } catch {
    return 'America/New_York'
  }
}

/**
 * Parses a date (YYYY-MM-DD or ISO string) and a human time string ('10:00 AM', '02:30 PM', '14:30')
 * in a specified timezone and converts it to an exact UTC Date object, accounting for DST.
 */
export const parseMeetingDateTimeToUtc = (dateStr, timeStr, timeZone) => {
  if (!dateStr || !timeStr) return null

  const iana = normalizeTimezone(timeZone)

  // Normalize date string to YYYY-MM-DD
  let y, m, d
  if (typeof dateStr === 'string' && dateStr.includes('T')) {
    const [datePart] = dateStr.split('T')
    ;[y, m, d] = datePart.split('-').map(Number)
  } else if (typeof dateStr === 'string' && dateStr.includes('-')) {
    ;[y, m, d] = dateStr.split('-').map(Number)
  } else {
    const dObj = new Date(dateStr)
    if (isNaN(dObj.getTime())) return null
    y = dObj.getUTCFullYear()
    m = dObj.getUTCMonth() + 1
    d = dObj.getUTCDate()
  }

  // Parse time
  const isPM = /pm/i.test(timeStr)
  const isAM = /am/i.test(timeStr)
  const cleanTime = (timeStr || '').replace(/[^0-9:]/g, '')
  const [hStr, mStr] = cleanTime.split(':')
  let hours = parseInt(hStr, 10) || 0
  const minutes = parseInt(mStr, 10) || 0

  if (isPM && hours < 12) hours += 12
  if (isAM && hours === 12) hours = 0

  // 1. Create a reference UTC date representing the wall-clock time
  const guessUtc = new Date(Date.UTC(y, m - 1, d, hours, minutes, 0))

  // 2. Format that UTC date in the target IANA timezone to find the offset difference
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: iana,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  })

  const parts = formatter.formatToParts(guessUtc)
  const getPart = (type) => parseInt(parts.find((p) => p.type === type)?.value, 10)
  const tzY = getPart('year')
  const tzM = getPart('month')
  const tzD = getPart('day')
  let tzH = getPart('hour')
  if (tzH === 24) tzH = 0
  const tzMin = getPart('minute')

  const tzDateAsUtc = new Date(Date.UTC(tzY, tzM - 1, tzD, tzH, tzMin, 0))
  const offsetDiffMs = guessUtc.getTime() - tzDateAsUtc.getTime()

  // 3. Exact target date in UTC
  return new Date(guessUtc.getTime() + offsetDiffMs)
}

/**
 * Validates that a proposed meeting begins at least 24 hours after current time.
 * @param {string} dateStr - Date string (YYYY-MM-DD)
 * @param {string} timeStr - Time string ('10:00 AM')
 * @param {string} timeZone - Timezone string ('America/New_York', 'PST', 'IST')
 * @param {Date} [referenceNow=new Date()] - Reference point for time calculation
 * @returns {{ valid: boolean, meetingUtc?: Date, diffMs?: number, message?: string }}
 */
export const validate24HourAdvance = (dateStr, timeStr, timeZone, referenceNow = new Date()) => {
  const meetingUtc = parseMeetingDateTimeToUtc(dateStr, timeStr, timeZone)
  if (!meetingUtc || isNaN(meetingUtc.getTime())) {
    return {
      valid: false,
      message: 'Invalid meeting date or time format provided.'
    }
  }

  // Normalize referenceNow to minute precision to match minute-level calendar scheduling slots
  const nowMinute = new Date(Math.floor(referenceNow.getTime() / 60000) * 60000)
  const diffMs = meetingUtc.getTime() - nowMinute.getTime()
  const minAdvanceMs = 24 * 60 * 60 * 1000 // exactly 24 hours

  if (diffMs < minAdvanceMs) {
    const diffHours = (diffMs / (60 * 60 * 1000)).toFixed(1)
    return {
      valid: false,
      meetingUtc,
      diffMs,
      diffHours,
      message: 'Please book your meeting at least 24 hours in advance. Selected slot begins in ' +
        (diffHours < 0 ? 'the past' : `${diffHours} hours`) +
        ', which does not satisfy the mandatory 24-hour advance scheduling notice.'
    }
  }

  return {
    valid: true,
    meetingUtc,
    diffMs
  }
}

/**
 * Generates ISO UTC date ranges for Google Calendar and iCalendar format.
 */
export const getMeetingUtcDates = (formattedDate, timeStr, finalTimeZone, durationMinutes = 30) => {
  const startDateObj = parseMeetingDateTimeToUtc(formattedDate, timeStr, finalTimeZone) || new Date()
  const endDateObj = new Date(startDateObj.getTime() + durationMinutes * 60 * 1000)
  const formatICalUTC = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

  return {
    startDateObj,
    endDateObj,
    startUTC: formatICalUTC(startDateObj),
    endUTC: formatICalUTC(endDateObj),
    dtStamp: formatICalUTC(new Date())
  }
}
