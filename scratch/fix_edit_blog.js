const fs = require('fs');

function fixEditBlog() {
  let p = 'client/src/pages/Admin/EditBlog.jsx';
  let content = fs.readFileSync(p, 'utf8');
  
  // Replace createForm with editForm
  content = content.replace(/createForm/g, 'editForm');
  content = content.replace(/setCreateForm/g, 'setEditForm');

  fs.writeFileSync(p, content);
}

fixEditBlog();
