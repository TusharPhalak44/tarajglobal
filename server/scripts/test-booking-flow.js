import 'dotenv/config'
import db from '../config/db.js'
import { createMeeting } from '../controllers/meeting.controller.js'
import Meeting from '../models/Meeting.js'

async function runBookingTest() {
  console.log('\n=== TESTING STRATEGY CALL BOOKING FLOW ===\n')

  const testDate = '2026-10-15'
  const testTime = '03:30 PM'

  // Clean prior test records
  await db.execute('DELETE FROM meetings WHERE meeting_date = ? AND meeting_time = ?', [testDate, testTime])

  const mockReq = {
    body: {
      fullName: 'Rahul Sharma',
      email: 'rahul.test@example.com',
      company: 'Acme Technologies',
      phone: '+91 9876543210',
      interest: 'B2B Growth / Demand Generation',
      message: 'Interested in pipeline acceleration',
      date: testDate,
      time: testTime,
      timeZone: 'Asia/Kolkata'
    }
  }

  let code1 = 200
  let resp1 = null
  const mockRes1 = {
    status(c) { code1 = c; return this },
    json(d) { resp1 = d; return this }
  }

  console.log('1. Submitting Strategy Call booking...')
  await createMeeting(mockReq, mockRes1)
  console.log(`   Response Code: ${code1}`)
  console.log(`   Success: ${resp1?.success}`)
  console.log(`   Booking ID: ${resp1?.data?.bookingId}`)
  console.log(`   Meeting Link: ${resp1?.data?.meetingLink}`)
  console.log(`   Calendar Link: ${resp1?.data?.calendarLink}`)
  console.log(`   Status: ${resp1?.data?.status}`)
  console.log(`   Email Warning: ${resp1?.data?.emailWarning}`)

  const dbMeeting = await Meeting.findByBookingId(resp1?.data?.bookingId)
  console.log('\n2. Database Record Verification:')
  console.log(`   - ID: ${dbMeeting.id}`)
  console.log(`   - Status: ${dbMeeting.status}`)
  console.log(`   - Calendar Sync Status: ${dbMeeting.calendar_sync_status}`)
  console.log(`   - Email Status: ${dbMeeting.email_status}`)
  console.log(`   - Meeting Link: ${dbMeeting.meeting_link}`)
  console.log(`   - Calendar Event ID: ${dbMeeting.calendar_event_id}`)

  console.log('\n3. Testing Double-Booking Prevention (Same Slot)...')
  let code2 = 200
  let resp2 = null
  const mockRes2 = {
    status(c) { code2 = c; return this },
    json(d) { resp2 = d; return this }
  }
  await createMeeting(mockReq, mockRes2)
  console.log(`   Response Code: ${code2} (Expected 409 Conflict)`)
  console.log(`   Message: ${resp2?.message}`)

  // Cleanup test record
  await db.execute('DELETE FROM meetings WHERE id = ?', [dbMeeting.id])
  console.log('\n✅ Booking flow test complete & cleaned up.\n')

  process.exit(0)
}

runBookingTest().catch(err => {
  console.error('Test error:', err)
  process.exit(1)
})
