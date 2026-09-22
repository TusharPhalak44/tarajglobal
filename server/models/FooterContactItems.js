import db from '../config/db.js'

class FooterContactItems {
  static async getAll() {
    const [rows] = await db.execute('SELECT * FROM footer_contact_items ORDER BY sort_order ASC')
    return rows
  }

  static async getVisible() {
    const [rows] = await db.execute('SELECT * FROM footer_contact_items WHERE is_visible = 1 ORDER BY sort_order ASC')
    return rows
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM footer_contact_items WHERE id = ?', [id])
    return rows[0] || null
  }

  static async create(contactData) {
    const { type, label, value, action_url, icon, is_visible, sort_order } = contactData
    const [result] = await db.execute(
      'INSERT INTO footer_contact_items (type, label, value, action_url, icon, is_visible, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        type || 'custom',
        label || null,
        value || null,
        action_url || null,
        icon || 'Mail',
        is_visible == 0 || is_visible === 'false' ? 0 : 1,
        sort_order || 0
      ]
    )
    return result.insertId
  }

  static async update(id, contactData) {
    const { type, label, value, action_url, icon, is_visible, sort_order } = contactData
    const [result] = await db.execute(
      'UPDATE footer_contact_items SET type = ?, label = ?, value = ?, action_url = ?, icon = ?, is_visible = ?, sort_order = ? WHERE id = ?',
      [
        type || 'custom',
        label || null,
        value || null,
        action_url || null,
        icon || 'Mail',
        is_visible == 0 || is_visible === 'false' ? 0 : 1,
        sort_order !== undefined ? sort_order : 0,
        id
      ]
    )
    return result.affectedRows > 0
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM footer_contact_items WHERE id = ?', [id])
    return result.affectedRows > 0
  }

  static async updateOrder(items) {
    const promises = items.map(item => 
      db.execute(
        'UPDATE footer_contact_items SET sort_order = ? WHERE id = ?',
        [item.sort_order, item.id]
      )
    )
    await Promise.all(promises)
    return true
  }
}

export default FooterContactItems
