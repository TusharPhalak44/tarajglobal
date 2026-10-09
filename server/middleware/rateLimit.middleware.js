import rateLimit from 'express-rate-limit'

const isDev = process.env.NODE_ENV !== 'production'

const build = (windowMs, max, message) => rateLimit({
  windowMs,
  max: isDev ? Math.max(max * 100, 1000) : max,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message },
})

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isDev ? 10000 : 600,
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.path.startsWith('/chat/poll') || req.path.startsWith('/analytics'),
  message: { success: false, message: 'Too many requests from this IP, please try again later.' },
})

export const formLimiter = build(60 * 60 * 1000, 10, 'Too many submissions from this IP. Please try again in an hour.')

export const chatWriteLimiter = build(60 * 1000, 20, 'You are sending messages too quickly. Please slow down.')

export const chatPollLimiter = build(60 * 1000, 40, 'Rate limit exceeded.')

export const analyticsLimiter = build(60 * 1000, 60, 'Rate limit exceeded.')
