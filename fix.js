const fs = require('fs');
const path = 'client/src/styles/admin.css';
let content = fs.readFileSync(path, 'utf16le'); // Read the corrupted part
if (!content.includes('.admin-select')) {
  // try utf8
  content = fs.readFileSync(path, 'utf8');
}
// Strip the bad appended string
const idx = content.indexOf('. a d m i n - s e l e c t');
if (idx !== -1) {
  content = content.substring(0, idx);
} else {
  // Might be \0 separated
  const badIdx = content.indexOf('.\0a\0d\0m\0i\0n\0-\0s\0e\0l\0e\0c\0t');
  if (badIdx !== -1) {
    content = content.substring(0, badIdx);
  }
}

// Ensure clean content
content = content.replace(/\0/g, '');

const newCSS = `
.admin-select {
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  background-size: 16px;
  padding-right: 36px;
  cursor: pointer;
}
.dark .admin-select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
}
`;

fs.writeFileSync(path, content + newCSS, 'utf8');
console.log('Fixed CSS');
