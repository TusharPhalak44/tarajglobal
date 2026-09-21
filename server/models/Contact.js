import db from '../config/db.js'

class Contact {
  static async create(contactData) {
    const [result] = await db.execute(
      'INSERT INTO contacts (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)',
      [contactData.name, contactData.email, contactData.phone, contactData.subject, contactData.message]
    )
    return result.insertId
  }

  static async getAll() {
    const [rows] = await db.execute('SELECT * FROM contacts ORDER BY created_at DESC')
    return rows
  }

  static async findById(id) {
    const [rows] = await db.execute(
      'SELECT * FROM contacts WHERE id = ?',
      [id]
    )
    return rows[0]
  }

  static async updateStatus(id, status) {
    const [result] = await db.execute(
      'UPDATE contacts SET status = ? WHERE id = ?',
      [status, id]
    )
    return result.affectedRows > 0
  }

  static async delete(id) {
    const [result] = await db.execute(
      'DELETE FROM contacts WHERE id = ?',
      [id]
    )
    return result.affectedRows > 0
  }
}

export default Contact
