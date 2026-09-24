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
  
  // Meetings / Strategy Call
  getMeetingAvailability: (date) => api.get('/meetings/availability', { params: { date } }),
  bookMeeting: (data) => api.post('/meetings', data),
  getMeetingByBookingId: (bookingId) => api.get(`/meetings/booking/${bookingId}`),

  // Career Gallery
  getCareerGallery: () => api.get('/career-gallery'),
}

