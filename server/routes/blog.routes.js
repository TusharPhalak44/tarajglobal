import express from 'express'
import { optionalAuthenticate } from '../middleware/auth.middleware.js'
import db from '../config/db.js'
import { publishScheduledBlogs } from '../controllers/admin/blog.controller.js'
import { formatAuthorName } from '../utils/authorFormatter.js'

const router = express.Router()

// @route   GET /api/blog
// @desc    Get all published blog posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Promote any scheduled blogs whose scheduled_at has arrived
    await publishScheduledBlogs()

    const { limit = 10, category, author } = req.query
    
    let query = `
      SELECT 
        b.*,
        c.name as category_name,
        CASE
          WHEN u.name IS NOT NULL AND u.name != '' AND u.name NOT LIKE '%@%' THEN u.name
          WHEN a.name IS NOT NULL AND a.name != '' AND a.name NOT LIKE '%@%' THEN a.name
          WHEN b.author IS NOT NULL AND b.author != '' AND b.author NOT LIKE '%@%' THEN b.author
          ELSE COALESCE(u.name, a.name, b.author)
        END as author_name,
        COALESCE(u.avatar, a.profile_photo) as author_photo,
        COALESCE(u.bio, a.bio) as author_bio,
        COALESCE(u.linkedin_url, a.linkedin_url) as author_linkedin,
        COALESCE(u.linkedin_url, a.linkedin_url) as author_linkedin_url,
        COALESCE(u.twitter_url, a.twitter_url) as author_twitter,
        COALESCE(u.twitter_url, a.twitter_url) as author_twitter_url
      FROM blogs b
      LEFT JOIN categories c ON b.category_id = c.id
      LEFT JOIN authors a ON b.author_id = a.id
      LEFT JOIN users u ON u.id = IFNULL(b.created_by, a.user_id)
      WHERE (b.status = 'published' OR (b.status = 'scheduled' AND b.scheduled_at IS NOT NULL AND b.scheduled_at <= NOW()))
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
    
    query += ' ORDER BY COALESCE(b.published_at, b.scheduled_at, b.created_at) DESC, b.created_at DESC'
    
    const safeLimit = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 100)
    query += ` LIMIT ${safeLimit}`
    
    const [blogs] = await db.execute(query, params)
    const formatted = blogs.map(b => ({
      ...b,
      author_name: formatAuthorName(b.author_name || b.author),
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
    await publishScheduledBlogs()

    const { slug } = req.params
    const { preview } = req.query

    const isPreview = (preview === 'true' || preview === true) && Boolean(req.user?.id)
    const whereCondition = isPreview
      ? 'WHERE (b.slug = ? OR b.id = ?)'
      : "WHERE (b.slug = ? OR b.id = ?) AND (b.status = 'published' OR (b.status = 'scheduled' AND b.scheduled_at IS NOT NULL AND b.scheduled_at <= NOW()))"
    
    const idVal = isNaN(slug) ? 0 : parseInt(slug)
    const [blogs] = await db.execute(`
      SELECT 
        b.*,
        c.name as category_name,
        c.slug as category_slug,
        CASE
          WHEN u.name IS NOT NULL AND u.name != '' AND u.name NOT LIKE '%@%' THEN u.name
          WHEN a.name IS NOT NULL AND a.name != '' AND a.name NOT LIKE '%@%' THEN a.name
          WHEN b.author IS NOT NULL AND b.author != '' AND b.author NOT LIKE '%@%' THEN b.author
          ELSE COALESCE(u.name, a.name, b.author)
        END as author_name,
        COALESCE(a.slug, '') as author_slug,
        COALESCE(u.avatar, a.profile_photo) as author_photo,
        COALESCE(a.designation, u.department, 'Author & Contributor') as author_designation,
        COALESCE(u.bio, a.bio) as author_bio,
        COALESCE(u.linkedin_url, a.linkedin_url) as author_linkedin,
        COALESCE(u.linkedin_url, a.linkedin_url) as author_linkedin_url,
        COALESCE(u.twitter_url, a.twitter_url) as author_twitter,
        COALESCE(u.twitter_url, a.twitter_url) as author_twitter_url
      FROM blogs b
      LEFT JOIN categories c ON b.category_id = c.id
      LEFT JOIN authors a ON b.author_id = a.id
      LEFT JOIN users u ON u.id = IFNULL(b.created_by, a.user_id)
      ${whereCondition}
    `, [slug, idVal])
    
    if (blogs.length === 0) {
      return res.status(404).json({ success: false, message: 'Blog not found' })
    }

    const blog = {
      ...blogs[0],
      author_name: formatAuthorName(blogs[0].author_name || blogs[0].author),
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
