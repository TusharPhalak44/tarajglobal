import db from '../config/db.js'

/**
 * Track a page view
 * POST /api/analytics/track
 */
export const trackPageView = async (req, res) => {
  try {
    const { page_url, referrer, user_agent, session_id } = req.body

    if (!page_url) {
      return res.status(400).json({ success: false, message: 'page_url is required' })
    }

    // Extract IP address securely
    const ip_address = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null

    // Insert the page view into the database (user_email is left as NULL)
    await db.execute(
      `INSERT INTO page_views (page_url, referrer, user_agent, session_id, ip_address) 
       VALUES (?, ?, ?, ?, ?)`,
      [page_url, referrer || null, user_agent || null, session_id || null, ip_address]
    )

    return res.status(200).json({ success: true, message: 'Tracked successfully' })
  } catch (error) {
    console.error('Tracking error:', error)
    // Return 200 even on error so we don't break the frontend or show tracking errors to users
    return res.status(200).json({ success: false, message: 'Tracking failed silently' })
  }
}

/**
 * Save cookie consent preferences
 * POST /api/analytics/consent
 */
export const saveCookieConsent = async (req, res) => {
  try {
    const { session_id, necessary, analytics, functional, marketing } = req.body

    const ip_address = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null

    // Upsert the consent (if session_id exists, update it, otherwise insert)
    await db.execute(
      `INSERT INTO cookie_consents (session_id, ip_address, necessary, analytics, functional, marketing)
       VALUES (?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE 
       ip_address = VALUES(ip_address),
       necessary = VALUES(necessary),
       analytics = VALUES(analytics),
       functional = VALUES(functional),
       marketing = VALUES(marketing)`,
      [
        session_id || null, 
        ip_address, 
        necessary ? 1 : 0, 
        analytics ? 1 : 0, 
        functional ? 1 : 0, 
        marketing ? 1 : 0
      ]
    )

    return res.status(200).json({ success: true, message: 'Consent saved' })
  } catch (error) {
    console.error('Consent save error:', error)
    return res.status(500).json({ success: false, message: 'Failed to save consent' })
  }
}