import express from 'express'
import db from '../config/db.js'
import { authenticate, authorize } from '../middleware/auth.middleware.js'

const router = express.Router()

// @route   GET /api/career-gallery
// @desc    Get all career gallery events with their photos
// @access  Public
router.get('/', async (req, res) => {
  try {
    const [events] = await db.execute('SELECT * FROM career_events ORDER BY created_at ASC')
    const [photos] = await db.execute('SELECT * FROM career_event_photos ORDER BY created_at ASC')

    // Format events to match ALBUMS_DATA structure
    const albums = events.map((event, index) => {
      const eventPhotos = photos.filter(p => p.event_id === event.id)
      return {
        id: event.id,
        num: event.num || String(index + 1).padStart(2, '0'),
        title: event.title,
        tag: event.tag,
        category: event.category,
        quarter: event.quarter,
        desc: event.description,
        stats: `${eventPhotos.length} Captured Moments`,
        photoCount: eventPhotos.length,
        color: event.color || '#00A6FF',
        cover: eventPhotos.length > 0 ? eventPhotos[0].src : '/pk2.jpeg',
        src: eventPhotos.length > 0 ? eventPhotos[0].src : '/pk2.jpeg',
        photos: eventPhotos.map(p => ({
          id: p.id,
          src: p.src,
          title: p.title || '',
          caption: p.caption || '',
          tag: p.tag || '',
          date: p.date || ''
        }))
      }
    })

    res.json({ success: true, data: albums })
  } catch (error) {
    console.error('Error fetching career gallery:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   POST /api/career-gallery
// @desc    Create a new career event
// @access  Private/Admin
router.post('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { title, tag, category, quarter, description, color, num } = req.body
    
    if (!title) {
      return res.status(400).json({ success: false, message: 'Title is required' })
    }

    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4)
    
    // Auto-generate num if not provided
    let eventNum = num
    if (!eventNum) {
      const [rows] = await db.execute('SELECT COUNT(*) as count FROM career_events')
      eventNum = String(rows[0].count + 1).padStart(2, '0')
    }

    await db.execute(
      `INSERT INTO career_events (id, num, title, tag, category, quarter, description, color) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, eventNum, title, tag || 'Life at Taraj', category || 'Office Life', quarter || '', description || '', color || '#00A6FF']
    )

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: { id, num: eventNum, title, tag, category, quarter, description, color }
    })
  } catch (error) {
    console.error('Error creating career event:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   PUT /api/career-gallery/:id
// @desc    Update a career event
// @access  Private/Admin
router.put('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params
    const { title, tag, category, quarter, description, color } = req.body
    
    if (!title) {
      return res.status(400).json({ success: false, message: 'Title is required' })
    }

    const [result] = await db.execute(
      `UPDATE career_events SET title = ?, tag = ?, category = ?, quarter = ?, description = ?, color = ? WHERE id = ?`,
      [title, tag || '', category || '', quarter || '', description || '', color || '#00A6FF', id]
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Event not found' })
    }

    res.json({
      success: true,
      message: 'Event updated successfully'
    })
  } catch (error) {
    console.error('Error updating career event:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   POST /api/career-gallery/:id/photos
// @desc    Add photos to a career event
// @access  Private/Admin
router.post('/:id/photos', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params
    const { photos } = req.body // array of { src, title, caption, tag, date }

    if (!photos || !Array.isArray(photos) || photos.length === 0) {
      return res.status(400).json({ success: false, message: 'Photos array is required' })
    }

    const [events] = await db.execute('SELECT * FROM career_events WHERE id = ?', [id])
    if (events.length === 0) {
      return res.status(404).json({ success: false, message: 'Event not found' })
    }

    const insertPromises = photos.map(photo => {
      const photoId = 'photo-' + Date.now() + '-' + Math.round(Math.random() * 1000)
      return db.execute(
        `INSERT INTO career_event_photos (id, event_id, src, title, caption, tag, date) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [photoId, id, photo.src, photo.title || '', photo.caption || '', photo.tag || '', photo.date || '']
      )
    })

    await Promise.all(insertPromises)

    res.status(201).json({
      success: true,
      message: `${photos.length} photos added successfully`
    })
  } catch (error) {
    console.error('Error adding photos:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   DELETE /api/career-gallery/:id
// @desc    Delete a career event and its photos
// @access  Private/Admin
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params

    const [result] = await db.execute('DELETE FROM career_events WHERE id = ?', [id])
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Event not found' })
    }

    res.json({ success: true, message: 'Event deleted successfully' })
  } catch (error) {
    console.error('Error deleting event:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   PUT /api/career-gallery/photos/:id
// @desc    Update a single photo
// @access  Private/Admin
router.put('/photos/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params
    const { title, caption, tag } = req.body

    const [result] = await db.execute(
      'UPDATE career_event_photos SET title = ?, caption = ?, tag = ? WHERE id = ?',
      [title || '', caption || '', tag || '', id]
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Photo not found' })
    }

    res.json({ success: true, message: 'Photo updated successfully' })
  } catch (error) {
    console.error('Error updating photo:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   DELETE /api/career-gallery/photos/:id
// @desc    Delete a single photo
// @access  Private/Admin
router.delete('/photos/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params

    const [result] = await db.execute('DELETE FROM career_event_photos WHERE id = ?', [id])
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Photo not found' })
    }

    res.json({ success: true, message: 'Photo deleted successfully' })
  } catch (error) {
    console.error('Error deleting photo:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
