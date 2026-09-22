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

// Import middleware
import { errorHandler } from './middleware/error.middleware.js'

const app = express()

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
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

// Body parser middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Static files
app.use('/uploads', express.static('uploads'))

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/blog', blogRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/authors', authorRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/cms', cmsRoutes)
app.use('/api/footer', footerRoutes)
app.use('/api/career-gallery', careerGalleryRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

// Error handling middleware
app.use(errorHandler)

export default app
