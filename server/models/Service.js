import db from '../config/db.js'

class Service {
  static async create(serviceData) {
    const [result] = await db.execute(
      'INSERT INTO services (title, description, icon, image, slug) VALUES (?, ?, ?, ?, ?)',
      [serviceData.title, serviceData.description, serviceData.icon, serviceData.image, serviceData.slug]
    )
    return result.insertId
  }

  static async getAll() {
    const [rows] = await db.execute('SELECT * FROM services ORDER BY created_at DESC')
    return rows
  }

  static async findById(id) {
    const [rows] = await db.execute(
      'SELECT * FROM services WHERE id = ?',
      [id]
    )
    return rows[0]
  }

  static async findBySlug(slug) {
    const [rows] = await db.execute(
      'SELECT * FROM services WHERE slug = ?',
      [slug]
    )
    return rows[0]
  }

  static async update(id, serviceData) {
    const [result] = await db.execute(
      'UPDATE services SET title = ?, description = ?, icon = ?, image = ?, slug = ? WHERE id = ?',
      [serviceData.title, serviceData.description, serviceData.icon, serviceData.image, serviceData.slug, id]
    )
    return result.affectedRows > 0
  }

  static async delete(id) {
    const [result] = await db.execute(
      'DELETE FROM services WHERE id = ?',
      [id]
    )
    return result.affectedRows > 0
  }
}

export default Service
