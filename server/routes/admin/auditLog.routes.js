import express from 'express'
import { checkPermission } from '../../middleware/permission.middleware.js'
import db from '../../config/db.js'

const router = express.Router()

// @route   GET /api/admin/audit-logs
// @desc    Get audit logs
// @access  Private
router.get('/', checkPermission('user.create'), async (req, res) => {
  try {
    const { user_id, action, module, page = 1, limit = 50 } = req.query
    const limitNum = parseInt(limit) || 50
    const pageNum = parseInt(page) || 1
    const offset = (pageNum - 1) * limitNum
    
    let whereClause = 'WHERE 1=1'
    const params = []
    
    if (user_id) {
      whereClause += ' AND user_id = ?'
      params.push(user_id)
    }
    
    if (action) {
      whereClause += ' AND action = ?'
      params.push(action)
    }
    
    if (module) {
      whereClause += ' AND module = ?'
      params.push(module)
    }
    
    const [logs] = await db.query(`
      SELECT al.*, u.name as user_name, u.email as user_email
      FROM audit_logs al
      LEFT JOIN users u ON al.user_id = u.id
      ${whereClause}
      ORDER BY al.created_at DESC
      LIMIT ? OFFSET ?
    `, [...params, limitNum, offset])
    
    const [countResult] = await db.execute(`SELECT COUNT(*) as total FROM audit_logs al ${whereClause}`, params)
    
    res.json({
      success: true,
      data: {
        logs,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total: countResult[0].total,
          totalPages: Math.ceil(countResult[0].total / limitNum)
        }
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

export default router
