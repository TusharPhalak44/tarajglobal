import FooterSettings from '../../models/FooterSettings.js'
import FooterSections from '../../models/FooterSections.js'
import FooterLink from '../../models/FooterLink.js'
import FooterSocialLink from '../../models/FooterSocialLink.js'
import FooterOffices from '../../models/FooterOffices.js'
import FooterContactItems from '../../models/FooterContactItems.js'
import fs from 'fs'
import path from 'path'

// Helper to save base64 data image to disk in uploads/media and return relative URL
const saveImageIfBase64 = (imageData) => {
  if (!imageData || typeof imageData !== 'string') return imageData
  if (!imageData.startsWith('data:image/')) return imageData

  try {
    const uploadDir = 'uploads/media'
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    const matches = imageData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
    if (!matches || matches.length !== 3) return imageData

    const mimeType = matches[1]
    const base64Data = matches[2]
    const ext = mimeType.split('/')[1] || 'png'
    const cleanExt = ext === 'jpeg' ? 'jpg' : ext.split('+')[0]
    const filename = `footer-logo-${Date.now()}.${cleanExt}`
    const filePath = path.join(uploadDir, filename)

    fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'))
    return `/uploads/media/${filename}`
  } catch (err) {
    console.error('Failed to save base64 image:', err)
    return imageData
  }
}

// ==================== FOOTER SETTINGS CONTROLLERS ====================

// @desc    Get footer settings
// @route   GET /api/admin/footer/settings
export const getFooterSettings = async (req, res) => {
  try {
    const settings = await FooterSettings.get()
    res.json({
      success: true,
      data: settings
    })
  } catch (error) {
    console.error('Error fetching footer settings:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch footer settings: ' + error.message
    })
  }
}

// @desc    Update footer settings
// @route   PUT /api/admin/footer/settings
export const updateFooterSettings = async (req, res) => {
  try {
    const data = { ...req.body }
    if (data.logo_url && data.logo_url.startsWith('data:image/')) {
      data.logo_url = saveImageIfBase64(data.logo_url)
    }
    const result = await FooterSettings.update(data)
    res.json({
      success: true,
      message: 'Footer settings updated successfully',
      data
    })
  } catch (error) {
    console.error('Error updating footer settings:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update footer settings: ' + error.message
    })
  }
}

// ==================== FOOTER SECTIONS CONTROLLERS ====================

// @desc    Get all footer sections
// @route   GET /api/admin/footer/sections
export const getAllFooterSections = async (req, res) => {
  try {
    const sections = await FooterSections.getAll()
    res.json({
      success: true,
      data: sections
    })
  } catch (error) {
    console.error('Error fetching footer sections:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch footer sections: ' + error.message
    })
  }
}

// @desc    Create footer section
// @route   POST /api/admin/footer/sections
export const createFooterSection = async (req, res) => {
  try {
    const { title, section_type, is_visible, sort_order } = req.body

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      })
    }

    const id = await FooterSections.create({ title, section_type, is_visible, sort_order })
    res.status(201).json({
      success: true,
      message: 'Footer section created successfully',
      data: { id, ...req.body }
    })
  } catch (error) {
    console.error('Error creating footer section:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create footer section: ' + error.message
    })
  }
}

// @desc    Update footer section
// @route   PUT /api/admin/footer/sections/:id
export const updateFooterSection = async (req, res) => {
  try {
    const { id } = req.params
    const updated = await FooterSections.update(id, req.body)
    
    if (updated) {
      res.json({
        success: true,
        message: 'Footer section updated successfully',
        data: { id, ...req.body }
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'Footer section not found'
      })
    }
  } catch (error) {
    console.error('Error updating footer section:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update footer section: ' + error.message
    })
  }
}

// @desc    Delete footer section
// @route   DELETE /api/admin/footer/sections/:id
export const deleteFooterSection = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await FooterSections.delete(id)
    
    if (deleted) {
      res.json({
        success: true,
        message: 'Footer section deleted successfully'
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'Footer section not found'
      })
    }
  } catch (error) {
    console.error('Error deleting footer section:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete footer section: ' + error.message
    })
  }
}

// @desc    Reorder footer sections
// @route   POST /api/admin/footer/sections/reorder
export const reorderFooterSections = async (req, res) => {
  try {
    const { items } = req.body

    if (!Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: 'Items must be an array'
      })
    }

    await FooterSections.updateOrder(items)
    res.json({
      success: true,
      message: 'Footer sections reordered successfully'
    })
  } catch (error) {
    console.error('Error reordering footer sections:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to reorder footer sections: ' + error.message
    })
  }
}

// ==================== FOOTER LINKS CONTROLLERS ====================

// @desc    Get all footer links
// @route   GET /api/admin/footer/links
export const getAllFooterLinks = async (req, res) => {
  try {
    const links = await FooterLink.getAll()
    res.json({
      success: true,
      data: links
    })
  } catch (error) {
    console.error('Error fetching footer links:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch footer links: ' + error.message
    })
  }
}

// @desc    Get footer links by section
// @route   GET /api/admin/footer/links/section/:sectionId
export const getFooterLinksBySection = async (req, res) => {
  try {
    const { sectionId } = req.params
    const links = await FooterLink.getBySection(sectionId)
    res.json({
      success: true,
      data: links
    })
  } catch (error) {
    console.error('Error fetching footer links by section:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch footer links: ' + error.message
    })
  }
}

// @desc    Create footer link
// @route   POST /api/admin/footer/links
export const createFooterLink = async (req, res) => {
  try {
    const { section_id, label, url, link_type, target, custom_action, is_visible, sort_order } = req.body

    if (!section_id || !label || !url) {
      return res.status(400).json({
        success: false,
        message: 'Section ID, label, and URL are required'
      })
    }

    const id = await FooterLink.create({ section_id, label, url, link_type, target, custom_action, is_visible, sort_order })
    res.status(201).json({
      success: true,
      message: 'Footer link created successfully',
      data: { id, ...req.body }
    })
  } catch (error) {
    console.error('Error creating footer link:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create footer link: ' + error.message
    })
  }
}

// @desc    Update footer link
// @route   PUT /api/admin/footer/links/:id
export const updateFooterLink = async (req, res) => {
  try {
    const { id } = req.params
    const updated = await FooterLink.update(id, req.body)
    
    if (updated) {
      res.json({
        success: true,
        message: 'Footer link updated successfully',
        data: { id, ...req.body }
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'Footer link not found'
      })
    }
  } catch (error) {
    console.error('Error updating footer link:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update footer link: ' + error.message
    })
  }
}

// @desc    Delete footer link
// @route   DELETE /api/admin/footer/links/:id
export const deleteFooterLink = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await FooterLink.delete(id)
    
    if (deleted) {
      res.json({
        success: true,
        message: 'Footer link deleted successfully'
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'Footer link not found'
      })
    }
  } catch (error) {
    console.error('Error deleting footer link:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete footer link: ' + error.message
    })
  }
}

// @desc    Reorder footer links
// @route   POST /api/admin/footer/links/reorder
export const reorderFooterLinks = async (req, res) => {
  try {
    const { items } = req.body

    if (!Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: 'Items must be an array'
      })
    }

    await FooterLink.updateOrder(items)
    res.json({
      success: true,
      message: 'Footer links reordered successfully'
    })
  } catch (error) {
    console.error('Error reordering footer links:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to reorder footer links: ' + error.message
    })
  }
}

// ==================== FOOTER OFFICES CONTROLLERS ====================

// @desc    Get all footer offices
// @route   GET /api/admin/footer/offices
export const getAllFooterOffices = async (req, res) => {
  try {
    const offices = await FooterOffices.getAll()
    res.json({
      success: true,
      data: offices
    })
  } catch (error) {
    console.error('Error fetching footer offices:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch footer offices: ' + error.message
    })
  }
}

// @desc    Create footer office
// @route   POST /api/admin/footer/offices
export const createFooterOffice = async (req, res) => {
  try {
    const { name, address_line_1, address_line_2, city, state, country, postal_code, map_url, phone, email, icon, is_visible, sort_order } = req.body

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Office name is required'
      })
    }

    const id = await FooterOffices.create({ name, address_line_1, address_line_2, city, state, country, postal_code, map_url, phone, email, icon, is_visible, sort_order })
    res.status(201).json({
      success: true,
      message: 'Footer office created successfully',
      data: { id, ...req.body }
    })
  } catch (error) {
    console.error('Error creating footer office:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create footer office: ' + error.message
    })
  }
}

// @desc    Update footer office
// @route   PUT /api/admin/footer/offices/:id
export const updateFooterOffice = async (req, res) => {
  try {
    const { id } = req.params
    const updated = await FooterOffices.update(id, req.body)
    
    if (updated) {
      res.json({
        success: true,
        message: 'Footer office updated successfully',
        data: { id, ...req.body }
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'Footer office not found'
      })
    }
  } catch (error) {
    console.error('Error updating footer office:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update footer office: ' + error.message
    })
  }
}

// @desc    Delete footer office
// @route   DELETE /api/admin/footer/offices/:id
export const deleteFooterOffice = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await FooterOffices.delete(id)
    
    if (deleted) {
      res.json({
        success: true,
        message: 'Footer office deleted successfully'
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'Footer office not found'
      })
    }
  } catch (error) {
    console.error('Error deleting footer office:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete footer office: ' + error.message
    })
  }
}

// @desc    Reorder footer offices
// @route   POST /api/admin/footer/offices/reorder
export const reorderFooterOffices = async (req, res) => {
  try {
    const { items } = req.body

    if (!Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: 'Items must be an array'
      })
    }

    await FooterOffices.updateOrder(items)
    res.json({
      success: true,
      message: 'Footer offices reordered successfully'
    })
  } catch (error) {
    console.error('Error reordering footer offices:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to reorder footer offices: ' + error.message
    })
  }
}

// ==================== FOOTER CONTACT ITEMS CONTROLLERS ====================

// @desc    Get all footer contact items
// @route   GET /api/admin/footer/contact-items
export const getAllFooterContactItems = async (req, res) => {
  try {
    const items = await FooterContactItems.getAll()
    res.json({
      success: true,
      data: items
    })
  } catch (error) {
    console.error('Error fetching footer contact items:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch footer contact items: ' + error.message
    })
  }
}

// @desc    Create footer contact item
// @route   POST /api/admin/footer/contact-items
export const createFooterContactItem = async (req, res) => {
  try {
    const { type, label, value, action_url, icon, is_visible, sort_order } = req.body

    if (!type) {
      return res.status(400).json({
        success: false,
        message: 'Type is required'
      })
    }

    const id = await FooterContactItems.create({ type, label, value, action_url, icon, is_visible, sort_order })
    res.status(201).json({
      success: true,
      message: 'Footer contact item created successfully',
      data: { id, ...req.body }
    })
  } catch (error) {
    console.error('Error creating footer contact item:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create footer contact item: ' + error.message
    })
  }
}

// @desc    Update footer contact item
// @route   PUT /api/admin/footer/contact-items/:id
export const updateFooterContactItem = async (req, res) => {
  try {
    const { id } = req.params
    const updated = await FooterContactItems.update(id, req.body)
    
    if (updated) {
      res.json({
        success: true,
        message: 'Footer contact item updated successfully',
        data: { id, ...req.body }
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'Footer contact item not found'
      })
    }
  } catch (error) {
    console.error('Error updating footer contact item:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update footer contact item: ' + error.message
    })
  }
}

// @desc    Delete footer contact item
// @route   DELETE /api/admin/footer/contact-items/:id
export const deleteFooterContactItem = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await FooterContactItems.delete(id)
    
    if (deleted) {
      res.json({
        success: true,
        message: 'Footer contact item deleted successfully'
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'Footer contact item not found'
      })
    }
  } catch (error) {
    console.error('Error deleting footer contact item:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete footer contact item: ' + error.message
    })
  }
}

// @desc    Reorder footer contact items
// @route   POST /api/admin/footer/contact-items/reorder
export const reorderFooterContactItems = async (req, res) => {
  try {
    const { items } = req.body

    if (!Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: 'Items must be an array'
      })
    }

    await FooterContactItems.updateOrder(items)
    res.json({
      success: true,
      message: 'Footer contact items reordered successfully'
    })
  } catch (error) {
    console.error('Error reordering footer contact items:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to reorder footer contact items: ' + error.message
    })
  }
}

// ==================== FOOTER SOCIAL LINKS CONTROLLERS ====================

// @desc    Get all footer social links
// @route   GET /api/admin/footer/social-links
export const getAllFooterSocialLinks = async (req, res) => {
  try {
    const links = await FooterSocialLink.getAll()
    res.json({
      success: true,
      data: links
    })
  } catch (error) {
    console.error('Error fetching footer social links:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch footer social links: ' + error.message
    })
  }
}

// @desc    Create footer social link
// @route   POST /api/admin/footer/social-links
export const createFooterSocialLink = async (req, res) => {
  try {
    const { platform, icon, url, is_visible, sort_order } = req.body

    if (!platform || !icon || !url) {
      return res.status(400).json({
        success: false,
        message: 'Platform, icon, and URL are required'
      })
    }

    const id = await FooterSocialLink.create({ platform, icon, url, is_visible, sort_order })
    res.status(201).json({
      success: true,
      message: 'Footer social link created successfully',
      data: { id, ...req.body }
    })
  } catch (error) {
    console.error('Error creating footer social link:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create footer social link: ' + error.message
    })
  }
}

// @desc    Update footer social link
// @route   PUT /api/admin/footer/social-links/:id
export const updateFooterSocialLink = async (req, res) => {
  try {
    const { id } = req.params
    const updated = await FooterSocialLink.update(id, req.body)
    
    if (updated) {
      res.json({
        success: true,
        message: 'Footer social link updated successfully',
        data: { id, ...req.body }
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'Footer social link not found'
      })
    }
  } catch (error) {
    console.error('Error updating footer social link:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update footer social link: ' + error.message
    })
  }
}

// @desc    Delete footer social link
// @route   DELETE /api/admin/footer/social-links/:id
export const deleteFooterSocialLink = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await FooterSocialLink.delete(id)
    
    if (deleted) {
      res.json({
        success: true,
        message: 'Footer social link deleted successfully'
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'Footer social link not found'
      })
    }
  } catch (error) {
    console.error('Error deleting footer social link:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete footer social link: ' + error.message
    })
  }
}

// @desc    Reorder footer social links
// @route   POST /api/admin/footer/social-links/reorder
export const reorderFooterSocialLinks = async (req, res) => {
  try {
    const { items } = req.body

    if (!Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: 'Items must be an array'
      })
    }

    await FooterSocialLink.updateOrder(items)
    res.json({
      success: true,
      message: 'Footer social links reordered successfully'
    })
  } catch (error) {
    console.error('Error reordering footer social links:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to reorder footer social links: ' + error.message
    })
  }
}
