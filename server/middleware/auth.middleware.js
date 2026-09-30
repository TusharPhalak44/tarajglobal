import { verifyToken } from '../utils/jwt.js'
import { isTokenBlacklisted } from '../utils/tokenBlacklist.js'

export const authenticate = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. No token provided.' 
      })
    }

    // Check if token has been blacklisted (e.g. after logout)
    if (isTokenBlacklisted(token)) {
      return res.status(401).json({
        success: false,
        message: 'Session has been invalidated. Please log in again.'
      })
    }

    const decoded = verifyToken(token)
    req.user = decoded
    req.token = token // store for use in logout
    next()
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      message: 'Invalid token.' 
    })
  }
}

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to access this route' 
      })
    }
    next()
  }
}
