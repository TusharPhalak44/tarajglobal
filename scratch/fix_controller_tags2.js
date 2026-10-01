const fs = require('fs');

function fixControllerTags() {
  let content = fs.readFileSync('server/controllers/admin/blog.controller.js', 'utf8');

  // getBlogById & getAllBlogs aliases
  content = content.replace(/b\.tags as json_tags/g, 'b.tags');

  // fix parsing
  content = content.replace(
    /blog\.tags \? \(typeof blog\.tags === 'string' \? JSON\.parse\(blog\.tags\) : blog\.tags\) : \[\]/g,
    "blog.tags ? (typeof blog.tags === 'string' ? JSON.parse(blog.tags) : blog.tags) : []"
  );

  fs.writeFileSync('server/controllers/admin/blog.controller.js', content);
}

fixControllerTags();
