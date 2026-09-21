import { describe, it, expect, beforeAll, afterAll } from '@jest/globals'
import request from 'supertest'
import app from '../app.js'
import db from '../config/db.js'

describe('Auth API', () => {
  let testUserId
  let testToken

  beforeAll(async () => {
    // Clean up test data
    await db.execute('DELETE FROM users WHERE email LIKE ?', ['%test@example.com%'])
  })

  afterAll(async () => {
    // Clean up test data
    await db.execute('DELETE FROM users WHERE email LIKE ?', ['%test@example.com%'])
  })

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'Test@123456',
          role: 'user'
        })

      expect(response.status).toBe(201)
      expect(response.body.success).toBe(true)
      expect(response.body.data.user.email).toBe('test@example.com')
      testUserId = response.body.data.user.id
    })

    it('should not register duplicate email', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'Test@123456'
        })

      expect(response.status).toBe(400)
      expect(response.body.success).toBe(false)
    })

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User'
        })

      expect(response.status).toBe(400)
    })
  })

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'Test@123456'
        })

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.data.token).toBeDefined()
      testToken = response.body.data.token
    })

    it('should not login with invalid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        })

      expect(response.status).toBe(401)
      expect(response.body.success).toBe(false)
    })
  })

  describe('GET /api/auth/me', () => {
    it('should get current user with valid token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${testToken}`)

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.data.email).toBe('test@example.com')
    })

    it('should not get user without token', async () => {
      const response = await request(app)
        .get('/api/auth/me')

      expect(response.status).toBe(401)
    })
  })
})
