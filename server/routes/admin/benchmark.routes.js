import express from 'express'
import benchmarkService from '../../services/benchmark.service.js'
import { checkPermission } from '../../middleware/permission.middleware.js'

const router = express.Router()

// @route   GET /api/admin/benchmark/status
// @desc    Get Benchmark Email integration status and account summary
// @access  Private (Admin / Settings)
router.get('/status', checkPermission('settings.manage'), async (req, res) => {
  try {
    const status = await benchmarkService.testConnection()
    res.json({
      success: true,
      data: status
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to check Benchmark Email status'
    })
  }
})

// @route   GET /api/admin/benchmark/lists
// @desc    Get contact lists from Benchmark Email
// @access  Private (Admin / Settings)
router.get('/lists', checkPermission('settings.manage'), async (req, res) => {
  try {
    const result = await benchmarkService.getContactLists()
    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch Benchmark lists'
    })
  }
})

// @route   POST /api/admin/benchmark/test
// @desc    Test adding a sample contact or testing connection
// @access  Private (Admin / Settings)
router.post('/test', checkPermission('settings.manage'), async (req, res) => {
  try {
    const { email = 'test.admin@tarajglobal.com', firstName = 'Admin', lastName = 'Test' } = req.body
    const result = await benchmarkService.syncLead({
      email,
      firstName,
      lastName,
      source: 'Admin Diagnostics'
    })
    res.json({
      success: result.success,
      data: result
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Benchmark test failed'
    })
  }
})

export default router
