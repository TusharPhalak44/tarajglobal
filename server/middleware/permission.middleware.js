import db from '../config/db.js'

export const checkPermission = (permissionName) => {
  return async (req, res, next) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required'
        })
      }

      const userId = req.user.id
      
      const [userRows] = await db.execute(
        'SELECT role FROM users WHERE id = ?',
        [userId]
      )
      
      if (userRows.length === 0 || !userRows[0]?.role) {
        return res.status(403).json({ 
          success: false, 
          message: 'User role not found or you do not have permission' 
        })
      }

      const role = userRows[0].role

      // Super Admin, Admin, and management roles have full access
      if (['super_admin', 'admin', 'editor', 'content_manager', 'hr_recruiter'].includes(role)) {
        return next()
      }

      // Standard user role permissions
      if (role === 'user') {
        const allowedPermissions = [
          'blog.create', 'blog.edit', 'blog.view', 
          'media.upload', 'media.view', 
          'job.view', 'job.create', 'job.edit',
          'cms.view', 'analytics.view'
        ]
        if (allowedPermissions.includes(permissionName)) {
          return next()
        }
        return res.status(403).json({ 
          success: false, 
          message: 'Access denied. Standard users only have permission to access allowed resources.' 
        })
      }

      // Fallback for any unhandled role
      return res.status(403).json({
        success: false,
        message: 'Access denied. Insufficient permissions.'
      })
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
      if (!req.user || !req.user.id) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required'
        })
      }

      const userId = req.user.id
      
      const [userRows] = await db.execute(
        'SELECT role FROM users WHERE id = ?',
        [userId]
      )
      
      if (userRows.length === 0 || !userRows[0]?.role) {
        return res.status(403).json({ 
          success: false, 
          message: 'User role not found or you do not have permission' 
        })
      }

      const role = userRows[0].role

      // Super Admin, Admin, and management roles have full access
      if (['super_admin', 'admin', 'editor', 'content_manager', 'hr_recruiter'].includes(role)) {
        return next()
      }

      // Standard user role permissions
      if (role === 'user') {
        const allowedPermissions = [
          'blog.create', 'blog.edit', 'blog.view', 
          'media.upload', 'media.view', 
          'job.view', 'job.create', 'job.edit',
          'cms.view', 'analytics.view'
        ]
        const hasMatch = permissionNames.some(p => allowedPermissions.includes(p))
        if (hasMatch) {
          return next()
        }
        return res.status(403).json({ 
          success: false, 
          message: 'Access denied. Standard users only have permission to access allowed resources.' 
        })
      }

      // Fallback for any unhandled role
      return res.status(403).json({
        success: false,
        message: 'Access denied. Insufficient permissions.'
      })
    } catch (error) {
      console.error('Permission check error:', error)
      res.status(500).json({ 
        success: false, 
        message: 'Error checking permissions' 
      })
    }
  }
}
