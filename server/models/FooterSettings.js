import db from '../config/db.js'

class FooterSettings {
  static async get() {
    const [rows] = await db.execute('SELECT * FROM footer_settings LIMIT 1')
    return rows[0] || null
  }

  static async update(settingsData) {
    const { company_name, company_description, short_description, logo_url, is_logo_visible, is_description_visible, copyright_text } = settingsData
    
    // Check if settings exist
    const [existing] = await db.execute('SELECT id FROM footer_settings LIMIT 1')
    
    if (existing.length > 0) {
      // Update existing
      const [result] = await db.execute(
        'UPDATE footer_settings SET company_name = ?, company_description = ?, short_description = ?, logo_url = ?, is_logo_visible = ?, is_description_visible = ?, copyright_text = ? WHERE id = ?',
        [
          company_name || 'TaRaj Global',
          company_description || null,
          short_description || null,
          logo_url || null,
          is_logo_visible == 0 || is_logo_visible === 'false' ? 0 : 1,
          is_description_visible == 0 || is_description_visible === 'false' ? 0 : 1,
          copyright_text || 'Copyright © {year} Taraj Global. All Rights Reserved.',
          existing[0].id
        ]
      )
      return result.affectedRows > 0
    } else {
      // Insert new
      const [result] = await db.execute(
        'INSERT INTO footer_settings (company_name, company_description, short_description, logo_url, is_logo_visible, is_description_visible, copyright_text) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          company_name || 'TaRaj Global',
          company_description || null,
          short_description || null,
          logo_url || null,
          is_logo_visible == 0 || is_logo_visible === 'false' ? 0 : 1,
          is_description_visible == 0 || is_description_visible === 'false' ? 0 : 1,
          copyright_text || 'Copyright © {year} Taraj Global. All Rights Reserved.'
        ]
      )
      return result.insertId
    }
  }
}

export default FooterSettings
