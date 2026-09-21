import express from 'express'
import db from '../config/db.js'

const router = express.Router()

// @route   GET /api/authors
// @desc    Get all authors
// @access  Public
router.get('/', async (req, res) => {
  try {
    const [authors] = await db.execute(`
      SELECT 
        a.*,
        (SELECT COUNT(*) FROM blogs b WHERE b.author_id = a.id AND b.status = 'published') as post_count
      FROM authors a
      ORDER BY a.name ASC
    `)
    
    res.json({ success: true, data: authors })
  } catch (error) {
    console.error('Get authors error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   GET /api/authors/:slug
// @desc    Get author by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params
    
    const [authors] = await db.execute(`
      SELECT 
        a.*,
        (SELECT COUNT(*) FROM blogs b WHERE b.author_id = a.id AND b.status = 'published') as post_count
      FROM authors a
      WHERE a.slug = ?
    `, [slug])
    
    if (authors.length === 0) {
      return res.status(404).json({ success: false, message: 'Author not found' })
    }
    
    res.json({ success: true, data: authors[0] })
  } catch (error) {
    console.error('Get author by slug error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
