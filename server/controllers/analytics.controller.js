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

/**
 * Track a CTA button click event with UTM attribution
 * POST /api/analytics/cta-click
 */
export const trackCtaClick = async (req, res) => {
  try {
    const {
      page_url,
      page_title,
      section_id,
      section_name,
      cta_text,
      destination_url,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      session_id,
    } = req.body

    if (!page_url) {
      return res.status(400).json({ success: false, message: 'page_url is required' })
    }

    // Extract IP address securely
    const ip_address = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress || null
    const user_agent = req.headers['user-agent'] || null

    await db.execute(
      `INSERT INTO cta_clicks (
        page_url, page_title, section_id, section_name, cta_text, destination_url,
        utm_source, utm_medium, utm_campaign, utm_term, utm_content,
        session_id, ip_address, user_agent
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        page_url.slice(0, 255),
        page_title ? page_title.slice(0, 255) : null,
        section_id ? section_id.slice(0, 100) : null,
        section_name ? section_name.slice(0, 150) : null,
        cta_text ? cta_text.slice(0, 150) : null,
        destination_url ? destination_url.slice(0, 500) : null,
        utm_source ? utm_source.slice(0, 100) : null,
        utm_medium ? utm_medium.slice(0, 100) : null,
        utm_campaign ? utm_campaign.slice(0, 150) : null,
        utm_term ? utm_term.slice(0, 150) : null,
        utm_content ? utm_content.slice(0, 150) : null,
        session_id ? session_id.slice(0, 100) : null,
        ip_address ? ip_address.slice(0, 45) : null,
        user_agent,
      ]
    )

    return res.status(200).json({ success: true, message: 'CTA click tracked successfully' })
  } catch (error) {
    console.error('CTA tracking error:', error)
    return res.status(200).json({ success: false, message: 'CTA tracking failed silently' })
  }
}