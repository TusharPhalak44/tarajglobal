const http = require('http');

const request = (options, postData) => {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    });

    req.on('error', (e) => reject(e));

    if (postData) {
      req.write(postData);
    }
    req.end();
  });
};

async function testWorkflow() {
  try {
    console.log("=== CREATE BLOG ===");
    const createPayload = JSON.stringify({
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
    });

    const createOptions = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/admin/blogs',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(createPayload)
      }
    };

    const createRes = await request(createOptions, createPayload);
    console.log("Create Response:", createRes);
    
    if (!createRes.data || !createRes.data.id) {
      console.log("Failed to get blog ID from create response");
      return;
    }
    
    const blogId = createRes.data.id;

    console.log("\\n=== GET BLOG AFTER CREATE ===");
    const getOptions1 = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/admin/blogs/' + blogId,
      method: 'GET'
    };
    
    const getRes1 = await request(getOptions1);
    console.log("Get Response 1:", getRes1);

    console.log("\\n=== UPDATE BLOG ===");
    const updatePayload = JSON.stringify({
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
    });

    const updateOptions = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/admin/blogs/' + blogId,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(updatePayload)
      }
    };

    const updateRes = await request(updateOptions, updatePayload);
    console.log("Update Response:", updateRes);

    console.log("\\n=== GET BLOG AFTER UPDATE ===");
    const getOptions2 = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/admin/blogs/' + blogId,
      method: 'GET'
    };
    
    const getRes2 = await request(getOptions2);
    console.log("Get Response 2:", getRes2);

  } catch (error) {
    console.error("Test Error:", error);
  }
}

testWorkflow();
