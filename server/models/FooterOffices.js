import db from '../config/db.js'

class FooterOffices {
  static async getAll() {
    const [rows] = await db.execute('SELECT * FROM footer_offices ORDER BY sort_order ASC')
    return rows
  }

  static async getVisible() {
    const [rows] = await db.execute('SELECT * FROM footer_offices WHERE is_visible = 1 ORDER BY sort_order ASC')
    return rows
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM footer_offices WHERE id = ?', [id])
    return rows[0] || null
  }

  static async create(officeData) {
    const { name, address_line_1, address_line_2, city, state, country, postal_code, map_url, phone, email, icon, is_visible, sort_order } = officeData
    const [result] = await db.execute(
      'INSERT INTO footer_offices (name, address_line_1, address_line_2, city, state, country, postal_code, map_url, phone, email, icon, is_visible, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        name,
        address_line_1 || null,
        address_line_2 || null,
        city || null,
        state || null,
        country || null,
        postal_code || null,
        map_url || null,
        phone || null,
        email || null,
        icon || 'MapPin',
        is_visible !== false ? 1 : 0,
        sort_order || 0
      ]
    )
    return result.insertId
  }

  static async update(id, officeData) {
    const { name, address_line_1, address_line_2, city, state, country, postal_code, map_url, phone, email, icon, is_visible, sort_order } = officeData
    const [result] = await db.execute(
      'UPDATE footer_offices SET name = ?, address_line_1 = ?, address_line_2 = ?, city = ?, state = ?, country = ?, postal_code = ?, map_url = ?, phone = ?, email = ?, icon = ?, is_visible = ?, sort_order = ? WHERE id = ?',
      [
        name,
        address_line_1 || null,
        address_line_2 || null,
        city || null,
        state || null,
        country || null,
        postal_code || null,
        map_url || null,
        phone || null,
        email || null,
        icon || 'MapPin',
        is_visible !== false ? 1 : 0,
        sort_order || 0,
        id
      ]
    )
    return result.affectedRows > 0
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM footer_offices WHERE id = ?', [id])
    return result.affectedRows > 0
  }

  static async updateOrder(items) {
    const promises = items.map(item => 
      db.execute(
        'UPDATE footer_offices SET sort_order = ? WHERE id = ?',
        [item.sort_order, item.id]
      )
    )
    await Promise.all(promises)
    return true
  }
}

export default FooterOffices
