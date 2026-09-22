import db from '../config/db.js'

class FooterSocialLink {
  static async create(linkData) {
    const { platform, icon, url, is_visible, sort_order } = linkData
    const [result] = await db.execute(
      'INSERT INTO footer_social_links (platform, icon, url, is_visible, sort_order) VALUES (?, ?, ?, ?, ?)',
      [platform, icon, url, is_visible == 0 || is_visible === 'false' ? 0 : 1, sort_order || 0]
    )
    return result.insertId
  }

  static async getAll() {
    const [rows] = await db.execute('SELECT * FROM footer_social_links ORDER BY sort_order ASC')
    return rows
  }

  static async getActive() {
    const [rows] = await db.execute('SELECT * FROM footer_social_links WHERE is_visible = 1 ORDER BY sort_order ASC')
    return rows
  }

  static async findById(id) {
    const [rows] = await db.execute(
      'SELECT * FROM footer_social_links WHERE id = ?',
      [id]
    )
    return rows[0] || null
  }

  static async update(id, linkData) {
    const { platform, icon, url, is_visible, sort_order } = linkData
    const [result] = await db.execute(
      'UPDATE footer_social_links SET platform = ?, icon = ?, url = ?, is_visible = ?, sort_order = ? WHERE id = ?',
      [platform, icon, url, is_visible == 0 || is_visible === 'false' ? 0 : 1, sort_order !== undefined ? sort_order : 0, id]
    )
    return result.affectedRows > 0
  }

  static async delete(id) {
    const [result] = await db.execute(
      'DELETE FROM footer_social_links WHERE id = ?',
      [id]
    )
    return result.affectedRows > 0
  }

  static async updateOrder(items) {
    const promises = items.map(item => 
      db.execute(
        'UPDATE footer_social_links SET sort_order = ? WHERE id = ?',
        [item.sort_order, item.id]
      )
    )
    await Promise.all(promises)
    return true
  }
}

export default FooterSocialLink
