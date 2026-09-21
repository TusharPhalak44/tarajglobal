import db from '../config/db.js'

class Blog {
  static async create(blogData) {
    const [result] = await db.execute(
      'INSERT INTO blogs (title, content, excerpt, image, author, slug, category, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [blogData.title, blogData.content, blogData.excerpt, blogData.image, blogData.author, blogData.slug, blogData.category, blogData.status || 'draft']
    )
    return result.insertId
  }

  static async getAll(filters = {}) {
    let query = 'SELECT * FROM blogs'
    const params = []

    if (filters.status) {
      query += ' WHERE status = ?'
      params.push(filters.status)
    }

    query += ' ORDER BY created_at DESC'

    if (filters.limit) {
      query += ' LIMIT ?'
      params.push(filters.limit)
    }

    const [rows] = await db.execute(query, params)
    return rows
  }

  static async findById(id) {
    const [rows] = await db.execute(
      'SELECT * FROM blogs WHERE id = ?',
      [id]
    )
    return rows[0]
  }

  static async findBySlug(slug) {
    const [rows] = await db.execute(
      'SELECT * FROM blogs WHERE slug = ?',
      [slug]
    )
    return rows[0]
  }

  static async update(id, blogData) {
    const [result] = await db.execute(
      'UPDATE blogs SET title = ?, content = ?, excerpt = ?, image = ?, author = ?, slug = ?, category = ?, status = ? WHERE id = ?',
      [blogData.title, blogData.content, blogData.excerpt, blogData.image, blogData.author, blogData.slug, blogData.category, blogData.status, id]
    )
    return result.affectedRows > 0
  }

  static async delete(id) {
    const [result] = await db.execute(
      'DELETE FROM blogs WHERE id = ?',
      [id]
    )
    return result.affectedRows > 0
  }
}

export default Blog
