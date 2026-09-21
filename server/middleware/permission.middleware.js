import db from '../config/db.js'

export const checkPermission = (permissionName) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id
      
      // Super Admin and Admin have all permissions
      const [user] = await db.execute(
        'SELECT role FROM users WHERE id = ?',
        [userId]
      )
      
      if (user[0]?.role === 'super_admin' || user[0]?.role === 'admin') {
        return next()
      }

      // Check if user has the specific permission
      const [rows] = await db.execute(`
        SELECT COUNT(*) as count 
        FROM role_permissions rp
        JOIN roles r ON rp.role_id = r.id
        JOIN permissions p ON rp.permission_id = p.id
        JOIN user_roles ur ON r.id = ur.role_id
        WHERE ur.user_id = ? AND p.name = ?
      `, [userId, permissionName])
      
      if (rows[0].count === 0) {
        return res.status(403).json({ 
          success: false, 
          message: 'You do not have permission to perform this action' 
        })
      }

      next()
    } catch (error) {
      console.error('Permission check error:', error)
      res.status(500).json({ 
        success: false, 
        message: 'Error checking permissions' 
      })
    }
  }
}

export const hasAnyPermission = (permissionNames) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id
      
      // Super Admin and Admin have all permissions
      const [user] = await db.execute(
        'SELECT role FROM users WHERE id = ?',
        [userId]
      )
      
      if (user[0]?.role === 'super_admin' || user[0]?.role === 'admin') {
        return next()
      }

      // Check if user has any of the specified permissions
      const placeholders = permissionNames.map(() => '?').join(',')
      const [rows] = await db.execute(`
        SELECT COUNT(*) as count 
        FROM role_permissions rp
        JOIN roles r ON rp.role_id = r.id
        JOIN permissions p ON rp.permission_id = p.id
        JOIN user_roles ur ON r.id = ur.role_id
        WHERE ur.user_id = ? AND p.name IN (${placeholders})
      `, [userId, ...permissionNames])
      
      if (rows[0].count === 0) {
        return res.status(403).json({ 
          success: false, 
          message: 'You do not have permission to perform this action' 
        })
      }

      next()
    } catch (error) {
      console.error('Permission check error:', error)
      res.status(500).json({ 
        success: false, 
        message: 'Error checking permissions' 
      })
    }
  }
}
