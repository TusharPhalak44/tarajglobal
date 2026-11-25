import db from '../../config/db.js'

/**
 * Migration: Create career_gallery table and ensure career_events and career_event_photos integrity.
 * Populates career_gallery from existing career_events and career_event_photos data without creating an empty table.
 */
export const migrateCareerGallery = async () => {
  try {
    console.log('🔄 [Migration] Verifying Career Gallery database schema...')

    // 1. Ensure career_events table exists
    await db.query(`
      CREATE TABLE IF NOT EXISTS career_events (
        id VARCHAR(50) NOT NULL PRIMARY KEY,
        num VARCHAR(10) NOT NULL,
        title VARCHAR(255) NOT NULL,
        tag VARCHAR(100) DEFAULT NULL,
        category VARCHAR(100) DEFAULT NULL,
        quarter VARCHAR(100) DEFAULT NULL,
        description TEXT,
        color VARCHAR(20) DEFAULT '#00A6FF',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `)

    // 2. Ensure career_event_photos table exists
    await db.query(`
      CREATE TABLE IF NOT EXISTS career_event_photos (
        id VARCHAR(50) NOT NULL PRIMARY KEY,
        event_id VARCHAR(50) NOT NULL,
        src VARCHAR(500) NOT NULL,
        title VARCHAR(255) DEFAULT NULL,
        caption TEXT,
        tag VARCHAR(100) DEFAULT NULL,
        date VARCHAR(100) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_event_id (event_id),
        CONSTRAINT fk_career_event_photos FOREIGN KEY (event_id) REFERENCES career_events (id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `)

    // 3. Ensure career_gallery table exists
    await db.query(`
      CREATE TABLE IF NOT EXISTS career_gallery (
        id VARCHAR(50) NOT NULL PRIMARY KEY,
        num VARCHAR(10) NOT NULL,
        title VARCHAR(255) NOT NULL,
        tag VARCHAR(100) DEFAULT NULL,
        image VARCHAR(500) DEFAULT NULL,
        count VARCHAR(100) DEFAULT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_num (num)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `)

    // Ensure collation alignment with career_events (utf8mb4_general_ci)
    try {
      await db.query(`ALTER TABLE career_gallery CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;`)
    } catch (collateErr) {
      // Ignore if already aligned
    }

    // 4. Remove obsolete mock/test records (e.g. monthly-performers-8137 with 0 photos / missing assets)
    await db.query(`DELETE FROM career_gallery WHERE id = 'monthly-performers-8137';`)
    await db.query(`DELETE FROM career_events WHERE id = 'monthly-performers-8137';`)
    await db.query(`
      DELETE FROM career_gallery 
      WHERE id NOT IN (SELECT id COLLATE utf8mb4_general_ci FROM career_events);
    `)

    // 5. Inspect and synchronize career_gallery rows from career_events and photos
    const [events] = await db.query('SELECT * FROM career_events ORDER BY num ASC, created_at ASC')
    const [photos] = await db.query('SELECT * FROM career_event_photos ORDER BY created_at ASC')

    if (events.length > 0) {
      for (const event of events) {
        const eventPhotos = photos.filter(p => p.event_id === event.id)
        const coverImage = eventPhotos.length > 0 ? eventPhotos[0].src : '/pk2.jpeg'
        const countStr = `${eventPhotos.length} Captured Moments`

        await db.execute(`
          INSERT INTO career_gallery (id, num, title, tag, image, count, description)
          VALUES (?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE 
            num = VALUES(num),
            title = VALUES(title),
            tag = VALUES(tag),
            image = VALUES(image),
            count = VALUES(count),
            description = VALUES(description)
        `, [
          event.id,
          event.num || '01',
          event.title,
          event.tag || event.category || 'Life at Taraj',
          coverImage,
          countStr,
          event.description || ''
        ])
      }
      console.log(`  ✅ career_gallery verified (${events.length} active albums ready).`)
    } else {
      console.log('  ℹ️ career_gallery: No active events found in career_events.')
    }

    console.log('✅ Career Gallery tables and relationships verified successfully!')
    return { success: true }
  } catch (error) {
    console.error('❌ Career Gallery migration error:', error.message)
    throw error
  }
}

export default migrateCareerGallery
