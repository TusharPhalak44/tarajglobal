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
    
    content = content.replace(/\btext-xs\b/g, '__TEXT_SM__');
    content = content.replace(/\btext-sm\b/g, '__TEXT_BASE__');
    content = content.replace(/text-\[10px\]/g, '__TEXT_12__');
    content = content.replace(/text-\[11px\]/g, '__TEXT_13__');
    content = content.replace(/text-\[12px\]/g, '__TEXT_SM__');
    content = content.replace(/text-\[13px\]/g, '__TEXT_SM__');
    
    // Now replace placeholders
    content = content.replace(/__TEXT_SM__/g, 'text-sm');
    content = content.replace(/__TEXT_BASE__/g, 'text-base');
    content = content.replace(/__TEXT_12__/g, 'text-[12px]');
    content = content.replace(/__TEXT_13__/g, 'text-[13px]');
    
    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log('Bumped fonts in ' + file);
      changedFiles++;
    }
  });
});

console.log('Total files changed: ' + changedFiles);
