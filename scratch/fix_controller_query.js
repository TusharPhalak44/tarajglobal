const fs = require('fs');

function forceFixQuery() {
  let content = fs.readFileSync('server/controllers/admin/blog.controller.js', 'utf8');

  // getBlogById
  content = content.replace(
    /GROUP_CONCAT\(t\.name\) as tags,[\s\n]*GROUP_CONCAT\(t\.id\) as tag_ids/g,
    ""
  );
  content = content.replace(
    /LEFT JOIN blog_tags bt ON b\.id = bt\.blog_id[\s\n]*LEFT JOIN tags t ON bt\.tag_id = t\.id/g,
    ""
  );
  
  // also getBlogById GROUP BY
  content = content.replace(
    /WHERE b\.id = \?[\s\n]*GROUP BY b\.id/g,
    "WHERE b.id = ?"
  );
  
  // getAllBlogs GROUP BY
  content = content.replace(
    /ORDER BY b\.created_at DESC[\s\n]*LIMIT/g,
    "ORDER BY b.created_at DESC LIMIT"
  );
  // Wait, getAllBlogs has a GROUP BY too
  content = content.replace(
    /GROUP BY b\.id[\s\n]*ORDER BY/g,
    "ORDER BY"
  );

  fs.writeFileSync('server/controllers/admin/blog.controller.js', content);
}

forceFixQuery();
