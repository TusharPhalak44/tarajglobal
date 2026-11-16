import db from '../config/db.js'

class User {
  static async create(userData) {
    const [result] = await db.execute(
      `INSERT INTO users (name, email, password, role, avatar, bio, linkedin_url, twitter_url, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userData.name,
        userData.email,
        userData.password,
        userData.role || 'user',
        userData.avatar || null,
        userData.bio || null,
        userData.linkedin_url || null,
        userData.twitter_url || null,
        userData.status || 'active'
      ]
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
    const fields = []
    const values = []
    for (const key of ['name', 'email', 'role', 'status', 'avatar', 'bio', 'linkedin_url', 'twitter_url', 'phone', 'department']) {
      if (userData[key] !== undefined) {
        fields.push(`${key} = ?`)
        values.push(userData[key])
      }
    }
    if (fields.length === 0) return false
    values.push(id)
    const [result] = await db.execute(
      `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
      values
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
