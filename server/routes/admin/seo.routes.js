import express from 'express'
import { body } from 'express-validator'
import { validate } from '../../middleware/validation.middleware.js'
import { checkPermission } from '../../middleware/permission.middleware.js'
import db from '../../config/db.js'

const router = express.Router()

// @route   GET /api/admin/seo/:entityType/:entityId
// @desc    Get SEO metadata for an entity
// @access  Private
router.get('/:entityType/:entityId', checkPermission('blog.edit'), async (req, res) => {
  try {
    const { entityType, entityId } = req.params

    const [seoData] = await db.execute(
      'SELECT * FROM seo_metadata WHERE entity_type = ? AND entity_id = ?',
      [entityType, entityId]
    )

    if (seoData.length === 0) {
      return res.json({ success: true, data: null })
    }

    res.json({ success: true, data: seoData[0] })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   POST /api/admin/seo/:entityType/:entityId
// @desc    Create or update SEO metadata
// @access  Private
router.post('/:entityType/:entityId', [
  checkPermission('blog.edit'),
  body('meta_title').optional().trim(),
  body('meta_description').optional(),
  body('meta_keywords').optional(),
  body('canonical_url').optional().isURL(),
  body('og_title').optional().trim(),
  body('og_description').optional(),
  body('og_image').optional(),
  body('twitter_title').optional().trim(),
  body('twitter_description').optional(),
  body('twitter_image').optional(),
  body('robots').optional(),
  body('structured_data').optional()
], validate, async (req, res) => {
  try {
    const { entityType, entityId } = req.params
    const {
      meta_title,
      meta_description,
      meta_keywords,
      canonical_url,
      og_title,
      og_description,
      og_image,
      twitter_title,
      twitter_description,
      twitter_image,
      robots,
      structured_data
    } = req.body

    // Check if SEO data exists
    const [existing] = await db.execute(
      'SELECT id FROM seo_metadata WHERE entity_type = ? AND entity_id = ?',
      [entityType, entityId]
    )

    if (existing.length > 0) {
      // Update existing
      await db.execute(`
        UPDATE seo_metadata 
        SET meta_title = COALESCE(?, meta_title),
            meta_description = COALESCE(?, meta_description),
            meta_keywords = COALESCE(?, meta_keywords),
            canonical_url = COALESCE(?, canonical_url),
            og_title = COALESCE(?, og_title),
            og_description = COALESCE(?, og_description),
            og_image = COALESCE(?, og_image),
            twitter_title = COALESCE(?, twitter_title),
            twitter_description = COALESCE(?, twitter_description),
            twitter_image = COALESCE(?, twitter_image),
            robots = COALESCE(?, robots),
            structured_data = COALESCE(?, structured_data),
            updated_at = NOW()
        WHERE id = ?
      `, [
        meta_title, meta_description, meta_keywords, canonical_url,
        og_title, og_description, og_image,
        twitter_title, twitter_description, twitter_image,
        robots, structured_data ? JSON.stringify(structured_data) : null,
        existing[0].id
      ])
    } else {
      // Create new
      await db.execute(`
        INSERT INTO seo_metadata 
        (entity_type, entity_id, meta_title, meta_description, meta_keywords, canonical_url, og_title, og_description, og_image, twitter_title, twitter_description, twitter_image, robots, structured_data)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        entityType, entityId, meta_title, meta_description, meta_keywords, canonical_url,
        og_title, og_description, og_image,
        twitter_title, twitter_description, twitter_image,
        robots, structured_data ? JSON.stringify(structured_data) : null
      ])
    }

    res.json({ success: true, message: 'SEO metadata saved successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   DELETE /api/admin/seo/:entityType/:entityId
// @desc    Delete SEO metadata
// @access  Private
router.delete('/:entityType/:entityId', checkPermission('blog.edit'), async (req, res) => {
  try {
    const { entityType, entityId } = req.params

    await db.execute(
      'DELETE FROM seo_metadata WHERE entity_type = ? AND entity_id = ?',
      [entityType, entityId]
    )

    res.json({ success: true, message: 'SEO metadata deleted successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
