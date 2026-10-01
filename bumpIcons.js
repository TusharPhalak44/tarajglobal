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
    
    // Bump w-3.5 h-3.5 to w-4 h-4 or w-[18px] h-[18px]
    // I will bump w-3.5 h-3.5 -> w-4 h-4 (16px)
    // and w-4 h-4 -> w-[18px] h-[18px] (only inside buttons with p-1.5 or p-2 maybe)
    // Let's just bump all `w-3.5 h-3.5` to `w-[18px] h-[18px]` for icons.
    
    // But `w-3.5 h-3.5` could be used elsewhere. Usually it's icons.
    content = content.replace(/w-3\.5 h-3\.5/g, 'w-[18px] h-[18px]');
    
    // Also bump w-4 h-4? No, w-4 h-4 is standard (16px). But if we want action icons to be bigger, maybe w-[18px] is good.
    // The user's screenshot showed the `w-3.5 h-3.5` ones in Blogs.jsx.
    
    // Bump p-1.5 to p-2 for slightly larger clickable area
    content = content.replace(/p-1\.5/g, 'p-2');
    
    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log('Bumped icons in ' + file);
      changedFiles++;
    }
  });
});

console.log('Total files changed: ' + changedFiles);
