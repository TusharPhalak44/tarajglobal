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
  
  // Looking for the dropdown container div which looks like:
  // <div className={`absolute right-0 ... `}>
  // Or:
  // <div className={`absolute right-0 ${...} w-44 bg-[var(--admin-bg-surface)] ...`}>
  
  // We can just find absolute right-0 and add flex flex-col to it
  // But wait, there could be other absolute right-0 elements.
  // We can add flex flex-col specifically to the dropdown containers which have `z-50` and `absolute right-0`.
  
  content = content.replace(/(<div className=\{`absolute right-0[^`]*z-50[^`]*?)(`\}>)/g, (match, p1, p2) => {
    if (!p1.includes('flex flex-col')) {
      return p1 + ' flex flex-col' + p2;
    }
    return match;
  });

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed dropdown in ' + file);
    changedFiles++;
  }
});

console.log('Total files changed: ' + changedFiles);
