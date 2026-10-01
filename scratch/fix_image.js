const fs = require('fs');

function replaceFeaturedImage(filePath, formName, setFormName) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Search for the Featured Image block
  const regex = /<div>\s*<label className="block text-xs font-bold text-\[var\(--admin-text-primary\)\] mb-1\.5">\s*Featured Image\s*<\/label>[\s\S]*?<div className="mt-2 text-right">[\s\S]*?<\/button>\s*<\/div>\s*<\/div>/;

  const newComponent = `<div>
                <label className="block text-xs font-bold text-[var(--admin-text-primary)] mb-1.5">
                  Featured Image <span className="text-[10px] text-[var(--admin-text-muted)] font-normal ml-2">(Max 50MB)</span>
                </label>
                <FeaturedMedia 
                  value={${formName}.featured_image || ${formName}.image} 
                  onChange={(url) => ${setFormName}(prev => ({...prev, featured_image: url, image: url}))} 
                />
              </div>`;

  if (content.match(regex)) {
    content = content.replace(regex, newComponent);
  } else {
    console.log('Regex not matched in', filePath);
  }

  // Ensure FeaturedMedia is imported
  if (!content.includes("import FeaturedMedia")) {
    content = content.replace("import { adminAPI } from '@api'", "import { adminAPI } from '@api'\nimport FeaturedMedia from '@components/admin/FeaturedMedia'");
  }

  fs.writeFileSync(filePath, content);
}

replaceFeaturedImage('client/src/pages/Admin/CreateBlog.jsx', 'createForm', 'setCreateForm');
replaceFeaturedImage('client/src/pages/Admin/EditBlog.jsx', 'editForm', 'setEditForm');
