import db from '../config/db.js'

class FooterSections {
  static async getAll() {
    const [rows] = await db.execute('SELECT * FROM footer_sections ORDER BY sort_order ASC')
    return rows
  }

  static async getVisible() {
    const [rows] = await db.execute('SELECT * FROM footer_sections WHERE is_visible = 1 ORDER BY sort_order ASC')
    return rows
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM footer_sections WHERE id = ?', [id])
    return rows[0] || null
  }

  static async create(sectionData) {
    const { title, section_type, is_visible, sort_order } = sectionData
    const [result] = await db.execute(
      'INSERT INTO footer_sections (title, section_type, is_visible, sort_order) VALUES (?, ?, ?, ?)',
      [title, section_type || 'links', is_visible !== false ? 1 : 0, sort_order || 0]
    )
    return result.insertId
  }

  static async update(id, sectionData) {
    const { title, section_type, is_visible, sort_order } = sectionData
    const [result] = await db.execute(
      'UPDATE footer_sections SET title = ?, section_type = ?, is_visible = ?, sort_order = ? WHERE id = ?',
      [title, section_type, is_visible !== false ? 1 : 0, sort_order || 0, id]
    )
    return result.affectedRows > 0
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM footer_sections WHERE id = ?', [id])
    return result.affectedRows > 0
  }

  static async updateOrder(items) {
    const promises = items.map(item => 
      db.execute(
        'UPDATE footer_sections SET sort_order = ? WHERE id = ?',
        [item.sort_order, item.id]
      )
    )
    await Promise.all(promises)
    return true
  }
}

export default FooterSections
