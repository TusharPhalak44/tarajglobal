import NavbarItem from '../../models/NavbarItem.js'
import FooterLink from '../../models/FooterLink.js'
import FooterSocialLink from '../../models/FooterSocialLink.js'
import Client from '../../models/Client.js'
import db from '../../config/db.js'
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
    const filename = `logo-${Date.now()}.${cleanExt}`
    const filePath = path.join(uploadDir, filename)

    fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'))
    return `/uploads/media/${filename}`
  } catch (err) {
    console.error('Failed to save base64 image:', err)
    return imageData
  }
}

// ==================== NAVBAR CONTROLLERS ====================

// @desc    Get all navbar items
// @route   GET /api/admin/cms/navbar
export const getAllNavbarItems = async (req, res) => {
  try {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    const items = await NavbarItem.getAll()
    res.json({
      success: true,
      data: items
    })
  } catch (error) {
    console.error('Error fetching navbar items:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch navbar items'
    })
  }
}

// @desc    Get active navbar items (for public use)
// @route   GET /api/cms/navbar
export const getActiveNavbarItems = async (req, res) => {
  try {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    const items = await NavbarItem.getActive()
    res.json({
      success: true,
      data: items
    })
  } catch (error) {
    console.error('Error fetching active navbar items:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch navbar items'
    })
  }
}

// @desc    Create navbar item
// @route   POST /api/admin/cms/navbar
export const createNavbarItem = async (req, res) => {
  try {
    const { section, label, url, parent_id, display_order, is_active } = req.body

    if (!label || !url) {
      return res.status(400).json({
        success: false,
        message: 'Label and URL are required'
      })
    }

    const itemData = {
      section: section || 'navbar',
      label: label.trim(),
      url: url.trim(),
      parent_id: parent_id ? parseInt(parent_id) : null,
      display_order: display_order !== undefined && display_order !== null ? parseInt(display_order) : 0,
      is_active: is_active === false || is_active === 0 || is_active === '0' ? false : true
    }

    console.log('Creating navbar item:', itemData)
    const id = await NavbarItem.create(itemData)
    console.log('Navbar item created with ID:', id)
    
    res.status(201).json({
      success: true,
      message: 'Navbar item created successfully',
      data: { id, ...itemData }
    })
  } catch (error) {
    console.error('Error creating navbar item:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create navbar item: ' + error.message
    })
  }
}

// @desc    Update navbar item
// @route   PUT /api/admin/cms/navbar/:id
export const updateNavbarItem = async (req, res) => {
  try {
    const { id } = req.params
    const { section, label, url, parent_id, display_order, is_active } = req.body

    const existingItem = await NavbarItem.findById(id)
    if (!existingItem) {
      return res.status(404).json({
        success: false,
        message: 'Navbar item not found'
      })
    }

    const itemData = {
      section: section || existingItem.section,
      label: label ? label.trim() : existingItem.label,
      url: url ? url.trim() : existingItem.url,
      parent_id: parent_id !== undefined ? (parent_id ? parseInt(parent_id) : null) : existingItem.parent_id,
      display_order: display_order !== undefined && display_order !== null ? parseInt(display_order) : existingItem.display_order,
      is_active: is_active !== undefined ? (is_active === true || is_active === 1 || is_active === '1') : existingItem.is_active
    }

    await NavbarItem.update(id, itemData)
    
    res.json({
      success: true,
      message: 'Navbar item updated successfully',
      data: { id, ...itemData }
    })
  } catch (error) {
    console.error('Error updating navbar item:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update navbar item'
    })
  }
}

// @desc    Delete navbar item
// @route   DELETE /api/admin/cms/navbar/:id
export const deleteNavbarItem = async (req, res) => {
  try {
    const { id } = req.params

    const existingItem = await NavbarItem.findById(id)
    if (!existingItem) {
      return res.status(404).json({
        success: false,
        message: 'Navbar item not found'
      })
    }

    const deleted = await NavbarItem.delete(id)
    
    if (deleted) {
      res.json({
        success: true,
        message: 'Navbar item deleted successfully'
      })
    } else {
      res.status(400).json({
        success: false,
        message: 'Failed to delete navbar item'
      })
    }
  } catch (error) {
    console.error('Error deleting navbar item:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete navbar item'
    })
  }
}

// @desc    Reorder navbar items
// @route   PUT /api/admin/cms/navbar/reorder
export const reorderNavbarItems = async (req, res) => {
  try {
    const { items } = req.body

    if (!Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: 'Items must be an array'
      })
    }

    await NavbarItem.updateOrder(items)
    
    res.json({
      success: true,
      message: 'Navbar items reordered successfully'
    })
  } catch (error) {
    console.error('Error reordering navbar items:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to reorder navbar items'
    })
  }
}

// @desc    Get company logo and header settings
// @route   GET /api/admin/cms/logo
export const getLogo = async (req, res) => {
  try {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    const [rows] = await db.execute(
      "SELECT value FROM settings WHERE key_name = 'cms_logo_url'"
    )
    const logoUrl = rows.length > 0 ? rows[0].value : '/middle.png'
    
    const [textRows] = await db.execute(
      "SELECT value FROM settings WHERE key_name = 'cms_logo_text'"
    )
    const logoText = textRows.length > 0 ? textRows[0].value : 'Taraj Global'

    const [altRows] = await db.execute(
      "SELECT value FROM settings WHERE key_name = 'cms_logo_alt'"
    )
    const logoAlt = altRows.length > 0 ? altRows[0].value : 'Taraj Global - B2B Growth & Lead Generation Agency'

    const [headerRows] = await db.execute(
      "SELECT value FROM settings WHERE key_name = 'cms_header_visible'"
    )
    const headerVisible = headerRows.length > 0 ? headerRows[0].value === '1' || headerRows[0].value === 'true' : true

    const [showTextRows] = await db.execute(
      "SELECT value FROM settings WHERE key_name = 'cms_show_logo_text'"
    )
    const showLogoText = showTextRows.length > 0 ? (showTextRows[0].value === '1' || showTextRows[0].value === 'true') : false

    res.json({
      success: true,
      data: {
        logo_url: logoUrl,
        logo_text: logoText,
        logo_alt: logoAlt,
        header_visible: headerVisible,
        show_logo_text: showLogoText
      }
    })
  } catch (error) {
    console.error('Error fetching logo:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch logo'
    })
  }
}

// @desc    Update company logo and header settings
// @route   PUT /api/admin/cms/logo
export const updateLogo = async (req, res) => {
  try {
    let { logo_url, logo_text, logo_alt, header_visible, show_logo_text } = req.body

    // Save image if base64 data URL
    if (logo_url && logo_url.startsWith('data:image/')) {
      logo_url = saveImageIfBase64(logo_url)
    }

    if (logo_url !== undefined) {
      const [existing] = await db.execute(
        "SELECT id FROM settings WHERE key_name = 'cms_logo_url'"
      )
      if (existing.length > 0) {
        await db.execute(
          "UPDATE settings SET value = ? WHERE key_name = 'cms_logo_url'",
          [logo_url]
        )
      } else {
        await db.execute(
          "INSERT INTO settings (key_name, value, description) VALUES ('cms_logo_url', ?, 'Website company logo URL')",
          [logo_url]
        )
      }
    }

    if (logo_text !== undefined) {
      const [existingText] = await db.execute(
        "SELECT id FROM settings WHERE key_name = 'cms_logo_text'"
      )
      if (existingText.length > 0) {
        await db.execute(
          "UPDATE settings SET value = ? WHERE key_name = 'cms_logo_text'",
          [logo_text]
        )
      } else {
        await db.execute(
          "INSERT INTO settings (key_name, value, description) VALUES ('cms_logo_text', ?, 'Website logo brand text')",
          [logo_text]
        )
      }
    }

    if (logo_alt !== undefined) {
      const [existingAlt] = await db.execute(
        "SELECT id FROM settings WHERE key_name = 'cms_logo_alt'"
      )
      if (existingAlt.length > 0) {
        await db.execute(
          "UPDATE settings SET value = ? WHERE key_name = 'cms_logo_alt'",
          [logo_alt]
        )
      } else {
        await db.execute(
          "INSERT INTO settings (key_name, value, description) VALUES ('cms_logo_alt', ?, 'Website logo alt text')",
          [logo_alt]
        )
      }
    }

    if (header_visible !== undefined) {
      const visibleVal = header_visible ? '1' : '0'
      const [existingHdr] = await db.execute(
        "SELECT id FROM settings WHERE key_name = 'cms_header_visible'"
      )
      if (existingHdr.length > 0) {
        await db.execute(
          "UPDATE settings SET value = ? WHERE key_name = 'cms_header_visible'",
          [visibleVal]
        )
      } else {
        await db.execute(
          "INSERT INTO settings (key_name, value, description) VALUES ('cms_header_visible', ?, 'Show or hide top header bar')",
          [visibleVal]
        )
      }
    }

    if (show_logo_text !== undefined) {
      const showVal = show_logo_text ? '1' : '0'
      const [existingShow] = await db.execute(
        "SELECT id FROM settings WHERE key_name = 'cms_show_logo_text'"
      )
      if (existingShow.length > 0) {
        await db.execute(
          "UPDATE settings SET value = ? WHERE key_name = 'cms_show_logo_text'",
          [showVal]
        )
      } else {
        await db.execute(
          "INSERT INTO settings (key_name, value, description) VALUES ('cms_show_logo_text', ?, 'Display brand text beside header logo image')",
          [showVal]
        )
      }
    }

    // Fetch latest complete settings to return in response
    const [urlRows] = await db.execute("SELECT value FROM settings WHERE key_name = 'cms_logo_url'")
    const finalLogoUrl = urlRows.length > 0 ? urlRows[0].value : '/middle.png'
    const [txtRows] = await db.execute("SELECT value FROM settings WHERE key_name = 'cms_logo_text'")
    const finalLogoText = txtRows.length > 0 ? txtRows[0].value : 'Taraj Global'
    const [altRows] = await db.execute("SELECT value FROM settings WHERE key_name = 'cms_logo_alt'")
    const finalLogoAlt = altRows.length > 0 ? altRows[0].value : 'Taraj Global - B2B Growth & Lead Generation Agency'
    const [hdrRows] = await db.execute("SELECT value FROM settings WHERE key_name = 'cms_header_visible'")
    const finalHeaderVisible = hdrRows.length > 0 ? hdrRows[0].value === '1' || hdrRows[0].value === 'true' : true
    const [shwRows] = await db.execute("SELECT value FROM settings WHERE key_name = 'cms_show_logo_text'")
    const finalShowLogoText = shwRows.length > 0 ? shwRows[0].value === '1' || shwRows[0].value === 'true' : false

    res.json({
      success: true,
      message: 'Header and Logo updated successfully',
      data: {
        logo_url: finalLogoUrl,
        logo_text: finalLogoText,
        logo_alt: finalLogoAlt,
        header_visible: finalHeaderVisible,
        show_logo_text: finalShowLogoText
      }
    })
  } catch (error) {
    console.error('Error updating logo:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update logo'
    })
  }
}

// ==================== FOOTER LINKS CONTROLLERS ====================

// @desc    Get all footer links
// @route   GET /api/admin/cms/footer-links
export const getAllFooterLinks = async (req, res) => {
  try {
    console.log('Fetching all footer links...')
    const links = await FooterLink.getAll()
    console.log('Footer links fetched:', links)
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

// @desc    Get active footer links (for public use)
// @route   GET /api/cms/footer-links
export const getActiveFooterLinks = async (req, res) => {
  try {
    const links = await FooterLink.getActive()
    res.json({
      success: true,
      data: links
    })
  } catch (error) {
    console.error('Error fetching active footer links:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch footer links'
    })
  }
}

// @desc    Get footer links by section
// @route   GET /api/cms/footer-links/:section
export const getFooterLinksBySection = async (req, res) => {
  try {
    const { section } = req.params
    const links = await FooterLink.getBySection(section)
    res.json({
      success: true,
      data: links
    })
  } catch (error) {
    console.error('Error fetching footer links by section:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch footer links'
    })
  }
}

// @desc    Create footer link
// @route   POST /api/admin/cms/footer-links
export const createFooterLink = async (req, res) => {
  try {
    const { section, title, url, display_order, is_active } = req.body

    if (!section || !title) {
      return res.status(400).json({
        success: false,
        message: 'Section and title are required'
      })
    }

    const linkData = {
      section,
      title,
      url: url || null,
      display_order: display_order || 0,
      is_active: is_active !== false
    }

    console.log('Creating footer link:', linkData)
    const id = await FooterLink.create(linkData)
    console.log('Footer link created with ID:', id)
    
    res.status(201).json({
      success: true,
      message: 'Footer link created successfully',
      data: { id, ...linkData }
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
// @route   PUT /api/admin/cms/footer-links/:id
export const updateFooterLink = async (req, res) => {
  try {
    const { id } = req.params
    const { section, title, url, display_order, is_active } = req.body

    const existingLink = await FooterLink.findById(id)
    if (!existingLink) {
      return res.status(404).json({
        success: false,
        message: 'Footer link not found'
      })
    }

    const linkData = {
      section: section || existingLink.section,
      title: title || existingLink.title,
      url: url !== undefined ? url : existingLink.url,
      display_order: display_order !== undefined ? display_order : existingLink.display_order,
      is_active: is_active !== undefined ? is_active : existingLink.is_active
    }

    const updated = await FooterLink.update(id, linkData)
    
    if (updated) {
      res.json({
        success: true,
        message: 'Footer link updated successfully',
        data: { id, ...linkData }
      })
    } else {
      res.status(400).json({
        success: false,
        message: 'Failed to update footer link'
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
// @route   DELETE /api/admin/cms/footer-links/:id
export const deleteFooterLink = async (req, res) => {
  try {
    const { id } = req.params

    const existingLink = await FooterLink.findById(id)
    if (!existingLink) {
      return res.status(404).json({
        success: false,
        message: 'Footer link not found'
      })
    }

    const deleted = await FooterLink.delete(id)
    
    if (deleted) {
      res.json({
        success: true,
        message: 'Footer link deleted successfully'
      })
    } else {
      res.status(400).json({
        success: false,
        message: 'Failed to delete footer link'
      })
    }
  } catch (error) {
    console.error('Error deleting footer link:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete footer link'
    })
  }
}

// @desc    Reorder footer links
// @route   PUT /api/admin/cms/footer-links/reorder
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

// ==================== FOOTER SOCIAL LINKS CONTROLLERS ====================

// @desc    Get all footer social links
// @route   GET /api/admin/cms/footer-social-links
export const getAllFooterSocialLinks = async (req, res) => {
  try {
    console.log('Fetching all footer social links...')
    const links = await FooterSocialLink.getAll()
    console.log('Footer social links fetched:', links)
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

// @desc    Get active footer social links (for public use)
// @route   GET /api/cms/footer-social-links
export const getActiveFooterSocialLinks = async (req, res) => {
  try {
    const links = await FooterSocialLink.getActive()
    res.json({
      success: true,
      data: links
    })
  } catch (error) {
    console.error('Error fetching active footer social links:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch footer social links'
    })
  }
}

// @desc    Create footer social link
// @route   POST /api/admin/cms/footer-social-links
export const createFooterSocialLink = async (req, res) => {
  try {
    const { platform, icon, url, display_order, is_active } = req.body

    if (!platform || !icon || !url) {
      return res.status(400).json({
        success: false,
        message: 'Platform, icon, and URL are required'
      })
    }

    const linkData = {
      platform,
      icon,
      url,
      display_order: display_order || 0,
      is_active: is_active !== false
    }

    console.log('Creating footer social link:', linkData)
    const id = await FooterSocialLink.create(linkData)
    console.log('Footer social link created with ID:', id)
    
    res.status(201).json({
      success: true,
      message: 'Footer social link created successfully',
      data: { id, ...linkData }
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
// @route   PUT /api/admin/cms/footer-social-links/:id
export const updateFooterSocialLink = async (req, res) => {
  try {
    const { id } = req.params
    const { platform, icon, url, display_order, is_active } = req.body

    const existingLink = await FooterSocialLink.findById(id)
    if (!existingLink) {
      return res.status(404).json({
        success: false,
        message: 'Footer social link not found'
      })
    }

    const linkData = {
      platform: platform || existingLink.platform,
      icon: icon || existingLink.icon,
      url: url || existingLink.url,
      display_order: display_order !== undefined ? display_order : existingLink.display_order,
      is_active: is_active !== undefined ? is_active : existingLink.is_active
    }

    const updated = await FooterSocialLink.update(id, linkData)
    
    if (updated) {
      res.json({
        success: true,
        message: 'Footer social link updated successfully',
        data: { id, ...linkData }
      })
    } else {
      res.status(400).json({
        success: false,
        message: 'Failed to update footer social link'
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
// @route   DELETE /api/admin/cms/footer-social-links/:id
export const deleteFooterSocialLink = async (req, res) => {
  try {
    const { id } = req.params

    const existingLink = await FooterSocialLink.findById(id)
    if (!existingLink) {
      return res.status(404).json({
        success: false,
        message: 'Footer social link not found'
      })
    }

    const deleted = await FooterSocialLink.delete(id)
    
    if (deleted) {
      res.json({
        success: true,
        message: 'Footer social link deleted successfully'
      })
    } else {
      res.status(400).json({
        success: false,
        message: 'Failed to delete footer social link'
      })
    }
  } catch (error) {
    console.error('Error deleting footer social link:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete footer social link'
    })
  }
}

// @desc    Reorder footer social links
// @route   PUT /api/admin/cms/footer-social-links/reorder
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

// ==================== CLIENTS CONTROLLERS ====================

// @desc    Get all clients
// @route   GET /api/admin/cms/clients
export const getAllClients = async (req, res) => {
  try {
    const clients = await Client.getAll()
    res.json({
      success: true,
      data: clients
    })
  } catch (error) {
    console.error('Error fetching clients:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch clients'
    })
  }
}

// @desc    Get active clients (for public use)
// @route   GET /api/cms/clients
export const getActiveClients = async (req, res) => {
  try {
    const clients = await Client.getActive()
    res.json({
      success: true,
      data: clients
    })
  } catch (error) {
    console.error('Error fetching active clients:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch clients'
    })
  }
}

// @desc    Create client
// @route   POST /api/admin/cms/clients
export const createClient = async (req, res) => {
  try {
    const { client_name, logo_path, website_url, display_order, is_active } = req.body

    if (!client_name || !logo_path) {
      return res.status(400).json({
        success: false,
        message: 'Client name and logo path are required'
      })
    }

    const clientData = {
      client_name,
      logo_path,
      website_url: website_url || null,
      display_order: display_order || 0,
      is_active: is_active !== false
    }

    console.log('Creating client:', clientData)
    const id = await Client.create(clientData)
    console.log('Client created with ID:', id)
    
    res.status(201).json({
      success: true,
      message: 'Client created successfully',
      data: { id, ...clientData }
    })
  } catch (error) {
    console.error('Error creating client:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create client: ' + error.message
    })
  }
}

// @desc    Update client
// @route   PUT /api/admin/cms/clients/:id
export const updateClient = async (req, res) => {
  try {
    const { id } = req.params
    const { client_name, logo_path, website_url, display_order, is_active } = req.body

    const existingClient = await Client.findById(id)
    if (!existingClient) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      })
    }

    const clientData = {
      client_name: client_name || existingClient.client_name,
      logo_path: logo_path || existingClient.logo_path,
      website_url: website_url !== undefined ? website_url : existingClient.website_url,
      display_order: display_order !== undefined ? display_order : existingClient.display_order,
      is_active: is_active !== undefined ? is_active : existingClient.is_active
    }

    const updated = await Client.update(id, clientData)
    
    if (updated) {
      res.json({
        success: true,
        message: 'Client updated successfully',
        data: { id, ...clientData }
      })
    } else {
      res.status(400).json({
        success: false,
        message: 'Failed to update client'
      })
    }
  } catch (error) {
    console.error('Error updating client:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update client: ' + error.message
    })
  }
}

// @desc    Delete client
// @route   DELETE /api/admin/cms/clients/:id
export const deleteClient = async (req, res) => {
  try {
    const { id } = req.params

    const existingClient = await Client.findById(id)
    if (!existingClient) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      })
    }

    const deleted = await Client.delete(id)
    
    if (deleted) {
      res.json({
        success: true,
        message: 'Client deleted successfully'
      })
    } else {
      res.status(400).json({
        success: false,
        message: 'Failed to delete client'
      })
    }
  } catch (error) {
    console.error('Error deleting client:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete client'
    })
  }
}

// @desc    Reorder clients
// @route   PUT /api/admin/cms/clients/reorder
export const reorderClients = async (req, res) => {
  try {
    const { items } = req.body

    if (!Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: 'Items must be an array'
      })
    }

    await Client.updateOrder(items)
    
    res.json({
      success: true,
      message: 'Clients reordered successfully'
    })
  } catch (error) {
    console.error('Error reordering clients:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to reorder clients: ' + error.message
    })
  }
}

// ==================== CLIENT SECTION SETTINGS ====================

// @desc    Get client section settings (public or admin)
// @route   GET /api/cms/clients-section  |  GET /api/admin/cms/clients-section
export const getClientSectionSettings = async (req, res) => {
  try {
    const keys = [
      'cms_clients_eyebrow',
      'cms_clients_title_white',
      'cms_clients_title_gradient',
      'cms_clients_subtitle',
      'cms_clients_visible',
    ]
    const [rows] = await db.execute(
      `SELECT key_name, value FROM settings WHERE key_name IN (${keys.map(() => '?').join(',')})`,
      keys
    )
    const map = Object.fromEntries(rows.map(r => [r.key_name, r.value]))
    res.json({
      success: true,
      data: {
        eyebrow: map['cms_clients_eyebrow'] ?? 'GLOBAL PARTNERSHIPS',
        title_white: map['cms_clients_title_white'] ?? 'TRUSTED BY',
        title_gradient: map['cms_clients_title_gradient'] ?? 'LEADING B2B BRANDS',
        subtitle: map['cms_clients_subtitle'] ?? 'Building demand with the technology ecosystem trusted by modern enterprises.',
        is_visible: map['cms_clients_visible'] !== '0',
      }
    })
  } catch (error) {
    console.error('Error fetching client section settings:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch client section settings' })
  }
}

// @desc    Update client section settings
// @route   PUT /api/admin/cms/clients-section
export const updateClientSectionSettings = async (req, res) => {
  try {
    const { eyebrow, title_white, title_gradient, subtitle, is_visible } = req.body
    const updates = [
      ['cms_clients_eyebrow', eyebrow],
      ['cms_clients_title_white', title_white],
      ['cms_clients_title_gradient', title_gradient],
      ['cms_clients_subtitle', subtitle],
      ['cms_clients_visible', is_visible !== undefined ? (is_visible ? '1' : '0') : null],
    ]
    for (const [key, value] of updates) {
      if (value !== undefined && value !== null) {
        await db.execute(
          `INSERT INTO settings (key_name, value) VALUES (?, ?)
           ON DUPLICATE KEY UPDATE value = VALUES(value), updated_at = CURRENT_TIMESTAMP`,
          [key, String(value)]
        )
      }
    }
    res.json({ success: true, message: 'Client section settings updated successfully' })
  } catch (error) {
    console.error('Error updating client section settings:', error)
    res.status(500).json({ success: false, message: 'Failed to update client section settings' })
  }
}
