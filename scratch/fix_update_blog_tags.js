const fs = require('fs');

function fixUpdateBlogTags() {
  let content = fs.readFileSync('server/controllers/admin/blog.controller.js', 'utf8');

  // Fix updateBlog to append tags to updates
  content = content.replace(
    /if \(canonical_url !== undefined\) \{/,
    "if (tags !== undefined) {\n      updates.push('tags = ?')\n      values.push(JSON.stringify(tags))\n    }\n\n    if (canonical_url !== undefined) {"
  );

  // Remove the old blog_tags logic
  const oldBlogTagsLogic = `    // Update tags if provided
    if (tags !== undefined) {
      try {
        await db.execute('DELETE FROM blog_tags WHERE blog_id = ?', [id])
        for (const tagId of tags) {
          await db.execute('INSERT INTO blog_tags (blog_id, tag_id) VALUES (?, ?)', [id, tagId])
        }
        await db.execute('UPDATE tags SET post_count = (SELECT COUNT(*) FROM blog_tags WHERE tag_id = tags.id)')
      } catch (tagErr) {      }
    }`;
    
  content = content.replace(oldBlogTagsLogic, '');

  fs.writeFileSync('server/controllers/admin/blog.controller.js', content);
}

fixUpdateBlogTags();
