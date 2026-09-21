import { describe, it, expect, beforeAll, afterAll } from '@jest/globals'
import request from 'supertest'
import app from '../app.js'
import db from '../config/db.js'

describe('Blog API', () => {
  let adminToken
  let testBlogId

  beforeAll(async () => {
    // Create admin user and get token
    await db.execute('DELETE FROM users WHERE email = ?', ['admin@test.com'])
    await db.execute(`
      INSERT INTO users (name, email, password, role, status)
      VALUES ('Admin', 'admin@test.com', '$2b$10$testhashedpassword', 'super_admin', 'active')
    `)
    
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@test.com',
        password: 'Test@123456'
      })
    
    adminToken = loginResponse.body.data.token
  })

  afterAll(async () => {
    // Clean up test data
    await db.execute('DELETE FROM blogs WHERE title LIKE ?', ['%Test Blog%'])
    await db.execute('DELETE FROM users WHERE email = ?', ['admin@test.com'])
  })

  describe('POST /api/admin/blogs', () => {
    it('should create a blog post', async () => {
      const response = await request(app)
        .post('/api/admin/blogs')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Test Blog Post',
          slug: 'test-blog-post',
          content: 'This is test content',
          excerpt: 'Test excerpt',
          status: 'draft',
          author_id: 1
        })

      expect(response.status).toBe(201)
      expect(response.body.success).toBe(true)
      testBlogId = response.body.data.id
    })

    it('should not create blog without auth', async () => {
      const response = await request(app)
        .post('/api/admin/blogs')
        .send({
          title: 'Test Blog Post',
          content: 'Test content'
        })

      expect(response.status).toBe(401)
    })
  })

  describe('GET /api/admin/blogs', () => {
    it('should get all blogs', async () => {
      const response = await request(app)
        .get('/api/admin/blogs')
        .set('Authorization', `Bearer ${adminToken}`)

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(Array.isArray(response.body.data.blogs)).toBe(true)
    })

    it('should filter blogs by status', async () => {
      const response = await request(app)
        .get('/api/admin/blogs?status=draft')
        .set('Authorization', `Bearer ${adminToken}`)

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
    })
  })

  describe('GET /api/admin/blogs/:id', () => {
    it('should get blog by ID', async () => {
      const response = await request(app)
        .get(`/api/admin/blogs/${testBlogId}`)
        .set('Authorization', `Bearer ${adminToken}`)

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.data.id).toBe(testBlogId)
    })

    it('should return 404 for non-existent blog', async () => {
      const response = await request(app)
        .get('/api/admin/blogs/99999')
        .set('Authorization', `Bearer ${adminToken}`)

      expect(response.status).toBe(404)
    })
  })

  describe('PUT /api/admin/blogs/:id', () => {
    it('should update blog post', async () => {
      const response = await request(app)
        .put(`/api/admin/blogs/${testBlogId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Updated Test Blog Post'
        })

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
    })
  })

  describe('DELETE /api/admin/blogs/:id', () => {
    it('should delete blog post', async () => {
      const response = await request(app)
        .delete(`/api/admin/blogs/${testBlogId}`)
        .set('Authorization', `Bearer ${adminToken}`)

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
    })
  })
})
