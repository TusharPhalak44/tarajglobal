import db from '../config/db.js'

/**
 * Notification helper functions
 * Used to create notifications for various events
 */

/**
 * Create a notification for a user
 * @param {Object} notificationData - Notification data
 * @param {number} notificationData.user_id - User ID to notify
 * @param {string} notificationData.title - Notification title
 * @param {string} notificationData.message - Notification message
 * @param {string} notificationData.type - Notification type (info, success, warning, error)
 * @param {string} notificationData.action_url - Optional URL to navigate to
 * @param {string} notificationData.entity_type - Optional entity type
 * @param {number} notificationData.entity_id - Optional entity ID
 */
const createNotification = async (notificationData) => {
  try {
    const {
      user_id,
      title,
      message,
      type = 'info',
      action_url = null,
      entity_type = null,
      entity_id = null
    } = notificationData

    const insertQuery = `
      INSERT INTO notifications (
        user_id,
        title,
        message,
        type,
        action_url,
        entity_type,
        entity_id,
        is_read,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 0, NOW())
    `

    const [result] = await db.execute(insertQuery, [
      user_id,
      title,
      message,
      type,
      action_url,
      entity_type,
      entity_id
    ])

    return result.insertId
  } catch (error) {
    console.error('Error creating notification:', error)
    throw error
  }
}

/**
 * Notify all admins
 * @param {Object} notificationData - Notification data (without user_id)
 */
const notifyAdmins = async (notificationData) => {
  try {
    // Get all admin users
    const [users] = await db.execute(
      'SELECT id FROM users WHERE role IN (?, ?, ?)',
      ['admin', 'super_admin', 'content_manager']
    )

    // Create notification for each admin
    for (const user of users) {
      await createNotification({
        ...notificationData,
        user_id: user.id
      })
    }

    return users.length
  } catch (error) {
    console.error('Error notifying admins:', error)
    throw error
  }
}

/**
 * Notify specific users by role
 * @param {string[]} roles - Array of roles to notify
 * @param {Object} notificationData - Notification data (without user_id)
 */
const notifyByRole = async (roles, notificationData) => {
  try {
    const placeholders = roles.map(() => '?').join(',')
    const [users] = await db.execute(
      `SELECT id FROM users WHERE role IN (${placeholders})`,
      roles
    )

    for (const user of users) {
      await createNotification({
        ...notificationData,
        user_id: user.id
      })
    }

    return users.length
  } catch (error) {
    console.error('Error notifying by role:', error)
    throw error
  }
}

/**
 * Pre-built notification templates
 */
const notifications = {
  // Blog notifications
  blogCreated: (blogTitle, blogId) => ({
    title: 'New Blog Created',
    message: `Blog "${blogTitle}" has been created`,
    type: 'success',
    action_url: `/admin/blogs/edit/${blogId}`,
    entity_type: 'blog',
    entity_id: blogId
  }),

  blogUpdated: (blogTitle, blogId) => ({
    title: 'Blog Updated',
    message: `Blog "${blogTitle}" has been updated`,
    type: 'info',
    action_url: `/admin/blogs/edit/${blogId}`,
    entity_type: 'blog',
    entity_id: blogId
  }),

  blogDeleted: (blogTitle) => ({
    title: 'Blog Deleted',
    message: `Blog "${blogTitle}" has been deleted`,
    type: 'warning',
    entity_type: 'blog'
  }),

  // Lead notifications
  newLead: (leadName, leadId) => ({
    title: 'New Lead Received',
    message: `New lead from ${leadName}`,
    type: 'info',
    action_url: `/admin/leads`,
    entity_type: 'lead',
    entity_id: leadId
  }),

  leadAssigned: (leadName, assignedTo) => ({
    title: 'Lead Assigned',
    message: `Lead from ${leadName} has been assigned to you`,
    type: 'success',
    action_url: `/admin/leads`,
    entity_type: 'lead'
  }),

  // User notifications
  userCreated: (userName, userId) => ({
    title: 'New User Created',
    message: `User "${userName}" has been created`,
    type: 'success',
    action_url: `/admin/users`,
    entity_type: 'user',
    entity_id: userId
  }),

  userDeleted: (userName) => ({
    title: 'User Deleted',
    message: `User "${userName}" has been deleted`,
    type: 'warning',
    entity_type: 'user'
  }),

  // Job application notifications
  newApplication: (applicantName, jobId) => ({
    title: 'New Job Application',
    message: `New application received from ${applicantName}`,
    type: 'info',
    action_url: `/admin/applications`,
    entity_type: 'job_application',
    entity_id: jobId
  }),

  // Media notifications
  mediaUploaded: (fileName) => ({
    title: 'Media Uploaded',
    message: `File "${fileName}" has been uploaded`,
    type: 'success',
    action_url: `/admin/media`,
    entity_type: 'media'
  }),

  mediaDeleted: (fileName) => ({
    title: 'Media Deleted',
    message: `File "${fileName}" has been deleted`,
    type: 'warning',
    entity_type: 'media'
  })
}

export default {
  createNotification,
  notifyAdmins,
  notifyByRole,
  notifications
}
