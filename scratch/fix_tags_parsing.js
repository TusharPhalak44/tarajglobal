const fs = require('fs');

function fixTagsParsing() {
  let content = fs.readFileSync('server/controllers/admin/blog.controller.js', 'utf8');

  // getBlogById
  content = content.replace(
    /blog\.tags = blog\.tags \? blog\.tags\.split\(\',\'\) : \[\]/g,
    "try { blog.tags = blog.tags ? (typeof blog.tags === 'string' ? JSON.parse(blog.tags) : blog.tags) : [] } catch(e) { blog.tags = [] }"
  );

  // remove debug log
  content = content.replace(
    /const blog = blogs\[0\]; console\.log\('blogs\[0\]\.tags:', blog\.tags\);/g,
    "const blog = blogs[0];"
  );

  // getAllBlogs has the same issue probably?
  content = content.replace(
    /b\.tags = b\.tags \? b\.tags\.split\(\',\'\) : \[\]/g,
    "try { b.tags = b.tags ? (typeof b.tags === 'string' ? JSON.parse(b.tags) : b.tags) : [] } catch(e) { b.tags = [] }"
  );

  fs.writeFileSync('server/controllers/admin/blog.controller.js', content);
}

fixTagsParsing();
