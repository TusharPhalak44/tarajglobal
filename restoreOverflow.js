const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(file => {
    let fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath, callback);
    } else if (fullPath.endsWith('.jsx')) {
      callback(fullPath);
    }
  });
}

const dir = 'client/src/pages/Admin';
let changedFiles = 0;

walk(dir, file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // 1. Restore overflow-hidden to admin-card (I changed it to overflow-visible earlier)
  content = content.replace(/className="admin-card overflow-visible"/g, 'className="admin-card overflow-hidden"');
  
  // 2. Restore overflow-x-auto to admin-table-wrapper if it was removed
  content = content.replace(/className="admin-table-wrapper admin-scrollbar overflow-visible"/g, 'className="admin-table-wrapper admin-scrollbar"');
  
  // 3. Add dynamic padding to admin-table-wrapper so it expands only when dropdown is open
  // Search for: <div className="admin-table-wrapper admin-scrollbar">
  // Replace with: <div className="admin-table-wrapper admin-scrollbar" style={{ paddingBottom: activeDropdown ? '160px' : '0', transition: 'padding 0.2s' }}>
  // Ensure we don't duplicate it if it's already there
  if (content.includes('activeDropdown') && content.includes('className="admin-table-wrapper admin-scrollbar"')) {
      content = content.replace(/<div className="admin-table-wrapper admin-scrollbar">/g, '<div className="admin-table-wrapper admin-scrollbar" style={{ paddingBottom: activeDropdown ? \'160px\' : \'0\', transition: \'padding 0.2s\' }}>');
  }

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Restored overflow and added dynamic padding in ' + file);
    changedFiles++;
  }
});

console.log('Total files changed: ' + changedFiles);
