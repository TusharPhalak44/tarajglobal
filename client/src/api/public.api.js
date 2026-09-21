import api from './axios'

export const publicAPI = {
  // Blogs
  getBlogs: (params) => api.get('/blog', { params }),
  getBlogBySlug: (slug, params) => api.get(`/blog/${slug}`, { params }),
  
  // Jobs
  getJobs: (params) => api.get('/jobs', { params }),
  getJobById: (id) => api.get(`/jobs/${id}`),
  
  // Categories
  getCategories: () => api.get('/categories'),
  getCategoryBySlug: (slug) => api.get(`/categories/${slug}`),
  
  // Authors
  getAuthors: () => api.get('/authors'),
  getAuthorBySlug: (slug) => api.get(`/authors/${slug}`),
  
  // Contact
  bookMeeting: (data) => api.post('/contact/meeting', data),
}
