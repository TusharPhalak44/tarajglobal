import express from 'express'
import { authenticate } from '../middleware/auth.middleware.js'
import { checkPermission, hasAnyPermission } from '../middleware/permission.middleware.js'

const router = express.Router()

// All admin routes require authentication
router.use(authenticate)

// Import sub-routes
import blogRoutes from './admin/blog.routes.js'
import categoryRoutes from './admin/category.routes.js'
import tagRoutes from './admin/tag.routes.js'
import authorRoutes from './admin/author.routes.js'
import mediaRoutes from './admin/media.routes.js'
import jobRoutes from './admin/job.routes.js'
import applicationRoutes from './admin/application.routes.js'
import userRoutes from './admin/user.routes.js'
import leadRoutes from './admin/lead.routes.js'
import notificationRoutes from './admin/notification.routes.js'
import auditLogRoutes from './admin/auditLog.routes.js'
import analyticsRoutes from './admin/analytics.routes.js'
import settingsRoutes from './admin/settings.routes.js'
import seoRoutes from './admin/seo.routes.js'
import cmsRoutes from './admin/cms.routes.js'
import footerRoutes from './admin/footer.routes.js'
import meetingRoutes from './admin/meeting.routes.js'

// Mount sub-routes
router.use('/blogs', blogRoutes)
router.use('/categories', categoryRoutes)
router.use('/tags', tagRoutes)
router.use('/authors', authorRoutes)
router.use('/media', mediaRoutes)
router.use('/jobs', jobRoutes)
router.use('/applications', applicationRoutes)
router.use('/users', userRoutes)
router.use('/leads', leadRoutes)
router.use('/meetings', meetingRoutes)
router.use('/notifications', notificationRoutes)
router.use('/audit-logs', auditLogRoutes)
router.use('/analytics', analyticsRoutes)
router.use('/settings', settingsRoutes)
router.use('/seo', seoRoutes)
router.use('/cms', cmsRoutes)
router.use('/footer', footerRoutes)

export default router
