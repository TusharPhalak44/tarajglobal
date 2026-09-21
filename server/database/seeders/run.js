/**
 * Seeder runner
 * Usage: npm run seed
 */

import { execSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const seeders = [
  'admin.seeder.js',
]

for (const seeder of seeders) {
  const filePath = path.join(__dirname, seeder)
  console.log(`\n▶ Running ${seeder}...`)
  try {
    execSync(`node "${filePath}"`, { stdio: 'inherit' })
  } catch (err) {
    console.error(`❌ Seeder ${seeder} failed.`)
  }
}

console.log('\n✅ All seeders completed.')
