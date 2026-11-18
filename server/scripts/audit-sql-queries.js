import fs from 'fs'
import path from 'path'

function walkDir(dir) {
  let results = []
  const list = fs.readdirSync(dir)
  list.forEach(file => {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules') results = results.concat(walkDir(fullPath))
    } else if (file.endsWith('.js')) {
      results.push(fullPath)
    }
  })
  return results
}

const files = walkDir(path.resolve('server'))
const issues = []

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8')
  const lines = content.split('\n')

  lines.forEach((line, idx) => {
    // Look for query execution with template string interpolation
    if (/(db\.execute|db\.query)\s*\(\s*`[^`]*\$\{([^}]+)\}/.test(line)) {
      // Check if it's dynamic column/table or variable
      const match = line.match(/(db\.execute|db\.query)\s*\(\s*`([^`]+)`/)
      if (match) {
        issues.push({
          file: path.relative(process.cwd(), file),
          line: idx + 1,
          code: line.trim()
        })
      }
    }
  })
}

console.log(`Found ${issues.length} potential dynamic SQL query lines:`)
issues.forEach(i => console.log(`${i.file}:${i.line} -> ${i.code.slice(0, 100)}`))
