import db from '../config/db.js'
import { v4 as uuidv4 } from 'uuid'
import { normalizeTimeTo24h, formatTime12h, buildDateTimeISO } from '../config/booking.config.js'

class Meeting {
  /**
   * Create meeting with transaction and slot collision check
   */
  static async create(meetingData) {
    const bookingId = meetingData.bookingId || `TG-MTG-${Date.now().toString().slice(-6)}`
    const fullName = meetingData.fullName || meetingData.name || meetingData.full_name || ''
    const email = (meetingData.email || '').trim().toLowerCase()
    const company = meetingData.company || ''
    const phone = meetingData.phone || ''
    const interest = meetingData.interest || meetingData.service || 'B2B Growth / Demand Generation'
    const message = meetingData.message || ''

    const dateVal = typeof meetingData.date === 'string'
      ? meetingData.date.split('T')[0]
      : meetingData.date instanceof Date
        ? meetingData.date.toISOString().split('T')[0]
        : meetingData.meeting_date || ''

    const timeVal = meetingData.time || meetingData.meeting_time || meetingData.start_time || ''
    const time24 = normalizeTimeTo24h(timeVal)
    const time12 = formatTime12h(time24)

    const isoInfo = buildDateTimeISO(dateVal, timeVal)
    const startTime = meetingData.startTime || meetingData.start_time || time12
    const endTime = meetingData.endTime || meetingData.end_time || isoInfo.endTime12
    const timeZone = meetingData.timeZone || meetingData.timezone || meetingData.time_zone || 'Asia/Kolkata'
    const meetingType = meetingData.meetingType || meetingData.meeting_type || 'Strategy Call'
    const status = meetingData.status || 'pending'
    const calendarSyncStatus = meetingData.calendar_sync_status || 'pending'
    const emailStatus = meetingData.email_status || 'pending'

    // Use connection from pool for transaction & row locking
    const connection = await db.getConnection()

    try {
      await connection.beginTransaction()

      // 1. Check for slot collision with FOR UPDATE lock
      const [existing] = await connection.execute(
        `SELECT id, booking_id, status FROM meetings 
         WHERE meeting_date = ? AND (meeting_time = ? OR meeting_time = ?) AND status IN ('pending', 'confirmed') 
         FOR UPDATE`,
        [dateVal, time12, time24]
      )

      if (existing.length > 0) {
        const error = new Error('This time slot was just booked. Please select another available time.')
        error.code = 'SLOT_ALREADY_BOOKED'
        error.status = 409
        throw error
      }

      // 2. Insert new meeting
      const [result] = await connection.execute(
        `INSERT INTO meetings (
          booking_id, full_name, email, company, phone, interest, message,
          meeting_date, meeting_time, start_time, end_time, time_zone,
          meeting_type, status, calendar_sync_status, email_status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          bookingId, fullName, email, company, phone, interest, message,
          dateVal, time12, startTime, endTime, timeZone,
          meetingType, status, calendarSyncStatus, emailStatus
        ]
      )

      await connection.commit()

      return {
        insertId: result.insertId,
        id: result.insertId,
        bookingId,
        booking_id: bookingId,
        fullName,
        full_name: fullName,
        email,
        company,
        phone,
        interest,
        message,
        meeting_date: dateVal,
        meeting_time: time12,
        start_time: startTime,
        end_time: endTime,
        time_zone: timeZone,
        meeting_type: meetingType,
        status,
        calendar_sync_status: calendarSyncStatus,
        email_status: emailStatus
      }
    } catch (err) {
      await connection.rollback()
      throw err
    } finally {
      connection.release()
    }
  }

  /**
   * Check if a specific slot is already booked
   */
  static async isSlotBooked(date, time) {
    const time24 = normalizeTimeTo24h(time)
    const time12 = formatTime12h(time24)

    const [rows] = await db.execute(
      `SELECT id FROM meetings 
       WHERE meeting_date = ? AND (meeting_time = ? OR meeting_time = ?) AND status IN ('pending', 'confirmed')`,
      [date, time12, time24]
    )
    return rows.length > 0
  }

  /**
   * Get all booked slots for a given date
   */
  static async getBookedSlotsForDate(date) {
    const [rows] = await db.execute(
      `SELECT meeting_time, start_time, end_time, status 
       FROM meetings 
       WHERE meeting_date = ? AND status IN ('pending', 'confirmed')`,
      [date]
    )
    return rows
  }

  /**
   * Get all meetings with optional filters, pagination, and sorting
   */
  static async getAll(options = {}) {
    let query = 'SELECT * FROM meetings WHERE 1=1'
    const params = []

    if (options.status) {
      query += ' AND status = ?'
      params.push(options.status)
    }

    if (options.date) {
      query += ' AND meeting_date = ?'
      params.push(options.date)
    }

    if (options.search) {
      query += ' AND (full_name LIKE ? OR email LIKE ? OR company LIKE ? OR booking_id LIKE ?)'
      const searchParam = `%${options.search}%`
      params.push(searchParam, searchParam, searchParam, searchParam)
    }

    // Count query for pagination
    const countQuery = query.replace('SELECT *', 'SELECT COUNT(*) as total')
    const [countRows] = await db.execute(countQuery, params)
    const total = countRows[0]?.total || 0

    query += ' ORDER BY meeting_date DESC, created_at DESC'

    if (options.limit) {
      const limit = parseInt(options.limit, 10) || 20
      const page = parseInt(options.page, 10) || 1
      const offset = (page - 1) * limit
      query += ` LIMIT ${limit} OFFSET ${offset}`
    }

    const [rows] = await db.execute(query, params)
    return { meetings: rows, total }
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM meetings WHERE id = ?', [id])
    return rows[0] || null
  }

  static async findByBookingId(bookingId) {
    const [rows] = await db.execute('SELECT * FROM meetings WHERE booking_id = ?', [bookingId])
    return rows[0] || null
  }

  static async findByEmail(email) {
    const [rows] = await db.execute(
      'SELECT * FROM meetings WHERE email = ? ORDER BY meeting_date DESC, created_at DESC',
      [email]
    )
    return rows
  }

  /**
   * Update meeting fields (calendar ID, links, sync status, etc.)
   */
  static async update(id, data) {
    const allowedFields = [
      'full_name', 'email', 'company', 'phone', 'interest', 'message',
      'meeting_date', 'meeting_time', 'start_time', 'end_time', 'time_zone',
      'meeting_type', 'status', 'calendar_event_id', 'calendar_event_link',
      'meeting_link', 'calendar_sync_status', 'email_status', 'cancellation_reason'
    ]

    const setClauses = []
    const params = []

    for (const [key, value] of Object.entries(data)) {
      if (allowedFields.includes(key)) {
        setClauses.push(`${key} = ?`)
        params.push(value)
      }
    }

    if (setClauses.length === 0) return false

    params.push(id)
    const [result] = await db.execute(
      `UPDATE meetings SET ${setClauses.join(', ')} WHERE id = ?`,
      params
    )
    return result.affectedRows > 0
  }

  static async updateStatus(id, status) {
    const [result] = await db.execute('UPDATE meetings SET status = ? WHERE id = ?', [status, id])
    return result.affectedRows > 0
  }

  /**
   * Reschedule meeting to a new date and time
   */
  static async reschedule(id, { date, time, timeZone }) {
    const time24 = normalizeTimeTo24h(time)
    const time12 = formatTime12h(time24)
    const isoInfo = buildDateTimeISO(date, time)

    const connection = await db.getConnection()

    try {
      await connection.beginTransaction()

      // Check slot availability (excluding current meeting)
      const [existing] = await connection.execute(
        `SELECT id FROM meetings 
         WHERE meeting_date = ? AND (meeting_time = ? OR meeting_time = ?) 
           AND status IN ('pending', 'confirmed') AND id != ?
         FOR UPDATE`,
        [date, time12, time24, id]
      )

      if (existing.length > 0) {
        const error = new Error('The selected slot is already booked. Please choose another time.')
        error.code = 'SLOT_ALREADY_BOOKED'
        error.status = 409
        throw error
      }

      await connection.execute(
        `UPDATE meetings SET 
          meeting_date = ?, 
          meeting_time = ?, 
          start_time = ?, 
          end_time = ?, 
          time_zone = ?, 
          status = 'confirmed'
         WHERE id = ?`,
        [date, time12, time12, isoInfo.endTime12, timeZone || 'Asia/Kolkata', id]
      )

      await connection.commit()
      return true
    } catch (err) {
      await connection.rollback()
      throw err
    } finally {
      connection.release()
    }
  }

  /**
   * Cancel meeting and free up slot
   */
  static async cancel(id, cancellationReason = '') {
    const [result] = await db.execute(
      `UPDATE meetings 
       SET status = 'cancelled', cancellation_reason = ? 
       WHERE id = ?`,
      [cancellationReason || 'Cancelled by admin / request', id]
    )
    return result.affectedRows > 0
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM meetings WHERE id = ?', [id])
    return result.affectedRows > 0
  }

  static async checkDuplicateBooking(email, date, time) {
    const time24 = normalizeTimeTo24h(time)
    const time12 = formatTime12h(time24)

    const [rows] = await db.execute(
      `SELECT * FROM meetings 
       WHERE email = ? AND meeting_date = ? AND (meeting_time = ? OR meeting_time = ?) AND status != 'cancelled'`,
      [email, date, time12, time24]
    )
    return rows.length > 0
  }
}

export default Meeting
