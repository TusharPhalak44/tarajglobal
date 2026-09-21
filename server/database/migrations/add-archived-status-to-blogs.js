/**
 * Migration: Add 'archived' status to blogs table
 * This migration updates the blogs table status ENUM to include 'archived'
 */

import db from '../../config/db.js'

export async function up() {
  try {
    // Check if 'archived' is already in the status ENUM
    const [columns] = await db.execute(`
      SHOW COLUMNS FROM blogs WHERE Field = 'status'
    `)
    
    if (columns[0] && columns[0].Type.includes('archived')) {
      console.log('✅ blogs table already has archived status')
      return
    }

    // Modify the status ENUM to include 'archived'
    await db.execute(`
      ALTER TABLE blogs 
      MODIFY COLUMN status ENUM('draft', 'published', 'archived') DEFAULT 'draft'
    `)
    console.log('✅ Successfully added archived status to blogs table')
  } catch (error) {
    console.error('❌ Error adding archived status to blogs table:', error)
    throw error
  }
}

export async function down() {
  try {
    // Note: Removing a value from ENUM requires recreating the column
    // This is a destructive operation, so we'll just log a warning
    console.log('⚠️  Warning: Rolling back this migration would be destructive')
    console.log('⚠️  To revert, manually set all archived blogs to draft/published first')
  } catch (error) {
    console.error('❌ Error in down migration:', error)
    throw error
  }
}
