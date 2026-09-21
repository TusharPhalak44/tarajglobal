import db from '../config/db.js'

class Client {
  static async create(clientData) {
    const [result] = await db.execute(
      'INSERT INTO clients (client_name, logo_path, website_url, display_order, is_active) VALUES (?, ?, ?, ?, ?)',
      [clientData.client_name, clientData.logo_path, clientData.website_url || null, clientData.display_order || 0, clientData.is_active !== false ? 1 : 0]
    )
    return result.insertId
  }

  static async getAll() {
    const [rows] = await db.execute('SELECT * FROM clients ORDER BY display_order ASC')
    return rows
  }

  static async getActive() {
    const [rows] = await db.execute('SELECT * FROM clients WHERE is_active = 1 ORDER BY display_order ASC')
    return rows
  }

  static async findById(id) {
    const [rows] = await db.execute(
      'SELECT * FROM clients WHERE id = ?',
      [id]
    )
    return rows[0]
  }

  static async update(id, clientData) {
    const [result] = await db.execute(
      'UPDATE clients SET client_name = ?, logo_path = ?, website_url = ?, display_order = ?, is_active = ? WHERE id = ?',
      [clientData.client_name, clientData.logo_path, clientData.website_url || null, clientData.display_order || 0, clientData.is_active !== false ? 1 : 0, id]
    )
    return result.affectedRows > 0
  }

  static async delete(id) {
    const [result] = await db.execute(
      'DELETE FROM clients WHERE id = ?',
      [id]
    )
    return result.affectedRows > 0
  }

  static async updateOrder(items) {
    const promises = items.map(item => 
      db.execute(
        'UPDATE clients SET display_order = ? WHERE id = ?',
        [item.display_order, item.id]
      )
    )
    await Promise.all(promises)
    return true
  }
}

export default Client
