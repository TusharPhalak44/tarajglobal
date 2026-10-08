/**
 * Create or Update User CLI helper
 * 
 * Usage:
 *   docker exec tarajglobal_server node database/seeders/create-user.js <email> <password> [name] [role: admin|user]
 * 
 * Example:
 *   docker exec tarajglobal_server node database/seeders/create-user.js writer@tarajglobal.com Pass@123 "Blog Writer" user
 *   docker exec tarajglobal_server node database/seeders/create-user.js newadmin@tarajglobal.com Pass@123 "New Admin" admin
 */

import bcrypt from 'bcrypt'
import db from '../../config/db.js'

const email = process.argv[2]
const password = process.argv[3]
const name = process.argv[4] || 'User'
const role = (process.argv[5] || 'admin').toLowerCase() === 'user' ? 'user' : 'admin'

if (!email || !password) {
  console.log('\n❌ Usage: node database/seeders/create-user.js <email> <password> [name] [role: admin|user]\n')
  process.exit(1)
}

try {
  const [existing] = await db.query('SELECT id, name, email, role FROM users WHERE email = ?', [email])
  const hashedPassword = await bcrypt.hash(password, 12)

  if (existing.length > 0) {
    await db.query(
      'UPDATE users SET role = ?, password = ?, name = ?, status = ? WHERE email = ?',
      [role, hashedPassword, name || existing[0].name, 'active', email]
    )
    console.log(`\n✅ User ${email} updated successfully with role "${role}"!`)
  } else {
    await db.query(
      'INSERT INTO users (name, email, password, role, status) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, role, 'active']
    )
    console.log(`\n✅ User created successfully: ${email} with role "${role}"!`)
  }

  const [users] = await db.query('SELECT id, name, email, role, status FROM users')
  console.log('\n📋 Current Users in System:')
  console.table(users)
} catch (err) {
  console.error('\n❌ Error:', err.message)
} finally {
  process.exit(0)
}
