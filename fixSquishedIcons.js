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
  
  // Revert user's test sizes back to w-5 h-5
  content = content.replace(/w-10 h-10/g, 'w-5 h-5');
  content = content.replace(/w-12 h-12/g, 'w-5 h-5');
  
  // Upgrade w-4 h-4 to w-5 h-5 ONLY in the action buttons (Edit, Eye, MoreVertical)
  // Actually, we can upgrade all Edit, Eye, MoreVertical icons that have w-4 h-4 to w-5 h-5
  content = content.replace(/<(Edit|Eye|MoreVertical|Trash2|Power|Key) className="w-4 h-4/g, '<$1 className="w-5 h-5');
  
  // Add shrink-0 to buttons that are in the actions column.
  // We can look for buttons inside the actions column, or just add shrink-0 to all buttons that have 'p-2 rounded-lg border'
  content = content.replace(/className="p-2 rounded-lg border border-\[var\(--admin-border-subtle\)\]/g, 'className="shrink-0 p-2 rounded-lg border border-[var(--admin-border-subtle)]');
  
  // Also add shrink-0 to the dropdown trigger if it doesn't have it
  content = content.replace(/className="p-2 rounded-lg text-\[var\(--admin-text-muted\)\]/g, 'className="shrink-0 p-2 rounded-lg text-[var(--admin-text-muted)]');
  
  // Also add shrink-0 to the flex container itself just in case it's in a flex row somewhere
  content = content.replace(/<div className="flex items-center justify-end gap-1">/g, '<div className="flex items-center justify-end gap-1.5 min-w-max">');
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed squished icons in ' + file);
    changedFiles++;
  }
});

console.log('Total files changed: ' + changedFiles);
