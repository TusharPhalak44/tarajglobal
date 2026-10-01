const fs = require('fs');

function updateController() {
  let p = 'server/controllers/admin/blog.controller.js';
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace(/slug = generateSlug\(title, existingSlugs\)\s*\}/, "slug = customSlug ? generateSlug(customSlug, existingSlugs) : generateSlug(title, existingSlugs)\n    }");
  fs.writeFileSync(p, c);
}

function updateFrontend(p) {
  let c = fs.readFileSync(p, 'utf8');
  
  // Title / Slug grid to stack (full width)
  c = c.replace(/<div className="grid grid-cols-1 md:grid-cols-\[2fr_1fr\] gap-6">/g, '<div className="space-y-4">');

  // Title: add maxLength=200
  c = c.replace(/name="title"\s+value=\{createForm\.title\}\s+onChange=\{handleInputChange\}/, 'name="title" value={createForm.title} onChange={handleInputChange} maxLength={200}');
  
  // Slug: add onBlur validation
  c = c.replace(/name="slug"\s+value=\{createForm\.slug\}\s+onChange=\{handleInputChange\}/, 'name="slug" value={createForm.slug} onChange={handleInputChange} onBlur={(e) => setCreateForm(prev => ({...prev, slug: generateSlug(e.target.value)}))} maxLength={200}');
  
  // Excerpt: add maxLength=160
  c = c.replace(/name="excerpt"\s+value=\{createForm\.excerpt\}\s+onChange=\{handleInputChange\}\s+rows=\{2\}/, 'name="excerpt" value={createForm.excerpt} onChange={handleInputChange} rows={2} maxLength={160}');

  fs.writeFileSync(p, c);
}

updateController();
updateFrontend('client/src/pages/Admin/CreateBlog.jsx');
updateFrontend('client/src/pages/Admin/EditBlog.jsx');
