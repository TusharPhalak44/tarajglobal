import db from '../config/db.js'
import { v4 as uuidv4 } from 'uuid'

class Meeting {
  static async create(meetingData) {
    const bookingId = uuidv4()
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
}

export default Meeting
