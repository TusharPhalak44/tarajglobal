import express from 'express'
import { checkPermission } from '../../middleware/permission.middleware.js'
import db from '../../config/db.js'

const router = express.Router()

// @route   GET /api/admin/settings
// @desc    Get all settings
// @access  Private
router.get('/', checkPermission('settings.manage'), async (req, res) => {
  try {
    const [settings] = await db.execute('SELECT * FROM settings ORDER BY key_name')
    
    const settingsObj = {}
    settings.forEach(setting => {
      settingsObj[setting.key_name] = setting.value
    })
    
    res.json({ success: true, data: settingsObj })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   PUT /api/admin/settings
// @desc    Update settings
// @access  Private
router.put('/', checkPermission('settings.manage'), async (req, res) => {
  try {
    const settings = req.body
    
    for (const [key, value] of Object.entries(settings)) {
      await db.execute(
        'INSERT INTO settings (key_name, value, updated_by) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE value = ?, updated_by = ?',
        [key, value, req.user?.id || 1, value, req.user?.id || 1]
      )
    }
    
    res.json({ success: true, message: 'Settings updated successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
