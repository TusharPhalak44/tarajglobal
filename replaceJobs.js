const fs = require('fs');

function replaceDropdown(file, item, arr) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Add import
    if (!content.includes('ActionDropdown')) {
        content = content.replace('import { useState, useEffect } from \'react\'\n', 'import { useState, useEffect } from \'react\'\nimport ActionDropdown from \'../../components/admin/ActionDropdown\';\n');
    }

    // Since regex is hard to get right with nested braces, let's just find the exact start and end.
    // In Jobs.jsx:
    // <div className="relative">
    //   <button ... onClick={(e) => ... setActiveDropdown(...)}>
    //     <MoreVertical className="w-5 h-5" />
    //   </button>
    //   {activeDropdown === job.id && ( ...
    
    const startRegex = new RegExp(`<div className="relative">\\s*<button[^>]+onClick={[\\s\\S]+?}\\s*>[\\s\\S]*?<MoreVertical className="w-5 h-5" />\\s*</button>\\s*{activeDropdown === ${item}.id && \\(\\s*<>\\s*<div className="fixed inset-0 z-40"[^>]+></div>\\s*<div className="absolute right-0[^"]+">`);
    
    content = content.replace(startRegex, '<ActionDropdown>');
    
    const endRegex = /<\/div>\s*<\/>\s*\)}\s*<\/div>/g;
    
    // We only want to replace the first occurrence of the end pattern AFTER the start pattern.
    // Wait, replacing all of them is fine since there's only one dropdown per row.
    content = content.replace(endRegex, '</ActionDropdown>');

    fs.writeFileSync(file, content);
    console.log(`Replaced dropdown in ${file}`);
}

replaceDropdown('client/src/pages/Admin/Jobs.jsx', 'job');
replaceDropdown('client/src/pages/Admin/Users.jsx', 'user');
