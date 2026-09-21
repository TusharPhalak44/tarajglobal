import express from 'express'
import { body } from 'express-validator'
import { validate } from '../../middleware/validation.middleware.js'
import { checkPermission } from '../../middleware/permission.middleware.js'
import db from '../../config/db.js'

const router = express.Router()

// @route   GET /api/admin/categories
// @desc    Get all categories
// @access  Private
router.get('/', async (req, res) => {
  try {
    const [categories] = await db.execute('SELECT * FROM categories ORDER BY name ASC')
    res.json({ success: true, data: categories })
  } catch (error) {
    console.error('Get categories error:', error)
    res.json({ success: true, data: [] })
  }
})

// @route   POST /api/admin/categories
// @desc    Create category
// @access  Private
router.post('/', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('description').optional()
], validate, async (req, res) => {
  try {
    const { name, slug, description, status, image, seo_title, seo_description } = req.body
    const categorySlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    
    const [result] = await db.execute(
      'INSERT INTO categories (name, slug, description, status, image, seo_title, seo_description) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, categorySlug, description || null, status || 'active', image || null, seo_title || null, seo_description || null]
    )
    
    res.status(201).json({ success: true, data: { id: result.insertId, slug: categorySlug } })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   PUT /api/admin/categories/:id
// @desc    Update category
// @access  Private
router.put('/:id', [
  body('name').optional().trim().notEmpty()
], validate, async (req, res) => {
  try {
    const { id } = req.params
    const { name, description, image, seo_title, seo_description, status } = req.body
    
    await db.execute(
      'UPDATE categories SET name = COALESCE(?, name), description = COALESCE(?, description), image = COALESCE(?, image), seo_title = COALESCE(?, seo_title), seo_description = COALESCE(?, seo_description), status = COALESCE(?, status) WHERE id = ?',
      [name, description, image ?? null, seo_title ?? null, seo_description ?? null, status, id]
    )
    
    res.json({ success: true, message: 'Category updated successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   DELETE /api/admin/categories/:id
// @desc    Delete category
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    await db.execute('DELETE FROM categories WHERE id = ?', [req.params.id])
    res.json({ success: true, message: 'Category deleted successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
