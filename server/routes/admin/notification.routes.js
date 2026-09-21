import express from 'express'
import { checkPermission } from '../../middleware/permission.middleware.js'
import db from '../../config/db.js'

const router = express.Router()

// @route   GET /api/admin/notifications
// @desc    Get user notifications
// @access  Private
router.get('/', async (req, res) => {
  try {
    const { unread_only = false } = req.query
    
    let whereClause = 'WHERE user_id = ?'
    const params = [req.user.id]
    
    if (unread_only === 'true') {
      whereClause += ' AND is_read = false'
    }
    
    const [notifications] = await db.execute(`
      SELECT * FROM notifications
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT 50
    `, params)
    
    // Get unread count
    const [countResult] = await db.execute(
      'SELECT COUNT(*) as count FROM notifications WHERE user_id = ? AND is_read = false',
      [req.user.id]
    )
    
    res.json({
      success: true,
      data: {
        notifications,
        unread_count: countResult[0].count
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   PATCH /api/admin/notifications/:id/read
// @desc    Mark notification as read
// @access  Private
router.patch('/:id/read', async (req, res) => {
  try {
    await db.execute(
      'UPDATE notifications SET is_read = true WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    )
    
    res.json({ success: true, message: 'Notification marked as read' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   PATCH /api/admin/notifications/read-all
// @desc    Mark all notifications as read
// @access  Private
router.patch('/read-all', async (req, res) => {
  try {
    await db.execute(
      'UPDATE notifications SET is_read = true WHERE user_id = ?',
      [req.user.id]
    )
    
    res.json({ success: true, message: 'All notifications marked as read' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   DELETE /api/admin/notifications/:id
// @desc    Delete notification
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    await db.execute(
      'DELETE FROM notifications WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    )
    
    res.json({ success: true, message: 'Notification deleted' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
