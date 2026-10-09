import jwt from 'jsonwebtoken'
import 'dotenv/config'

if (process.env.NODE_ENV === 'production' && (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET)) {
  throw new Error('JWT_SECRET and JWT_REFRESH_SECRET must be set in production')
}

const JWT_SECRET = process.env.JWT_SECRET || 'tarajglobal_dev_only_jwt_secret'
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'tarajglobal_dev_only_jwt_refresh_secret'
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d'
const JWT_REFRESH_EXPIRE = process.env.JWT_REFRESH_EXPIRE || '30d'

export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  })
}

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET)
}

export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRE,
  })
}

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, JWT_REFRESH_SECRET)
}
