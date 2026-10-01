const fs = require('fs');

function fixSlug(filePath, formSetter) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  content = content.replace(
    new RegExp(`onBlur=\\{\\(e\\) =>\\s*\\{fieldErrors\\.slug && <span className="text-red-500 text-\\[11px\\] mt-1 block">\\{fieldErrors\\.slug\\}</span>\\}\\s*${formSetter}\\(prev => \\(\\{\\.\\.\\.prev, slug: generateSlug\\(e\\.target\\.value\\)\\}\\)\\)\\}\\s*maxLength=\\{200\\}`),
    `onBlur={(e) => ${formSetter}(prev => ({...prev, slug: generateSlug(e.target.value)}))} maxLength={200}`
  );
  
  content = content.replace(
    /<TrendingUp className="w-4 h-4 absolute right-3 top-1\/2 -translate-y-1\/2 text-\[var\(--admin-text-muted\)\]" \/>\s*<\/div>/g,
    `<TrendingUp className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)]" />\n                  </div>\n                  {fieldErrors.slug && <span className="text-red-500 text-[11px] mt-1 block">{fieldErrors.slug}</span>}`
  );
  
  fs.writeFileSync(filePath, content);
}

fixSlug('client/src/pages/Admin/CreateBlog.jsx', 'setCreateForm');
fixSlug('client/src/pages/Admin/EditBlog.jsx', 'setEditForm');
