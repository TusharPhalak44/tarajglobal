import db from '../config/db.js'

async function createTables() {
  try {
    console.log('Creating career_galleries tables...')

    await db.execute(`
      CREATE TABLE IF NOT EXISTS career_events (
        id VARCHAR(50) PRIMARY KEY,
        num VARCHAR(10) NOT NULL,
        title VARCHAR(255) NOT NULL,
        tag VARCHAR(100),
        category VARCHAR(100),
        quarter VARCHAR(100),
        description TEXT,
        color VARCHAR(20) DEFAULT '#00A6FF',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    
    await db.execute(`
      CREATE TABLE IF NOT EXISTS career_event_photos (
        id VARCHAR(50) PRIMARY KEY,
        event_id VARCHAR(50) NOT NULL,
        src VARCHAR(500) NOT NULL,
        title VARCHAR(255),
        caption TEXT,
        tag VARCHAR(100),
        date VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (event_id) REFERENCES career_events(id) ON DELETE CASCADE
      )
    `)

    console.log('Tables created successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Error creating tables:', error)
    process.exit(1)
  }
}

createTables()
