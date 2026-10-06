import express from 'express'
import { body } from 'express-validator'
import { validate } from '../../middleware/validation.middleware.js'
import { checkPermission } from '../../middleware/permission.middleware.js'
import db from '../../config/db.js'

const router = express.Router()

// --- Specific Routes ---

// @route   GET /api/admin/seo/redirects/all
router.get('/redirects/all', checkPermission('blog.edit'), async (req, res) => {
  try {
    const [redirects] = await db.execute('SELECT * FROM seo_redirects ORDER BY id DESC');
    res.json({ success: true, data: redirects });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   POST /api/admin/seo/redirects/save
router.post('/redirects/save', checkPermission('blog.edit'), async (req, res) => {
  try {
    const { id, old_url, new_url, redirect_type, status } = req.body;
    if (id) {
      await db.execute('UPDATE seo_redirects SET old_url=?, new_url=?, redirect_type=?, status=? WHERE id=?', [old_url, new_url, redirect_type || 301, status || 'active', id]);
    } else {
      await db.execute('INSERT INTO seo_redirects (old_url, new_url, redirect_type, status) VALUES (?, ?, ?, ?)', [old_url, new_url, redirect_type || 301, status || 'active']);
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/admin/seo/redirects/:id
router.delete('/redirects/:id', checkPermission('blog.edit'), async (req, res) => {
  try {
    await db.execute('DELETE FROM seo_redirects WHERE id=?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/admin/seo/logs/404
router.get('/logs/404', checkPermission('blog.edit'), async (req, res) => {
  try {
    const [logs] = await db.execute('SELECT * FROM seo_404_logs ORDER BY last_detected DESC');
    res.json({ success: true, data: logs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/admin/seo/settings/global
router.get('/settings/global', checkPermission('blog.edit'), async (req, res) => {
  try {
    const [settings] = await db.execute('SELECT * FROM seo_global_settings');
    res.json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   POST /api/admin/seo/settings/global
router.post('/settings/global', checkPermission('blog.edit'), async (req, res) => {
  try {
    const { setting_key, setting_value } = req.body;
    const [existing] = await db.execute('SELECT id FROM seo_global_settings WHERE setting_key = ?', [setting_key]);
    if (existing.length > 0) {
      await db.execute('UPDATE seo_global_settings SET setting_value = ? WHERE id = ?', [setting_value, existing[0].id]);
    } else {
      await db.execute('INSERT INTO seo_global_settings (setting_key, setting_value) VALUES (?, ?)', [setting_key, setting_value]);
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// --- Parameterized Routes ---

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
    res.status(500).json({ success: false, message: 'Internal server error' })
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
  body('canonical_url').optional({ nullable: true, checkFalsy: true }).isURL(),
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
      twitter_image = null,
      robots = null,
      structured_data = null
    } = req.body

    const clean = (val) => val === undefined ? null : val;
    const clean_meta_title = clean(meta_title);
    const clean_meta_description = clean(meta_description);
    const clean_meta_keywords = clean(meta_keywords);
    const clean_canonical_url = clean(canonical_url);
    const clean_og_title = clean(og_title);
    const clean_og_description = clean(og_description);
    const clean_og_image = clean(og_image);
    const clean_twitter_title = clean(twitter_title);
    const clean_twitter_description = clean(twitter_description);
    const clean_twitter_image = clean(twitter_image);
    const clean_robots = clean(robots);

    // Check if SEO data exists
    const [existing] = await db.execute(
      'SELECT id FROM seo_metadata WHERE entity_type = ? AND entity_id = ?',
      [entityType, entityId]
    )

    if (existing.length > 0) {
      // Update existing
      await db.execute(`
        UPDATE seo_metadata 
        SET meta_title = ?,
            meta_description = ?,
            meta_keywords = ?,
            canonical_url = ?,
            og_title = ?,
            og_description = ?,
            og_image = ?,
            twitter_title = ?,
            twitter_description = ?,
            twitter_image = ?,
            robots = ?,
            structured_data = ?,
            updated_at = NOW()
        WHERE id = ?
      `, [
        clean_meta_title, clean_meta_description, clean_meta_keywords, clean_canonical_url,
        clean_og_title, clean_og_description, clean_og_image,
        clean_twitter_title, clean_twitter_description, clean_twitter_image,
        clean_robots, structured_data ? JSON.stringify(structured_data) : null,
        existing[0].id
      ])
    } else {
      // Create new
      await db.execute(`
        INSERT INTO seo_metadata 
        (entity_type, entity_id, meta_title, meta_description, meta_keywords, canonical_url, og_title, og_description, og_image, twitter_title, twitter_description, twitter_image, robots, structured_data)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        entityType, entityId, clean_meta_title, clean_meta_description, clean_meta_keywords, clean_canonical_url,
        clean_og_title, clean_og_description, clean_og_image,
        clean_twitter_title, clean_twitter_description, clean_twitter_image,
        clean_robots, structured_data ? JSON.stringify(structured_data) : null
      ])
    }

    res.json({ success: true, message: 'SEO metadata saved successfully' })
  } catch (error) {
    import('fs').then(fs => fs.writeFileSync('error_log.txt', error.stack || error.toString()));
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' })
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
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

export default router
