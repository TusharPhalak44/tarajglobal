const fs = require('fs');

function fixComma() {
  let content = fs.readFileSync('server/controllers/admin/blog.controller.js', 'utf8');

  content = content.replace(
    /a\.bio as author_bio,[\s\n]*FROM blogs/g,
    "a.bio as author_bio\n      FROM blogs"
  );

  fs.writeFileSync('server/controllers/admin/blog.controller.js', content);
}

fixComma();
