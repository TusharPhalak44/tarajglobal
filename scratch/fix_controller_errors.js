const fs = require('fs');

function fixControllerErrors() {
  let content = fs.readFileSync('server/controllers/admin/blog.controller.js', 'utf8');

  // Fix createBlog
  content = content.replace(
    /res\.status\(500\)\.json\(\{ success: false, message: 'Internal server error' \}\)/g,
    `if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ success: false, message: 'Duplicate entry detected (likely slug).' })
    }
    res.status(500).json({ success: false, message: 'Internal server error' })`
  );

  fs.writeFileSync('server/controllers/admin/blog.controller.js', content);
}

fixControllerErrors();
