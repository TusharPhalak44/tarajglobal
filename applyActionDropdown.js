const fs = require('fs');

function applyJobs() {
    let content = fs.readFileSync('client/src/pages/Admin/Jobs.jsx', 'utf8');
    
    // Add import if missing
    if (!content.includes('ActionDropdown')) {
        content = content.replace("import React, { useState, useEffect } from 'react'", "import React, { useState, useEffect } from 'react'\nimport ActionDropdown from '../../components/admin/ActionDropdown'");
    }

    const startRegex = /<div className="relative">\s*<button\s*onClick={\(e\) => {\s*e\.stopPropagation\(\)\s*setActiveDropdown\(activeDropdown === job\.id \? null : job\.id\)\s*}}\s*className="p-2 rounded-lg text-\[var\(--admin-text-muted\)\] hover:text-\[var\(--admin-text-primary\)\] hover:bg-\[var\(--admin-bg-elevated\)\] transition-colors"\s*>\s*<MoreVertical className="w-5 h-5" \/>\s*<\/button>\s*{activeDropdown === job\.id && \(\s*<>\s*<div className="fixed inset-0 z-40" onClick={\(\) => setActiveDropdown\(null\)} \/>\s*<div className="absolute right-0 top-full mt-1\.5 w-40 bg-\[var\(--admin-bg-card\)\] border border-\[var\(--admin-border-base\)\] rounded-xl shadow-xl p-2 z-50 text-sm admin-card-hover">/;
    
    const replacement = `<ActionDropdown buttonClassName="shrink-0 p-2 rounded-lg text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-bg-elevated)] transition-colors" dropdownClassName="p-2 min-w-[10rem]">`;
                      
    content = content.replace(startRegex, replacement);
    
    const endRegex = /<\/div>\s*<\/>\s*\)}\s*<\/div>/;
    const endReplacement = `</ActionDropdown>`;
                
    content = content.replace(endRegex, endReplacement);
    
    fs.writeFileSync('client/src/pages/Admin/Jobs.jsx', content);
    console.log('Jobs.jsx updated');
}

function applyUsers() {
    let content = fs.readFileSync('client/src/pages/Admin/Users.jsx', 'utf8');
    
    // Add import if missing
    if (!content.includes('ActionDropdown')) {
        content = content.replace("import React, { useState, useEffect } from 'react'", "import React, { useState, useEffect } from 'react'\nimport ActionDropdown from '../../components/admin/ActionDropdown'");
    }

    const startRegex = /<div className="relative inline-block text-left">[\s\S]*?<div className={`absolute right-0 \${[^}]*} w-48 bg-\[var\(--admin-bg-surface\)\] border border-\[var\(--admin-border-base\)\] rounded-xl shadow-2xl z-50 p-1 divide-y divide-\[var\(--admin-border-subtle\)\] animate-slide-down flex flex-col`}>/;
    
    const replacement = `<ActionDropdown buttonClassName="shrink-0 p-2 rounded-lg text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-bg-elevated)] transition-colors" dropdownClassName="p-1 min-w-[12rem]">`;
                              
    content = content.replace(startRegex, replacement);
    
    const endRegex = /<\/div>\s*<\/>\s*\)}\s*<\/div>/;
    const endReplacement = `</ActionDropdown>`;
                        
    content = content.replace(endRegex, endReplacement);
    
    fs.writeFileSync('client/src/pages/Admin/Users.jsx', content);
    console.log('Users.jsx updated');
}

applyJobs();
applyUsers();
