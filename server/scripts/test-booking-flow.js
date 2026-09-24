/**
 * Comprehensive Test Suite for Strategy Call Meeting Booking Flow
 */

import app from '../app.js'
import db from '../config/db.js'

const runTests = async () => {
  console.log('🧪 Starting End-to-End Meeting Booking Test Suite...\n')

  const PORT = 5098
  const server = app.listen(PORT)
  const baseUrl = `http://localhost:${PORT}/api`

  let testMeetingId = null
  let testBookingId = null
  const testDate = '2026-10-15'
  const testTime = '11:00 AM'

  try {
    // -------------------------------------------------------------
    // Test 1: Availability Check (Before Booking)
    // -------------------------------------------------------------
    console.log('--- Test 1: GET /api/meetings/availability ---')
    const availRes1 = await fetch(`${baseUrl}/meetings/availability?date=${testDate}`)
    const availData1 = await availRes1.json()
    console.log('Status:', availRes1.status)
    console.log('Success:', availData1.success)
    const slot11amBefore = availData1.slots?.find(s => s.time === testTime)
    console.log(`Slot ${testTime} available before booking:`, slot11amBefore?.available)

    if (!availData1.success || !slot11amBefore?.available) {
      throw new Error(`Slot ${testTime} should be available before booking`)
    }
    console.log('✅ Test 1 Passed\n')

    // -------------------------------------------------------------
    // Test 2: Validation Tests (Invalid Email, Past Date, Missing Fields)
    // -------------------------------------------------------------
    console.log('--- Test 2: Input Validation Rejections ---')

    // 2a: Invalid email
    const invalidEmailRes = await fetch(`${baseUrl}/meetings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Test User',
        email: 'not-an-email',
        company: 'Acme Inc',
        date: testDate,
        time: testTime
      })
    })
    console.log('Invalid email status:', invalidEmailRes.status, '(expected 400)')
    if (invalidEmailRes.status !== 400) throw new Error('Expected 400 for invalid email')

    // 2b: Past date
    const pastDateRes = await fetch(`${baseUrl}/meetings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Test User',
        email: 'test@example.com',
        company: 'Acme Inc',
        date: '2020-01-01',
        time: testTime
      })
    })
    console.log('Past date status:', pastDateRes.status, '(expected 400)')
    if (pastDateRes.status !== 400) throw new Error('Expected 400 for past date')

    // 2c: Missing required field (company)
    const missingFieldRes = await fetch(`${baseUrl}/meetings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Test User',
        email: 'test@example.com',
        date: testDate,
        time: testTime
      })
    })
    console.log('Missing company status:', missingFieldRes.status, '(expected 400)')
    if (missingFieldRes.status !== 400) throw new Error('Expected 400 for missing company')

    console.log('✅ Test 2 Passed\n')

    // -------------------------------------------------------------
    // Test 3: Valid Strategy Call Booking
    // -------------------------------------------------------------
    console.log('--- Test 3: Valid Booking (POST /api/meetings) ---')
    const bookingPayload = {
      fullName: 'Vikram Mehta',
      email: 'vikram.mehta@acmecorp.com',
      company: 'Acme Technologies',
      phone: '+91 98765 43210',
      interest: 'B2B Lead Generation',
      message: 'Looking to build outbound pipeline for enterprise SaaS.',
      date: testDate,
      time: testTime,
      timeZone: 'Asia/Kolkata'
    }

    const bookRes = await fetch(`${baseUrl}/meetings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingPayload)
    })
    const bookData = await bookRes.json()
    console.log('Booking Status:', bookRes.status)
    console.log('Booking Result:', {
      success: bookData.success,
      bookingId: bookData.data?.bookingId,
      status: bookData.data?.status,
      meetingLink: bookData.data?.meetingLink,
      calendarLink: bookData.data?.calendarLink
    })

    if (!bookData.success || bookRes.status !== 201) {
      throw new Error(`Booking failed: ${JSON.stringify(bookData)}`)
    }

    testMeetingId = bookData.data.id
    testBookingId = bookData.data.bookingId
    console.log('✅ Test 3 Passed\n')

    // -------------------------------------------------------------
    // Test 4: Double Booking Prevention (HTTP 409 Conflict)
    // -------------------------------------------------------------
    console.log('--- Test 4: Double Booking Prevention (HTTP 409) ---')
    const doubleBookRes = await fetch(`${baseUrl}/meetings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Another Visitor',
        email: 'another@visitor.com',
        company: 'Other Corp',
        phone: '+91 99999 88888',
        interest: 'Account-Based Marketing (ABM)',
        date: testDate,
        time: testTime,
        timeZone: 'Asia/Kolkata'
      })
    })
    const doubleBookData = await doubleBookRes.json()
    console.log('Double booking status:', doubleBookRes.status, '(expected 409)')
    console.log('Double booking message:', doubleBookData.message)

    if (doubleBookRes.status !== 409) {
      throw new Error(`Expected HTTP 409 Conflict for double booking, got ${doubleBookRes.status}`)
    }
    console.log('✅ Test 4 Passed (Double booking successfully blocked with 409)\n')

    // -------------------------------------------------------------
    // Test 5: Verify Slot is Now Marked Unavailable in Availability API
    // -------------------------------------------------------------
    console.log('--- Test 5: Verify Slot Now Unavailable in GET /api/meetings/availability ---')
    const availRes2 = await fetch(`${baseUrl}/meetings/availability?date=${testDate}`)
    const availData2 = await availRes2.json()
    const slot11amAfter = availData2.slots?.find(s => s.time === testTime)
    console.log(`Slot ${testTime} available after booking:`, slot11amAfter?.available, '(expected false)')

    if (slot11amAfter?.available !== false) {
      throw new Error(`Slot ${testTime} should now be marked unavailable!`)
    }
    console.log('✅ Test 5 Passed\n')

    // -------------------------------------------------------------
    // Test 6: Verify Database Record Fields
    // -------------------------------------------------------------
    console.log('--- Test 6: Verify Database Record Completeness ---')
    const [dbRows] = await db.query('SELECT * FROM meetings WHERE id = ?', [testMeetingId])
    const dbMeeting = dbRows[0]
    console.log('Database Meeting Record:', {
      id: dbMeeting.id,
      booking_id: dbMeeting.booking_id,
      full_name: dbMeeting.full_name,
      email: dbMeeting.email,
      company: dbMeeting.company,
      interest: dbMeeting.interest,
      status: dbMeeting.status,
      meeting_date: dbMeeting.meeting_date,
      meeting_time: dbMeeting.meeting_time,
      calendar_sync_status: dbMeeting.calendar_sync_status,
      email_status: dbMeeting.email_status,
      meeting_link: dbMeeting.meeting_link
    })

    if (!dbMeeting || dbMeeting.status !== 'confirmed') {
      throw new Error('Database meeting status should be confirmed')
    }
    console.log('✅ Test 6 Passed\n')

    // -------------------------------------------------------------
    // Test 7: Public Booking Details Retrieval (GET /api/meetings/booking/:bookingId)
    // -------------------------------------------------------------
    console.log('--- Test 7: GET /api/meetings/booking/:bookingId ---')
    const getBookingRes = await fetch(`${baseUrl}/meetings/booking/${testBookingId}`)
    const getBookingData = await getBookingRes.json()
    console.log('Public retrieval success:', getBookingData.success)
    console.log('Customer name retrieved:', getBookingData.data?.fullName)
    if (!getBookingData.success || getBookingData.data?.bookingId !== testBookingId) {
      throw new Error('Public booking lookup failed')
    }
    console.log('✅ Test 7 Passed\n')

    // -------------------------------------------------------------
    // Test 8: Admin Reschedule Flow (Direct model test or endpoint)
    // -------------------------------------------------------------
    console.log('--- Test 8: Reschedule Meeting ---')
    const newTime = '2:00 PM'
    const { default: MeetingModel } = await import('../models/Meeting.js')
    await MeetingModel.reschedule(testMeetingId, {
      date: testDate,
      time: newTime,
      timeZone: 'Asia/Kolkata'
    })

    const [rescheduledRows] = await db.query('SELECT meeting_time, status FROM meetings WHERE id = ?', [testMeetingId])
    console.log('Updated time in DB:', rescheduledRows[0]?.meeting_time, '(expected 2:00 PM)')
    if (rescheduledRows[0]?.meeting_time !== '2:00 PM') {
      throw new Error('Reschedule did not update meeting_time')
    }

    // Now 11:00 AM should be free again!
    const availRes3 = await fetch(`${baseUrl}/meetings/availability?date=${testDate}`)
    const availData3 = await availRes3.json()
    const slot11amReleased = availData3.slots?.find(s => s.time === testTime)
    console.log(`Slot ${testTime} released after reschedule:`, slot11amReleased?.available, '(expected true)')
    if (!slot11amReleased?.available) {
      throw new Error('Original slot should be freed after reschedule')
    }
    console.log('✅ Test 8 Passed\n')

    // -------------------------------------------------------------
    // Test 9: Cancellation Flow (Releases Slot, Keeps Record)
    // -------------------------------------------------------------
    console.log('--- Test 9: Cancel Meeting (Slot Freed, Audit Kept) ---')
    await MeetingModel.cancel(testMeetingId, 'Customer requested schedule adjustment')
    const [cancelledRows] = await db.query('SELECT status, cancellation_reason FROM meetings WHERE id = ?', [testMeetingId])
    console.log('Status after cancellation:', cancelledRows[0]?.status, '(expected cancelled)')
    console.log('Reason:', cancelledRows[0]?.cancellation_reason)

    if (cancelledRows[0]?.status !== 'cancelled') {
      throw new Error('Status should be cancelled')
    }

    // 2:00 PM should now be free again!
    const availRes4 = await fetch(`${baseUrl}/meetings/availability?date=${testDate}`)
    const availData4 = await availRes4.json()
    const slot2pmReleased = availData4.slots?.find(s => s.time === newTime)
    console.log(`Slot ${newTime} available after cancellation:`, slot2pmReleased?.available, '(expected true)')
    if (!slot2pmReleased?.available) {
      throw new Error('Rescheduled slot should be freed after cancellation')
    }
    console.log('✅ Test 9 Passed\n')

    console.log('========================================================')
    console.log('🎉 ALL 9 TEST CASES PASSED SUCCESSFULLY!')
    console.log('========================================================')
  } catch (err) {
    console.error('❌ TEST FAILED:', err)
    process.exit(1)
  } finally {
    // Clean up test record
    if (testMeetingId) {
      await db.query('DELETE FROM meetings WHERE id = ?', [testMeetingId])
      console.log(`🧹 Cleaned up test record (ID: ${testMeetingId})`)
    }
    server.close()
    await db.end()
    process.exit(0)
  }
}

runTests()
