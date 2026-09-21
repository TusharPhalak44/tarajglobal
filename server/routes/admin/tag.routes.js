import express from 'express'
import { body } from 'express-validator'
import { validate } from '../../middleware/validation.middleware.js'
import { checkPermission } from '../../middleware/permission.middleware.js'

const router = express.Router()

// @route   GET /api/admin/tags
// @desc    Get all tags
// @access  Private
router.get('/', checkPermission('blog.create'), async (req, res) => {
  try {
    const [tags] = await req.db.execute(`
      SELECT t.*, 
        (SELECT COUNT(*) FROM blog_tags WHERE tag_id = t.id) as post_count
      FROM tags t
      ORDER BY t.name ASC
    `)
    res.json({ success: true, data: tags })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   POST /api/admin/tags
// @desc    Create tag
// @access  Private
router.post('/', [
  checkPermission('blog.create'),
  body('name').trim().notEmpty().withMessage('Name is required')
], validate, async (req, res) => {
  try {
    const { name } = req.body
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    
    const [result] = await db.execute(
      'INSERT INTO tags (name, slug) VALUES (?, ?)',
      [name, slug]
    )
    
    res.status(201).json({ success: true, data: { id: result.insertId, slug } })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   PUT /api/admin/tags/:id
// @desc    Update tag
// @access  Private
router.put('/:id', [
  checkPermission('blog.create'),
  body('name').optional().trim().notEmpty()
], validate, async (req, res) => {
  try {
    const { id } = req.params
    const { name, status } = req.body
    
    await req.db.execute(
      'UPDATE tags SET name = COALESCE(?, name), status = COALESCE(?, status) WHERE id = ?',
      [name, status, id]
    )
    
    res.json({ success: true, message: 'Tag updated successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   DELETE /api/admin/tags/:id
// @desc    Delete tag
// @access  Private
router.delete('/:id', checkPermission('blog.delete'), async (req, res) => {
  try {
    await req.db.execute('DELETE FROM tags WHERE id = ?', [req.params.id])
    res.json({ success: true, message: 'Tag deleted successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
