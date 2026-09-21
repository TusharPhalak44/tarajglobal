import db from '../../config/db.js'
import { sendNewApplicationNotification } from '../../services/email.service.js'

const applicationController = {
  // Get all applications with filtering and pagination
  getAllApplications: async (req, res) => {
    try {
      const { status, job_id, search, page = 1, limit = 20 } = req.query
      const offset = (page - 1) * limit

      let whereClause = 'WHERE 1=1'
      const params = []

      if (status) {
        whereClause += ' AND status = ?'
        params.push(status)
      }

      if (job_id) {
        whereClause += ' AND (job_title = ? OR job_title IN (SELECT title FROM careers WHERE id = ?))'
        params.push(job_id, job_id)
      }

      if (search) {
        whereClause += ' AND (first_name LIKE ? OR last_name LIKE ? OR email LIKE ?)'
        const searchTerm = `%${search}%`
        params.push(searchTerm, searchTerm, searchTerm)
      }

      const [applications] = await db.execute(`
        SELECT *
        FROM job_applications
        ${whereClause}
        ORDER BY applied_at DESC
        LIMIT ? OFFSET ?
      `, [...params, parseInt(limit), offset])

      const [countResult] = await db.execute(`SELECT COUNT(*) as total FROM job_applications ${whereClause}`, params)

      res.json({
        success: true,
        data: {
          applications,
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total: countResult[0].total,
            totalPages: Math.ceil(countResult[0].total / limit)
          }
        }
      })
    } catch (error) {
      console.error('Get applications error:', error)
      res.status(500).json({ success: false, message: error.message })
    }
  },

  // Get application by ID
  getApplicationById: async (req, res) => {
    try {
      const { id } = req.params

      const [applications] = await db.execute(`
        SELECT * FROM job_applications WHERE id = ?
      `, [id])

      if (applications.length === 0) {
        return res.status(404).json({ success: false, message: 'Application not found' })
      }

      res.json({ success: true, data: applications[0] })
    } catch (error) {
      console.error('Get application by ID error:', error)
      res.status(500).json({ success: false, message: error.message })
    }
  },

  // Delete application
  deleteApplication: async (req, res) => {
    try {
      const { id } = req.params

      const [result] = await db.execute(
        'DELETE FROM job_applications WHERE id = ?',
        [id]
      )

      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Application not found' })
      }

      res.json({ success: true, message: 'Application deleted successfully' })
    } catch (error) {
      console.error('Delete application error:', error)
      res.status(500).json({ success: false, message: error.message })
    }
  },

  // Update application status
  updateApplicationStatus: async (req, res) => {
    try {
      const { id } = req.params
      const { status } = req.body

      await db.execute(
        'UPDATE job_applications SET status = ? WHERE id = ?',
        [status, id]
      )

      res.json({ success: true, message: 'Application status updated successfully' })
    } catch (error) {
      console.error('Update application status error:', error)
      res.status(500).json({ success: false, message: error.message })
    }
  },

  // Add note to application
  addApplicationNote: async (req, res) => {
    try {
      const { id } = req.params
      const { note } = req.body

      // Check if notes column exists
      const [columns] = await db.execute(`
        SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_NAME = 'job_applications' AND COLUMN_NAME = 'notes'
      `)

      // Add notes column if it doesn't exist
      if (columns.length === 0) {
        try {
          await db.execute(`ALTER TABLE job_applications ADD COLUMN notes TEXT`)
          console.log('Added notes column to job_applications table')
        } catch (alterError) {
          console.log('Could not add notes column:', alterError.message)
        }
      }

      // Update the notes field (append new note)
      const [applications] = await db.execute(`
        SELECT notes FROM job_applications WHERE id = ?
      `, [id])

      if (applications.length === 0) {
        return res.status(404).json({ success: false, message: 'Application not found' })
      }

      const existingNotes = applications[0].notes || ''
      const timestamp = new Date().toISOString()
      const newNoteEntry = `[${timestamp}] ${note}`
      const updatedNotes = existingNotes ? `${existingNotes}\n\n${newNoteEntry}` : newNoteEntry

      await db.execute(
        'UPDATE job_applications SET notes = ? WHERE id = ?',
        [updatedNotes, id]
      )

      res.json({ success: true, message: 'Note added successfully' })
    } catch (error) {
      console.error('Add application note error:', error)
      res.status(500).json({ success: false, message: error.message })
    }
  },

  // Bulk action on applications
  bulkApplicationAction: async (req, res) => {
    try {
      const { ids, action } = req.body

      if (action === 'delete') {
        await db.execute(
          `DELETE FROM job_applications WHERE id IN (${ids.map(() => '?').join(',')})`,
          ids
        )
      } else if (action === 'status') {
        const { status } = req.body
        await db.execute(
          `UPDATE job_applications SET status = ? WHERE id IN (${ids.map(() => '?').join(',')})`,
          [status, ...ids]
        )
      }

      res.json({ success: true, message: 'Bulk action completed' })
    } catch (error) {
      console.error('Bulk application action error:', error)
      res.status(500).json({ success: false, message: error.message })
    }
  }
}

export default applicationController
