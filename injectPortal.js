const fs = require('fs');
const path = require('path');

function processFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Add import if not exists
  if (!content.includes('ActionDropdown')) {
    // Find last import
    const lastImportIndex = content.lastIndexOf('import ');
    const endOfLastImport = content.indexOf('\n', lastImportIndex);
    content = content.slice(0, endOfLastImport + 1) + 
              "import ActionDropdown from '../../components/admin/ActionDropdown';\n" + 
              content.slice(endOfLastImport + 1);
  }

  // Remove the padding hack from admin-table-wrapper
  content = content.replace(/style=\{\{\s*paddingBottom:\s*activeDropdown[^}]+\}\}/g, '');

  // We need to find the <div className="relative"> that wraps the MoreVertical button
  // We'll use a regex that matches the opening block
  const startRegex = /<div className="relative">\s*<button[^>]+onClick=\{\([^)]+\)\s*=>\s*\{[^}]*setActiveDropdown\([^)]+\)[^}]*\}\}[^>]*>\s*<MoreVertical[^>]*\/>\s*<\/button>\s*\{activeDropdown\s*===[^&]+&&\s*\(\s*<>\s*<div[^>]+fixed inset-0[^>]+>\s*<\/div>\s*<div[^>]+absolute right-0[^>]+>/;

  let match;
  while ((match = startRegex.exec(content)) !== null) {
    const startIndex = match.index;
    const matchLength = match[0].length;
    
    // Now we need to find the closing tags:
    // </div>
    // </>
    // )}
    // </div>
    
    // To do this reliably, we can search for the end of the block starting from matchLength
    const endSnippet = "</div>\n                            </>\n                          )}\n                        </div>";
    // Or we can just find the matching closing </div> of the absolute div, then </>, )}, </div>
    // A simpler way: since we know the structure, let's just use string replacement if we format it carefully
  }

  // Actually, since there are only 5 files, writing a rigid string replacer is easier
  const files = {
      'Blogs.jsx': { item: 'blog', arr: 'blogs' },
      'Archives.jsx': { item: 'item', arr: 'filteredItems' },
      'Drafts.jsx': { item: 'item', arr: 'drafts' },
      'Jobs.jsx': { item: 'job', arr: 'jobs' },
      'Users.jsx': { item: 'user', arr: 'users' }
  };

  const filename = path.basename(file);
  if (files[filename]) {
      const { item, arr } = files[filename];
      
      // Let's use a more flexible regex to replace the start
      const regexStart = new RegExp(`<div className="relative">[\\s\\S]*?<MoreVertical className="w-5 h-5" />[\\s\\S]*?</button>[\\s\\S]*?{activeDropdown === ${item}.id && \\([\\s\\S]*?<>\\s*<div className="fixed inset-0 z-40"[^>]*></div>\\s*<div className={\`absolute right-0[^>]+flex flex-col\`}>`);
      
      content = content.replace(regexStart, `<ActionDropdown>`);
      
      // The end is exactly:
      //                              </div>
      //                            </>
      //                          )}
      //                        </div>
      // We can replace the first occurrence of this after the ActionDropdown
      // But it's safer to just replace all instances of this exact block if they exist
      const regexEnd = /<\/div>\s*<\/>\s*\)}\s*<\/div>/g;
      // Wait, there might be spacing issues.
      // Let's just find the closing tags manually for each file.
  }
}
