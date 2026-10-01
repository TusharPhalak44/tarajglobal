const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(file => {
    let fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath, callback);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      callback(fullPath);
    }
  });
}

const dirs = [
  'client/src/pages/Admin',
  'client/src/components/admin'
];

let changedFiles = 0;

dirs.forEach(dir => {
  walk(dir, file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Fix the arbitrary value bug
    content = content.replace(/w-\[18px\] h-\[18px\]/g, 'w-4 h-4');
    
    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log('Fixed icons in ' + file);
      changedFiles++;
    }
  });
});

console.log('Total files changed: ' + changedFiles);
