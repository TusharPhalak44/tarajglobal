import db from '../config/db.js'

class NavbarItem {
  static async create(itemData) {
    const [result] = await db.execute(
      'INSERT INTO navbar_items (section, label, url, parent_id, display_order, is_active) VALUES (?, ?, ?, ?, ?, ?)',
      [itemData.section || 'navbar', itemData.label, itemData.url, itemData.parent_id || null, itemData.display_order || 0, itemData.is_active !== false ? 1 : 0]
    )
    return result.insertId
  }

  static async getAll() {
    const [rows] = await db.execute('SELECT * FROM navbar_items ORDER BY section ASC, display_order ASC, id ASC')
    return rows
  }

  static async getActive() {
    const [rows] = await db.execute('SELECT * FROM navbar_items WHERE is_active = 1 ORDER BY section ASC, display_order ASC, id ASC')
    return rows
  }

  static async findById(id) {
    const [rows] = await db.execute(
      'SELECT * FROM navbar_items WHERE id = ?',
      [id]
    )
    return rows[0]
  }

  static async update(id, itemData) {
    await db.execute(
      'UPDATE navbar_items SET section = ?, label = ?, url = ?, parent_id = ?, display_order = ?, is_active = ? WHERE id = ?',
      [
        itemData.section || 'navbar',
        itemData.label,
        itemData.url,
        itemData.parent_id || null,
        itemData.display_order !== undefined ? parseInt(itemData.display_order) : 0,
        itemData.is_active ? 1 : 0,
        id
      ]
    )
    return true
  }

  static async delete(id) {
    const [result] = await db.execute(
      'DELETE FROM navbar_items WHERE id = ?',
      [id]
    )
    return result.affectedRows > 0
  }

  static async updateOrder(items) {
    const promises = items.map(item => 
      db.execute(
        'UPDATE navbar_items SET display_order = ? WHERE id = ?',
        [item.display_order, item.id]
      )
    )
    await Promise.all(promises)
    return true
  }
}

export default NavbarItem
