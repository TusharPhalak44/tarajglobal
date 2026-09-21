import jwt from 'jsonwebtoken'
import 'dotenv/config'

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your_refresh_secret_key'
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d'
const JWT_REFRESH_EXPIRE = process.env.JWT_REFRESH_EXPIRE || '30d'

export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE })
}

export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRE })
}

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET)
}

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, JWT_REFRESH_SECRET)
}
