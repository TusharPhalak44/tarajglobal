import db from '../config/db.js'

/**
 * Get SEO metadata for any entity (public route)
 * GET /api/seo/:entityType/:entityId
 */
export const getSEOData = async (req, res) => {
  try {
    const { entityType, entityId } = req.params

    const [seoData] = await db.execute(
      'SELECT * FROM seo_metadata WHERE entity_type = ? AND entity_id = ?',
      [entityType, entityId]
    )

    if (seoData.length === 0) {
      return res.json({ success: true, data: null })
    }

    res.json({ success: true, data: seoData[0] })
  } catch (error) {
    console.error('Error fetching SEO data:', error)
    res.status(500).json({ success: false, message: 'Server error fetching SEO data' })
  }
}
