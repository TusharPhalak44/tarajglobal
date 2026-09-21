/**
 * Run job_applications table migration
 * Usage: node database/migrations/run-job-applications.js
 */

import { up } from './create-job-applications.js'

try {
  await up()
  console.log('✅ Migration completed successfully')
  process.exit(0)
} catch (error) {
  console.error('❌ Migration failed:', error)
  process.exit(1)
}
