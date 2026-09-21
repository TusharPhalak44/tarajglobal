import express from 'express'
import db from '../config/db.js'

const router = express.Router()

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get('/', async (req, res) => {
  try {
    const [categories] = await db.execute(`
      SELECT 
        c.*,
        (SELECT COUNT(*) FROM blogs b WHERE b.category_id = c.id AND b.status = 'published') as post_count
      FROM categories c
      WHERE c.status = 'active'
      ORDER BY c.name ASC
    `)
    
    res.json({ success: true, data: categories })
  } catch (error) {
    console.error('Get categories error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   GET /api/categories/:slug
// @desc    Get category by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params
    
    const [categories] = await db.execute(`
      SELECT 
        c.*,
        (SELECT COUNT(*) FROM blogs b WHERE b.category_id = c.id AND b.status = 'published') as post_count
      FROM categories c
      WHERE c.slug = ? AND c.status = 'active'
    `, [slug])
    
    if (categories.length === 0) {
      return res.status(404).json({ success: false, message: 'Category not found' })
    }
    
    res.json({ success: true, data: categories[0] })
  } catch (error) {
    console.error('Get category by slug error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
