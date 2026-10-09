import express from 'express'
import { optionalAuthenticate } from '../middleware/auth.middleware.js'
import db from '../config/db.js'

const router = express.Router()

// @route   GET /api/blog
// @desc    Get all published blog posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { limit = 10, category, author } = req.query
    
    let query = `
      SELECT 
        b.*,
        c.name as category_name,
        a.name as author_name,
        a.profile_photo as author_photo
      FROM blogs b
      LEFT JOIN categories c ON b.category_id = c.id
      LEFT JOIN authors a ON b.author_id = a.id
      WHERE b.status = 'published'
    `
    const params = []
    
    if (category) {
      query += ' AND c.slug = ?'
      params.push(category)
    }
    
    if (author) {
      query += ' AND a.slug = ?'
      params.push(author)
    }
    
    query += ' ORDER BY b.updated_at DESC, b.created_at DESC'
    
    const safeLimit = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 100)
    query += ` LIMIT ${safeLimit}`
    
    const [blogs] = await db.execute(query, params)
    const formatted = blogs.map(b => ({
      ...b,
      featured_image: b.featured_image || b.image,
      image: b.image || b.featured_image
    }))
    
    res.json({ success: true, data: formatted })
  } catch (error) {
    console.error('Get blogs error:', error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// @route   GET /api/blog/:slug
// @desc    Get blog post by slug
// @access  Public
router.get('/:slug', optionalAuthenticate, async (req, res) => {
  try {
    const { slug } = req.params
    const { preview } = req.query

    const isPreview = (preview === 'true' || preview === true) && Boolean(req.user?.id)
    const whereCondition = isPreview
      ? 'WHERE (b.slug = ? OR b.id = ?)'
      : "WHERE (b.slug = ? OR b.id = ?) AND b.status = 'published'"
    
    const idVal = isNaN(slug) ? 0 : parseInt(slug)
    const [blogs] = await db.execute(`
      SELECT 
        b.*,
        c.name as category_name,
        c.slug as category_slug,
        a.name as author_name,
        a.slug as author_slug,
        a.profile_photo as author_photo,
        a.designation as author_designation,
        a.bio as author_bio
      FROM blogs b
      LEFT JOIN categories c ON b.category_id = c.id
      LEFT JOIN authors a ON b.author_id = a.id
      ${whereCondition}
    `, [slug, idVal])
    
    if (blogs.length === 0) {
      return res.status(404).json({ success: false, message: 'Blog not found' })
    }

    const blog = {
      ...blogs[0],
      featured_image: blogs[0].featured_image || blogs[0].image,
      image: blogs[0].image || blogs[0].featured_image
    }
    
    res.json({ success: true, data: blog })
  } catch (error) {
    console.error('Get blog by slug error:', error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

export default router
