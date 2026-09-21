import db from '../config/db.js'

class FooterLink {
  static async create(linkData) {
    const { section_id, label, url, link_type, target, custom_action, is_visible, sort_order } = linkData
    const [result] = await db.execute(
      'INSERT INTO footer_links (section_id, label, url, link_type, target, custom_action, is_visible, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        section_id,
        label,
        url || '#',
        link_type || 'internal',
        target || '_self',
        custom_action || null,
        is_visible !== false ? 1 : 0,
        sort_order || 0
      ]
    )
    return result.insertId
  }

  static async getAll() {
    const [rows] = await db.execute('SELECT * FROM footer_links ORDER BY section_id ASC, sort_order ASC')
    return rows
  }

  static async getBySection(sectionId) {
    const [rows] = await db.execute(
      'SELECT * FROM footer_links WHERE section_id = ? ORDER BY sort_order ASC',
      [sectionId]
    )
    return rows
  }

  static async getActive() {
    const [rows] = await db.execute('SELECT * FROM footer_links WHERE is_visible = 1 ORDER BY section_id ASC, sort_order ASC')
    return rows
  }

  static async findById(id) {
    const [rows] = await db.execute(
      'SELECT * FROM footer_links WHERE id = ?',
      [id]
    )
    return rows[0] || null
  }

  static async update(id, linkData) {
    const { section_id, label, url, link_type, target, custom_action, is_visible, sort_order } = linkData
    const [result] = await db.execute(
      'UPDATE footer_links SET section_id = ?, label = ?, url = ?, link_type = ?, target = ?, custom_action = ?, is_visible = ?, sort_order = ? WHERE id = ?',
      [
        section_id,
        label,
        url !== undefined ? url : '#',
        link_type || 'internal',
        target || '_self',
        custom_action || null,
        is_visible !== false ? 1 : 0,
        sort_order !== undefined ? sort_order : 0,
        id
      ]
    )
    return result.affectedRows > 0
  }

  static async delete(id) {
    const [result] = await db.execute(
      'DELETE FROM footer_links WHERE id = ?',
      [id]
    )
    return result.affectedRows > 0
  }

  static async updateOrder(items) {
    const promises = items.map(item => 
      db.execute(
        'UPDATE footer_links SET sort_order = ? WHERE id = ?',
        [item.sort_order, item.id]
      )
    )
    await Promise.all(promises)
    return true
  }
}

export default FooterLink
