const fs = require('fs');

function fixControllerTags() {
  let content = fs.readFileSync('server/controllers/admin/blog.controller.js', 'utf8');

  // Fix getBlogById
  const oldQuery = `GROUP_CONCAT(t.name) as tags,
        GROUP_CONCAT(t.id) as tag_ids
      FROM blogs b
      LEFT JOIN categories c ON b.category_id = c.id
      LEFT JOIN authors a ON b.author_id = a.id
      LEFT JOIN blog_tags bt ON b.id = bt.blog_id
      LEFT JOIN tags t ON bt.tag_id = t.id`;
  
  const newQuery = `b.tags as json_tags
      FROM blogs b
      LEFT JOIN categories c ON b.category_id = c.id
      LEFT JOIN authors a ON b.author_id = a.id`;
      
  content = content.replace(oldQuery, newQuery);

  const oldParsing = `blog.tags = blog.tags ? blog.tags.split(',') : []
    blog.tag_ids = blog.tag_ids ? blog.tag_ids.split(',').map(Number) : []`;
    
  const newParsing = `try {
      blog.tags = blog.tags ? (typeof blog.tags === 'string' ? JSON.parse(blog.tags) : blog.tags) : []
    } catch(e) {
      blog.tags = []
    }
    blog.tag_ids = []`;
    
  content = content.replace(oldParsing, newParsing);

  // Fix getAllBlogs
  const oldAllQuery = `GROUP_CONCAT(t.name) as tags,
          GROUP_CONCAT(t.id) as tag_ids
        FROM blogs b
        LEFT JOIN categories c ON b.category_id = c.id
        LEFT JOIN authors a ON b.author_id = a.id
        LEFT JOIN blog_tags bt ON b.id = bt.blog_id
        LEFT JOIN tags t ON bt.tag_id = t.id`;
        
  const newAllQuery = `b.tags as json_tags
        FROM blogs b
        LEFT JOIN categories c ON b.category_id = c.id
        LEFT JOIN authors a ON b.author_id = a.id`;
        
  content = content.replace(oldAllQuery, newAllQuery);

  const oldAllParsing = `blog.tags = blog.tags ? blog.tags.split(',') : []
        blog.tag_ids = blog.tag_ids ? blog.tag_ids.split(',').map(Number) : []`;
        
  const newAllParsing = `try {
          blog.tags = blog.tags ? (typeof blog.tags === 'string' ? JSON.parse(blog.tags) : blog.tags) : []
        } catch(e) {
          blog.tags = []
        }
        blog.tag_ids = []`;
        
  content = content.replace(oldAllParsing, newAllParsing);

  fs.writeFileSync('server/controllers/admin/blog.controller.js', content);
}

fixControllerTags();
