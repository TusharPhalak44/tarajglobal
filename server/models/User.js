import db from '../config/db.js'

class User {
  static async create(userData) {
    const [result] = await db.execute(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [userData.name, userData.email, userData.password, userData.role || 'user']
    )
    return result.insertId
  }

  static async findByEmail(email) {
    const [rows] = await db.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    )
    return rows[0]
  }

  static async findById(id) {
    const [rows] = await db.execute(
      'SELECT * FROM users WHERE id = ?',
      [id]
    )
    return rows[0]
  }

  static async update(id, userData) {
    const [result] = await db.execute(
      'UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?',
      [userData.name, userData.email, userData.role, id]
    )
    return result.affectedRows > 0
  }

  static async delete(id) {
    const [result] = await db.execute(
      'DELETE FROM users WHERE id = ?',
      [id]
    )
    return result.affectedRows > 0
  }

  static async getAll() {
    const [rows] = await db.execute('SELECT * FROM users')
    return rows
  }
}

export default User
