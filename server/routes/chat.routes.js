import express from 'express'
import chatController from '../controllers/chat.controller.js'
import { authenticate, authorize } from '../middleware/auth.middleware.js'

const router = express.Router()

// Public Chatbot Endpoints
router.post('/session', chatController.createSession)
router.post('/message', chatController.sendMessage)
router.get('/poll', chatController.pollMessages)

// Admin Live Chat Console Endpoints
router.get('/admin/sessions', authenticate, authorize('admin'), chatController.getAdminSessions)
router.get('/admin/sessions/:id/messages', authenticate, authorize('admin'), chatController.getAdminSessionMessages)
router.post('/admin/sessions/:id/messages', authenticate, authorize('admin'), chatController.sendAdminMessage)
router.patch('/admin/sessions/:id/status', authenticate, authorize('admin'), chatController.updateSessionStatus)

export default router
