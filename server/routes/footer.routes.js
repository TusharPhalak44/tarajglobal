import express from 'express'
import * as footerController from '../controllers/admin/footer.controller.js'

const router = express.Router()

// ==================== PUBLIC FOOTER ROUTES ====================

// @route   GET /api/footer
// @desc    Get all footer data (settings, sections, links, offices, contact items, social links)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const FooterSettings = (await import('../models/FooterSettings.js')).default
    const FooterSections = (await import('../models/FooterSections.js')).default
    const FooterLink = (await import('../models/FooterLink.js')).default
    const FooterOffices = (await import('../models/FooterOffices.js')).default
    const FooterContactItems = (await import('../models/FooterContactItems.js')).default
    const FooterSocialLink = (await import('../models/FooterSocialLink.js')).default

    const [settings, sections, links, offices, contactItems, socialLinks] = await Promise.all([
      FooterSettings.get(),
      FooterSections.getVisible(),
      FooterLink.getActive(),
      FooterOffices.getVisible(),
      FooterContactItems.getVisible(),
      FooterSocialLink.getActive()
    ])

    // Group links by section
    const linksBySection = {}
    sections.forEach(section => {
      linksBySection[section.id] = {
        title: section.title,
        type: section.section_type,
        links: links.filter(link => link.section_id === section.id)
      }
    })

    res.json({
      success: true,
      data: {
        settings,
        sections,
        links: linksBySection,
        offices,
        contactItems,
        socialLinks
      }
    })
  } catch (error) {
    console.error('Error fetching footer data:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch footer data'
    })
  }
})

export default router
