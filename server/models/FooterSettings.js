import db from '../config/db.js'

const cleanCopyright = (text) => {
  if (!text) return text
  return text.replace(/[┬Â][⌐¬©]?/g, '©').replace(/©+/g, '©').trim()
}

class FooterSettings {
  static async get() {
    const [rows] = await db.execute('SELECT * FROM footer_settings LIMIT 1')
    if (rows[0] && rows[0].copyright_text) {
      rows[0].copyright_text = cleanCopyright(rows[0].copyright_text)
    }
    return rows[0] || null
  }

  static async update(settingsData) {
    const { company_name, company_description, short_description, logo_url, is_logo_visible, is_description_visible, copyright_text, cert_image_url, is_cert_image_visible } = settingsData
    const sanitizedCopyright = cleanCopyright(copyright_text) || 'Copyright © {year} Taraj Global. All Rights Reserved.'
    
    // Check if settings exist
    const [existing] = await db.execute('SELECT id FROM footer_settings LIMIT 1')
    
    if (existing.length > 0) {
      // Update existing
      const [result] = await db.execute(
        'UPDATE footer_settings SET company_name = ?, company_description = ?, short_description = ?, logo_url = ?, is_logo_visible = ?, is_description_visible = ?, copyright_text = ?, cert_image_url = ?, is_cert_image_visible = ? WHERE id = ?',
        [
          company_name || 'TaRaj Global',
          company_description || null,
          short_description || null,
          logo_url || null,
          is_logo_visible == 0 || is_logo_visible === 'false' ? 0 : 1,
          is_description_visible == 0 || is_description_visible === 'false' ? 0 : 1,
          sanitizedCopyright,
          cert_image_url || null,
          is_cert_image_visible == 0 || is_cert_image_visible === 'false' ? 0 : 1,
          existing[0].id
        ]
      )
      return result.affectedRows > 0
    } else {
      // Insert new
      const [result] = await db.execute(
        'INSERT INTO footer_settings (company_name, company_description, short_description, logo_url, is_logo_visible, is_description_visible, copyright_text, cert_image_url, is_cert_image_visible) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          company_name || 'TaRaj Global',
          company_description || null,
          short_description || null,
          logo_url || null,
          is_logo_visible == 0 || is_logo_visible === 'false' ? 0 : 1,
          is_description_visible == 0 || is_description_visible === 'false' ? 0 : 1,
          sanitizedCopyright,
          cert_image_url || null,
          is_cert_image_visible == 0 || is_cert_image_visible === 'false' ? 0 : 1
        ]
      )
      return result.insertId
    }
  }
}

export default FooterSettings
