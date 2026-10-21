import db from '../config/db.js'
import crypto from 'crypto'

class Meeting {
  static async create(meetingData) {
    const bookingId = crypto.randomUUID()
    const [result] = await db.execute(
      `INSERT INTO meetings (booking_id, full_name, email, company, phone, meeting_date, meeting_time, time_zone, meeting_type, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        bookingId,
        meetingData.fullName,
        meetingData.email,
        meetingData.company,
        meetingData.phone || '',
        meetingData.date,
        meetingData.time,
        meetingData.timeZone,
        meetingData.meetingType || 'Strategy Call',
        'pending'
      ]
    )
    return { insertId: result.insertId, bookingId }
  }

  static async getAll() {
    const [rows] = await db.execute('SELECT * FROM meetings ORDER BY created_at DESC')
    return rows
  }

  static async findById(id) {
    const [rows] = await db.execute(
      'SELECT * FROM meetings WHERE id = ?',
      [id]
    )
    return rows[0]
  }

  static async findByBookingId(bookingId) {
    const [rows] = await db.execute(
      'SELECT * FROM meetings WHERE booking_id = ?',
      [bookingId]
    )
    return rows[0]
  }

  static async findByEmail(email) {
    const [rows] = await db.execute(
      'SELECT * FROM meetings WHERE email = ? ORDER BY created_at DESC',
      [email]
    )
    return rows
  }

  static async updateStatus(id, status) {
    const [result] = await db.execute(
      'UPDATE meetings SET status = ? WHERE id = ?',
      [status, id]
    )
    return result.affectedRows > 0
  }

  static async delete(id) {
    const [result] = await db.execute(
      'DELETE FROM meetings WHERE id = ?',
      [id]
    )
    return result.affectedRows > 0
  }

  static async checkDuplicateBooking(email, date, time) {
    const [rows] = await db.execute(
      'SELECT * FROM meetings WHERE email = ? AND meeting_date = ? AND meeting_time = ? AND status != ?',
      [email, date, time, 'cancelled']
    )
    return rows.length > 0
  }

  static async cancelByBookingOrDetails({ bookingId, email, date, time }) {
    if (bookingId) {
      const [result] = await db.execute(
        'UPDATE meetings SET status = ? WHERE booking_id = ?',
        ['cancelled', bookingId]
      )
      if (result.affectedRows > 0) return true
    }
    if (email) {
      const [result] = await db.execute(
        'UPDATE meetings SET status = ? WHERE email = ? AND (meeting_date = ? OR ? IS NULL) AND status != ? ORDER BY created_at DESC LIMIT 1',
        ['cancelled', email, date || null, date || null, 'cancelled']
      )
      return result.affectedRows > 0
    }
    return false
  }

  static async rescheduleByBookingOrDetails({ bookingId, email, oldDate, date, time, timeZone }) {
    if (bookingId) {
      const [result] = await db.execute(
        'UPDATE meetings SET meeting_date = ?, meeting_time = ?, time_zone = ?, status = ? WHERE booking_id = ?',
        [date, time, timeZone, 'rescheduled', bookingId]
      )
      if (result.affectedRows > 0) return true
    }
    if (email) {
      const [result] = await db.execute(
        'UPDATE meetings SET meeting_date = ?, meeting_time = ?, time_zone = ?, status = ? WHERE email = ? AND (meeting_date = ? OR ? IS NULL) AND status != ? ORDER BY created_at DESC LIMIT 1',
        [date, time, timeZone, 'rescheduled', email, oldDate || null, oldDate || null, 'cancelled']
      )
      return result.affectedRows > 0
    }
    return false
  }
}

export default Meeting
