import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import 'dotenv/config'

// Import routes
import authRoutes from './routes/auth.routes.js'
import serviceRoutes from './routes/service.routes.js'
import blogRoutes from './routes/blog.routes.js'
import jobRoutes from './routes/job.routes.js'
import categoryRoutes from './routes/category.routes.js'
import authorRoutes from './routes/author.routes.js'
import contactRoutes from './routes/contact.routes.js'
import uploadRoutes from './routes/upload.routes.js'
import adminRoutes from './routes/admin.routes.js'
import cmsRoutes from './routes/cms.routes.js'
import footerRoutes from './routes/footer.routes.js'
import careerGalleryRoutes from './routes/career_gallery.routes.js'
import analyticsRoutes from './routes/analytics.routes.js'
import seoRoutes from './routes/seo.routes.js'

// Import middleware
import { errorHandler } from './middleware/error.middleware.js'

const app = express()

// Trust proxy — required for rate limiters to work correctly behind Nginx/Apache
// Without this, all requests look like they come from the proxy IP, not the real client
app.set('trust proxy', 1)

// Security middleware — comprehensive HTTP security headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://www.googletagmanager.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      connectSrc: ["'self'"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
    },
  },
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
  noSniff: true,
  frameguard: { action: 'deny' },
  xssFilter: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
}))

// CORS configuration — allow all localhost ports in development
const isDev = process.env.NODE_ENV !== 'production'
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [process.env.CLIENT_URL]
  : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003', 'http://127.0.0.1:3000', 'http://127.0.0.1:3001', 'http://127.0.0.1:3002']

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman) or in development
    if (!origin || isDev) return callback(null, true)
    if (allowedOrigins.includes(origin)) return callback(null, true)
    return callback(null, false)
  },
  credentials: true,
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isDev ? 10000 : 100, // relaxed limit in development
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  }
})
app.use('/api/', limiter)

// Strict rate limiter for login — prevents brute-force attacks
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // only 10 login attempts per 15 min per IP
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // don't count successful logins
  message: {
    success: false,
    message: 'Too many login attempts. Please try again in 15 minutes.'
  }
})

// Strict rate limiter for public forms — prevents spam
const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: isDev ? 1000 : 10, // 10 form submissions per IP per hour
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many submissions from this IP. Please try again in an hour.'
  }
})

// Analytics rate limiter — prevents data flooding
const analyticsLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: isDev ? 10000 : 60, // 60 tracking calls per minute per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Rate limit exceeded.' }
})

// Body parser middleware
// Limit to 1mb for public routes to prevent ReDoS/DoS via large payloads
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true, limit: '1mb' }))

// Static files
app.use('/uploads', express.static('uploads'))

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/blog', blogRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/authors', authorRoutes)
app.use('/api/contact', formLimiter, contactRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/cms', cmsRoutes)
app.use('/api/footer', footerRoutes)
app.use('/api/career-gallery', careerGalleryRoutes)
app.use('/api/analytics', analyticsLimiter, analyticsRoutes)
app.use('/api/seo', seoRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

// Error handling middleware
app.use(errorHandler)

export default app
