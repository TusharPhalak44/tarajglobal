const fs = require('fs');

let content = fs.readFileSync('client/src/pages/Admin/EditBlog.jsx', 'utf8');
content = content.replace(
  /featured_image: blogData\.featured_image \|\| blogData\.image \|\| ''\s*}/,
  "featured_image: blogData.featured_image || blogData.image || '',\n        tags: blogData.tags || []\n      }"
);
fs.writeFileSync('client/src/pages/Admin/EditBlog.jsx', content);
