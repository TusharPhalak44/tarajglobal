import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const filePath = path.resolve(__dirname, '../../client/dist/blog/tgstechinfo/index.html')
const html = fs.readFileSync(filePath, 'utf8')

console.log('File:', filePath)
console.log('Has @vite/client?', html.includes('@vite/client'))
console.log('Has /src/main.jsx?', html.includes('/src/main.jsx'))
const scripts = (html.match(/<script[^>]*src=["'](.*?)["']/gi) || []).map(s => s.match(/src=["'](.*?)["']/i)[1])
console.log('Script tags:', scripts)
console.log('Title:', (html.match(/<title>([^<]*)<\/title>/i) || [])[1])
console.log('Canonical:', (html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["'](.*?)["']/i) || [])[1])
console.log('Description:', (html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) || [])[1])
console.log('OG Title:', (html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["']/i) || [])[1])
