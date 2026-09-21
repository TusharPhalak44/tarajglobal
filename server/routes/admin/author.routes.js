import express from 'express'
import { body } from 'express-validator'
import { validate } from '../../middleware/validation.middleware.js'
import { checkPermission } from '../../middleware/permission.middleware.js'
import db from '../../config/db.js'

const router = express.Router()

// @route   GET /api/admin/authors
// @desc    Get all authors
// @access  Private
router.get('/', checkPermission('blog.create'), async (req, res) => {
  try {
    const [authors] = await db.execute(`
      SELECT a.*, 
        (SELECT COUNT(*) FROM blogs WHERE author_id = a.id) as post_count
      FROM authors a
      ORDER BY a.name ASC
    `)
    res.json({ success: true, data: authors })
  } catch (error) {
    console.error('Get authors error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   POST /api/admin/authors
// @desc    Create author
// @access  Private
router.post('/', [
  checkPermission('blog.create'),
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').optional().isEmail()
], validate, async (req, res) => {
  try {
    const { name, profile_photo, designation, bio, linkedin_url, email, twitter_url, github_url } = req.body
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    
    const [result] = await db.execute(
      'INSERT INTO authors (name, slug, profile_photo, designation, bio, linkedin_url, email, twitter_url, github_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, slug, profile_photo, designation, bio, linkedin_url, email, twitter_url, github_url]
    )
    
    res.status(201).json({ success: true, data: { id: result.insertId, slug } })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   PUT /api/admin/authors/:id
// @desc    Update author
// @access  Private
router.put('/:id', [
  checkPermission('blog.create'),
  body('name').optional().trim().notEmpty()
], validate, async (req, res) => {
  try {
    const { id } = req.params
    const { name, profile_photo, designation, bio, linkedin_url, email, twitter_url, github_url, status } = req.body
    
    await db.execute(
      'UPDATE authors SET name = COALESCE(?, name), profile_photo = COALESCE(?, profile_photo), designation = COALESCE(?, designation), bio = COALESCE(?, bio), linkedin_url = COALESCE(?, linkedin_url), email = COALESCE(?, email), twitter_url = COALESCE(?, twitter_url), github_url = COALESCE(?, github_url), status = COALESCE(?, status) WHERE id = ?',
      [name, profile_photo, designation, bio, linkedin_url, email, twitter_url, github_url, status, id]
    )
    
    res.json({ success: true, message: 'Author updated successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   DELETE /api/admin/authors/:id
// @desc    Delete author
// @access  Private
router.delete('/:id', checkPermission('blog.delete'), async (req, res) => {
  try {
    await db.execute('DELETE FROM authors WHERE id = ?', [req.params.id])
    res.json({ success: true, message: 'Author deleted successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
