/**
 * Create or Upgrade Super Admin
 * 
 * Usage:
 *   docker exec tarajglobal_server node database/seeders/create-super-admin.js <email> [password] [name]
 * 
 * Examples:
 *   # Upgrade existing user to super_admin:
 *   docker exec tarajglobal_server node database/seeders/create-super-admin.js rutika.rathod@tgstechinfo.com
 * 
 *   # Create new super_admin account:
 *   docker exec tarajglobal_server node database/seeders/create-super-admin.js newadmin@tarajglobal.com MyPassword@123 "My Name"
 */

import bcrypt from 'bcrypt'
import db from '../../config/db.js'

const email = process.argv[2]
const password = process.argv[3]
const name = process.argv[4] || 'Super Admin'

if (!email) {
  console.log('\n❌ Usage: node database/seeders/create-super-admin.js <email> [password] [name]\n')
  process.exit(1)
}

try {
  const [existing] = await db.query('SELECT id, name, email, role FROM users WHERE email = ?', [email])

  if (existing.length > 0) {
    // If password provided, update both password and role; else promote to admin
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12)
      await db.query(
        'UPDATE users SET role = ?, password = ?, status = ? WHERE email = ?',
        ['admin', hashedPassword, 'active', email]
      )
      console.log(`\n✅ User ${email} has been updated to role "admin" with the new password!`)
    } else {
      await db.query(
        'UPDATE users SET role = ?, status = ? WHERE email = ?',
        ['admin', 'active', email]
      )
      console.log(`\n✅ User ${email} has been promoted to role "admin"!`)
    }
  } else {
    if (!password) {
      console.log('\n❌ Account does not exist. Please provide a password to create a new admin account:')
      console.log('   node database/seeders/create-super-admin.js <email> <password> [name]\n')
      process.exit(1)
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    await db.query(
      'INSERT INTO users (name, email, password, role, status) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, 'admin', 'active']
    )
    console.log(`\n✅ New admin user created successfully: ${email}`)
  }

  const [users] = await db.query('SELECT id, name, email, role, status FROM users')
  console.log('\n📋 Current Users in System:')
  console.table(users)
} catch (err) {
  console.error('\n❌ Error:', err.message)
} finally {
  process.exit(0)
}
