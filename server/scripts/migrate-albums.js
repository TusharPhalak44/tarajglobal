import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import db from '../config/db.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function run() {
  try {
    const albumsPath = path.resolve(__dirname, '../../client/src/pages/Careers/data/albumsData.js')
    const rawData = fs.readFileSync(albumsPath, 'utf-8')
    
    // Convert export to local var for eval
    const code = rawData.replace('export const ALBUMS_DATA =', 'const ALBUMS_DATA =') + '\nreturn ALBUMS_DATA;'
    const ALBUMS_DATA = new Function(code)()
    
    console.log(`Found ${ALBUMS_DATA.length} albums.`)

    // Clear existing data
    console.log('Clearing existing gallery data...')
    await db.execute('DELETE FROM career_event_photos')
    await db.execute('DELETE FROM career_events')

    for (const album of ALBUMS_DATA) {
      console.log(`Migrating album: ${album.title}`)
      
      const id = album.id || (album.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4))
      
      // Insert Event
      const [result] = await db.execute(
        `INSERT INTO career_events (id, title, tag, category, quarter, description, color, num)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, album.title, album.tag || '', album.category || '', album.quarter || '', album.desc || '', album.color || '', album.num || '']
      )
      
      // Insert Photos
      if (album.photos && album.photos.length > 0) {
        for (const photo of album.photos) {
          const photoId = photo.id || `${id}-photo-${Date.now().toString().slice(-4)}-${Math.floor(Math.random() * 1000)}`
          await db.execute(
            `INSERT INTO career_event_photos (id, event_id, src, title, caption, tag, date)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [photoId, id, photo.src, photo.title || '', photo.caption || '', photo.tag || '', photo.date || '']
          )
        }
      }
    }
    
    console.log('Migration completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  }
}

run()
