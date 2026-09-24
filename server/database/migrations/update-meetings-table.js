/**
 * Migration: Enhance meetings table with Google Calendar, Meet, and status tracking
 */

import mysql from 'mysql2/promise'
import 'dotenv/config'

const runMigration = async () => {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_NAME || 'tarajglobal',
  })

  console.log('🔄 Running meetings table migration...')

  try {
    // Helper to check if column exists
    const checkColumnExists = async (table, column) => {
      const [rows] = await db.query(
        `SELECT COUNT(*) as count 
         FROM information_schema.columns 
         WHERE table_schema = ? AND table_name = ? AND column_name = ?`,
        [process.env.DB_NAME || 'tarajglobal', table, column]
      )
      return rows[0].count > 0
    }

    // 1. Add interest column
    if (!(await checkColumnExists('meetings', 'interest'))) {
      await db.query(`ALTER TABLE meetings ADD COLUMN interest VARCHAR(150) NULL DEFAULT 'Strategy Call' AFTER phone`)
      console.log('  + Added column interest')
    }

    // 2. Add message column
    if (!(await checkColumnExists('meetings', 'message'))) {
      await db.query(`ALTER TABLE meetings ADD COLUMN message TEXT NULL AFTER interest`)
      console.log('  + Added column message')
    }

    // 3. Add start_time column
    if (!(await checkColumnExists('meetings', 'start_time'))) {
      await db.query(`ALTER TABLE meetings ADD COLUMN start_time VARCHAR(20) NULL AFTER meeting_time`)
      console.log('  + Added column start_time')
    }

    // 4. Add end_time column
    if (!(await checkColumnExists('meetings', 'end_time'))) {
      await db.query(`ALTER TABLE meetings ADD COLUMN end_time VARCHAR(20) NULL AFTER start_time`)
      console.log('  + Added column end_time')
    }

    // 5. Update status ENUM to include 'failed'
    await db.query(`
      ALTER TABLE meetings 
      MODIFY COLUMN status ENUM('pending', 'confirmed', 'cancelled', 'completed', 'failed') DEFAULT 'pending'
    `)
    console.log('  + Updated status ENUM')

    // 6. Add calendar_event_id column
    if (!(await checkColumnExists('meetings', 'calendar_event_id'))) {
      await db.query(`ALTER TABLE meetings ADD COLUMN calendar_event_id VARCHAR(255) NULL AFTER status`)
      console.log('  + Added column calendar_event_id')
    }

    // 7. Add calendar_event_link column
    if (!(await checkColumnExists('meetings', 'calendar_event_link'))) {
      await db.query(`ALTER TABLE meetings ADD COLUMN calendar_event_link TEXT NULL AFTER calendar_event_id`)
      console.log('  + Added column calendar_event_link')
    }

    // 8. Add meeting_link column (for Google Meet URL)
    if (!(await checkColumnExists('meetings', 'meeting_link'))) {
      await db.query(`ALTER TABLE meetings ADD COLUMN meeting_link TEXT NULL AFTER calendar_event_link`)
      console.log('  + Added column meeting_link')
    }

    // 9. Add calendar_sync_status column
    if (!(await checkColumnExists('meetings', 'calendar_sync_status'))) {
      await db.query(`
        ALTER TABLE meetings 
        ADD COLUMN calendar_sync_status ENUM('pending', 'synced', 'failed') DEFAULT 'pending' 
        AFTER meeting_link
      `)
      console.log('  + Added column calendar_sync_status')
    }

    // 10. Add email_status column
    if (!(await checkColumnExists('meetings', 'email_status'))) {
      await db.query(`
        ALTER TABLE meetings 
        ADD COLUMN email_status ENUM('pending', 'sent', 'failed') DEFAULT 'pending' 
        AFTER calendar_sync_status
      `)
      console.log('  + Added column email_status')
    }

    // 11. Add cancellation_reason column
    if (!(await checkColumnExists('meetings', 'cancellation_reason'))) {
      await db.query(`ALTER TABLE meetings ADD COLUMN cancellation_reason TEXT NULL AFTER email_status`)
      console.log('  + Added column cancellation_reason')
    }

    // 12. Check and add index on meeting_date and meeting_time
    const [indexRows] = await db.query(
      `SELECT COUNT(*) as count 
       FROM information_schema.statistics 
       WHERE table_schema = ? AND table_name = 'meetings' AND index_name = 'idx_slot_lookup'`,
      [process.env.DB_NAME || 'tarajglobal']
    )
    if (indexRows[0].count === 0) {
      await db.query(`CREATE INDEX idx_slot_lookup ON meetings (meeting_date, meeting_time, status)`)
      console.log('  + Added composite index idx_slot_lookup')
    }

    console.log('✅ Meetings table migration completed successfully.')
  } catch (err) {
    console.error('❌ Migration failed:', err)
    throw err
  } finally {
    await db.end()
  }
}

runMigration().catch(() => process.exit(1))
