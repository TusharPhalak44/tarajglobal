import { createBlog, updateBlog, getBlogById as getBlog } from './controllers/admin/blog.controller.js';
import db from './config/db.js';

const mockRes = {
  status: function(s) {
    this.statusCode = s;
    return this;
  },
  json: function(data) {
    this.data = data;
    return this;
  }
};

async function testWorkflow() {
  console.log("=== CREATE BLOG ===");
  const req1 = {
    body: {
      title: "Test Blog Title",
      slug: "test-blog-title",
      content: "<p>Hello world!</p>",
      excerpt: "Test excerpt",
      category_id: 1,
      author_id: 1,
      status: "draft",
      tags: ["Test", "API"],
      featured_image: "/uploads/media/test.jpg",
      seo_title: "SEO Title",
      seo_description: "SEO Description",
      seo_keywords: "SEO, keywords"
    }
  };
  
  const res1 = { ...mockRes };
  await createBlog(req1, res1);
  console.log("Create Response:", res1.data);
  
  const blogId = res1.data.data.id;

  console.log("\\n=== GET BLOG AFTER CREATE ===");
  const req2 = { params: { id: blogId } };
  const res2 = { ...mockRes };
  await getBlog(req2, res2);
  console.log("Get Response 1:", res2.data.data);

  console.log("\\n=== UPDATE BLOG ===");
  const req3 = {
    params: { id: blogId },
    body: {
      title: "Updated Blog Title",
      slug: "updated-blog-title",
      content: "<p>Updated content</p>",
      excerpt: "Updated excerpt",
      category_id: 2,
      author_id: 2,
      status: "published",
      tags: ["Updated", "Tag"],
      featured_image: "/uploads/media/updated.jpg",
      seo_title: "Updated SEO Title",
      seo_description: "Updated SEO Description",
      seo_keywords: "Updated, keywords"
    }
  };
  const res3 = { ...mockRes };
  await updateBlog(req3, res3);
  console.log("Update Response:", res3.data);

  console.log("\\n=== GET BLOG AFTER UPDATE ===");
  const req4 = { params: { id: blogId } };
  const res4 = { ...mockRes };
  await getBlog(req4, res4);
  console.log("Get Response 2:", res4.data.data);
  
  process.exit(0);
}

testWorkflow();
