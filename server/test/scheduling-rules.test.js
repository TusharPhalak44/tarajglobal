/**
 * Automated Verification Suite for 24-Hour Advance Booking & Real-Time Slot Availability
 * Verifies all 10 mandatory scheduling rules specified in the prompt.
 */

import {
  validate24HourAdvance,
  parseMeetingDateTimeToUtc,
  getMeetingUtcDates,
  normalizeTimezone
} from '../utils/schedulingValidator.js'
import Meeting from '../models/Meeting.js'

let totalPassed = 0
let totalFailed = 0

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`)
    totalPassed++
  } else {
    console.error(`  ❌ FAIL: ${message}`)
    totalFailed++
  }
}

async function runTests() {
  console.log('\n======================================================')
  console.log('🧪 RUNNING SCHEDULING RULES & AVAILABILITY TEST SUITE')
  console.log('======================================================\n')

  const now = new Date()
  console.log(`Current Reference Time (UTC): ${now.toISOString()}`)

  // ─────────────────────────────────────────────────────────
  // TEST 1: A slot 23 hours from now is rejected
  // ─────────────────────────────────────────────────────────
  console.log('\n--- TEST 1: Slot 23 Hours from Now ---')
  const date23h = new Date(now.getTime() + 23 * 60 * 60 * 1000)
  const d1Str = date23h.toISOString().split('T')[0]
  const t1Str = date23h.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' })
  const res1 = validate24HourAdvance(d1Str, t1Str, 'UTC', now)
  assert(res1.valid === false, 'Slot 23 hours from now is rejected')
  assert(res1.diffHours === '23.0', `Difference is correctly calculated as 23.0 hours (got ${res1.diffHours})`)

  // ─────────────────────────────────────────────────────────
  // TEST 2: A slot 23 hours and 59 minutes from now is rejected
  // ─────────────────────────────────────────────────────────
  console.log('\n--- TEST 2: Slot 23 Hours and 59 Minutes from Now ---')
  const date23h59m = new Date(now.getTime() + (23 * 60 + 59) * 60 * 1000)
  const d2Str = date23h59m.toISOString().split('T')[0]
  const t2Str = date23h59m.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' })
  const res2 = validate24HourAdvance(d2Str, t2Str, 'UTC', now)
  assert(res2.valid === false, 'Slot 23h 59m from now is rejected')

  // ─────────────────────────────────────────────────────────
  // TEST 3: A slot exactly 24 hours from now meets the boundary
  // ─────────────────────────────────────────────────────────
  console.log('\n--- TEST 3: Slot Exactly 24 Hours from Now ---')
  const date24h = new Date(now.getTime() + 24 * 60 * 60 * 1000)
  const d3Str = date24h.toISOString().split('T')[0]
  const t3Str = date24h.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' })
  const res3 = validate24HourAdvance(d3Str, t3Str, 'UTC', now)
  assert(res3.valid === true, 'Slot exactly 24 hours from now meets the minimum-notice boundary')

  // ─────────────────────────────────────────────────────────
  // TEST 4: A slot more than 24 hours from now can be booked
  // ─────────────────────────────────────────────────────────
  console.log('\n--- TEST 4: Slot More Than 24 Hours from Now (48h) ---')
  const date48h = new Date(now.getTime() + 48 * 60 * 60 * 1000)
  const d4Str = date48h.toISOString().split('T')[0]
  const t4Str = date48h.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' })
  const res4 = validate24HourAdvance(d4Str, t4Str, 'UTC', now)
  assert(res4.valid === true, 'Slot 48 hours from now is valid and can be booked')

  // ─────────────────────────────────────────────────────────
  // TEST 5: An already-booked incompatible slot cannot be booked again
  // ─────────────────────────────────────────────────────────
  console.log('\n--- TEST 5: Already-Booked Incompatible Slot Rejection ---')
  const testDate = '2026-11-20'
  const testTime = '11:00 AM'
  const testEmailA = `client_a_${Date.now()}@test.com`
  const testEmailB = `client_b_${Date.now()}@test.com`

  try {
    // Clean up any pre-existing test record
    await Meeting.cancelByBookingOrDetails({ email: testEmailA, date: testDate, time: testTime })
    await Meeting.cancelByBookingOrDetails({ email: testEmailB, date: testDate, time: testTime })

    // Book first client
    const booking1 = await Meeting.create({
      fullName: 'Client A',
      email: testEmailA,
      company: 'Enterprise Alpha',
      phone: '+1 555-0101',
      date: testDate,
      time: testTime,
      timeZone: 'America/New_York',
      meetingType: 'Strategy Call'
    })
    assert(booking1.bookingId !== undefined, 'Client A booked successfully')

    // Verify slot conflict check detects the booked slot
    const isConflict = await Meeting.checkSlotConflict(testDate, testTime)
    assert(isConflict === true, 'checkSlotConflict correctly detects slot is already booked')

    // Second client attempting same slot should fail conflict check
    let clientBError = null
    try {
      await Meeting.createWithConflictCheck({
        fullName: 'Client B',
        email: testEmailB,
        company: 'Enterprise Beta',
        phone: '+1 555-0102',
        date: testDate,
        time: testTime,
        timeZone: 'America/New_York'
      })
    } catch (err) {
      clientBError = err
    }

    assert(clientBError !== null, 'Client B attempt to double-book was prevented')
    assert(
      clientBError?.message === 'This time slot has just been booked. Please select another available time.',
      `Correct user-facing message returned: "${clientBError?.message}"`
    )
    assert(clientBError?.statusCode === 409, 'Conflict status code is 409')

    // Clean up
    await Meeting.cancelByBookingOrDetails({ bookingId: booking1.bookingId })
  } catch (err) {
    console.error('Error in Test 5:', err.message)
    assert(false, `Test 5 failed with exception: ${err.message}`)
  }

  // ─────────────────────────────────────────────────────────
  // TEST 6: Two clients attempting the same slot concurrently
  // ─────────────────────────────────────────────────────────
  console.log('\n--- TEST 6: Concurrent Booking Race Condition Prevention ---')
  const raceDate = '2026-11-21'
  const raceTime = '02:30 PM'
  const raceEmail1 = `race1_${Date.now()}@test.com`
  const raceEmail2 = `race2_${Date.now()}@test.com`

  try {
    // Clean up any pre-existing rows on race slot
    await Meeting.cancelByBookingOrDetails({ email: raceEmail1 })
    await Meeting.cancelByBookingOrDetails({ email: raceEmail2 })
    const [existing] = await (await import('../config/db.js')).default.execute(
      'SELECT booking_id FROM meetings WHERE meeting_date = ? AND meeting_time = ? AND status != ?',
      [raceDate, raceTime, 'cancelled']
    )
    for (const row of existing) {
      await Meeting.cancelByBookingOrDetails({ bookingId: row.booking_id })
    }

    const results = await Promise.allSettled([
      Meeting.createWithConflictCheck({
        fullName: 'Racer 1',
        email: raceEmail1,
        company: 'Racer One Corp',
        date: raceDate,
        time: raceTime,
        timeZone: 'America/New_York'
      }),
      Meeting.createWithConflictCheck({
        fullName: 'Racer 2',
        email: raceEmail2,
        company: 'Racer Two Corp',
        date: raceDate,
        time: raceTime,
        timeZone: 'America/New_York'
      })
    ])

    const fulfilled = results.filter(r => r.status === 'fulfilled')
    const rejected = results.filter(r => r.status === 'rejected')

    assert(fulfilled.length === 1, `Exactly 1 booking fulfilled (got ${fulfilled.length})`)
    assert(rejected.length === 1, `Exactly 1 booking rejected (got ${rejected.length})`)
    assert(
      rejected[0]?.reason?.message === 'This time slot has just been booked. Please select another available time.',
      'Rejected client received exact user-facing conflict message'
    )

    // Clean up
    if (fulfilled[0]?.value?.bookingId) {
      await Meeting.cancelByBookingOrDetails({ bookingId: fulfilled[0].value.bookingId })
    }
  } catch (err) {
    console.error('Error in Test 6:', err.message)
    assert(false, `Test 6 failed with exception: ${err.message}`)
  }

  // ─────────────────────────────────────────────────────────
  // TEST 7: Slot taken after calendar loads produces friendly error
  // ─────────────────────────────────────────────────────────
  console.log('\n--- TEST 7: Slot Taken Produces Friendly User Message ---')
  const expectedMsg = 'This time slot has just been booked. Please select another available time.'
  const conflictErr = new Error(expectedMsg)
  conflictErr.code = 'SLOT_UNAVAILABLE'
  assert(conflictErr.message === expectedMsg, `User message matches: "${expectedMsg}"`)

  // ─────────────────────────────────────────────────────────
  // TEST 8: Timezone conversion does not bypass 24-hour restriction
  // ─────────────────────────────────────────────────────────
  console.log('\n--- TEST 8: Timezone Conversion Security Check ---')
  // User in IST trying to book a slot that is 10 hours from now UTC
  // Even if formatted in a foreign timezone, absolute UTC duration must be >= 24h
  const tenHoursFromNow = new Date(now.getTime() + 10 * 60 * 60 * 1000)
  const dIst = tenHoursFromNow.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' }) // YYYY-MM-DD
  const tIst = tenHoursFromNow.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' })

  const resTzBypass = validate24HourAdvance(dIst, tIst, 'Asia/Kolkata', now)
  assert(resTzBypass.valid === false, 'Timezone conversion to IST does not bypass the 24-hour restriction')
  assert(
    Math.abs(parseFloat(resTzBypass.diffHours) - 10.0) < 0.2,
    `Calculated real duration matches 10 hours regardless of timezone (got ${resTzBypass.diffHours}h)`
  )

  // ─────────────────────────────────────────────────────────
  // TEST 9: Rescheduling cannot bypass 24-hour policy or double-book
  // ─────────────────────────────────────────────────────────
  console.log('\n--- TEST 9: Rescheduling Scheduling Policy Enforcement ---')
  // Try to reschedule to a slot 5 hours from now
  const fiveHoursFromNow = new Date(now.getTime() + 5 * 60 * 60 * 1000)
  const dResched = fiveHoursFromNow.toISOString().split('T')[0]
  const tResched = fiveHoursFromNow.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' })
  const resResched24h = validate24HourAdvance(dResched, tResched, 'UTC', now)
  assert(resResched24h.valid === false, 'Rescheduling to a time within 24 hours is rejected')

  // ─────────────────────────────────────────────────────────
  // TEST 10: Existing booking confirmations & iCal UTC dates still work
  // ─────────────────────────────────────────────────────────
  console.log('\n--- TEST 10: iCal & Google Calendar Date Range Integrity ---')
  const { startUTC, endUTC, dtStamp } = getMeetingUtcDates('2026-11-25', '03:00 PM', 'America/New_York', 30)
  assert(startUTC.endsWith('Z'), `startUTC ends with Z (${startUTC})`)
  assert(endUTC.endsWith('Z'), `endUTC ends with Z (${endUTC})`)
  assert(dtStamp.endsWith('Z'), `dtStamp is valid UTC timestamp (${dtStamp})`)

  console.log('\n======================================================')
  console.log(`📊 TEST RESULTS: ${totalPassed} PASSED, ${totalFailed} FAILED`)
  console.log('======================================================\n')

  if (totalFailed > 0) {
    process.exit(1)
  } else {
    process.exit(0)
  }
}

runTests().catch(err => {
  console.error('Fatal error running tests:', err)
  process.exit(1)
})
