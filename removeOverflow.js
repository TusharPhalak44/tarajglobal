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
  
  // Remove overflow-hidden from admin-card
  content = content.replace(/className="admin-card overflow-hidden"/g, 'className="admin-card overflow-visible"');
  
  // If there are other overflow-hidden wrappers around the table, remove them
  content = content.replace(/overflow-x-auto/g, 'overflow-visible');
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Removed overflow hidden in ' + file);
    changedFiles++;
  }
});

console.log('Total files changed: ' + changedFiles);
