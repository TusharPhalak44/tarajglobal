import api from './axios'

export const adminAPI = {
  // Dashboard
  getAnalyticsDashboard: () => api.get('/admin/analytics/dashboard'),

  // Blogs
  getBlogs: (params) => api.get('/admin/blogs', { params }),
  getBlogById: (id) => api.get(`/admin/blogs/${id}`),
  createBlog: (data) => api.post('/admin/blogs', data),
  updateBlog: (id, data) => api.put(`/admin/blogs/${id}`, data),
  deleteBlog: (id) => api.delete(`/admin/blogs/${id}`),
  bulkBlogAction: (data) => api.post('/admin/blogs/bulk', data),

  // Categories
  getCategories: () => api.get('/admin/categories'),
  getCategoryById: (id) => api.get(`/admin/categories/${id}`),
  createCategory: (data) => api.post('/admin/categories', data),
  updateCategory: (id, data) => api.put(`/admin/categories/${id}`, data),
  deleteCategory: (id) => api.delete(`/admin/categories/${id}`),

  // Tags
  getTags: () => api.get('/admin/tags'),
  createTag: (data) => api.post('/admin/tags', data),
  updateTag: (id, data) => api.put(`/admin/tags/${id}`, data),
  deleteTag: (id) => api.delete(`/admin/tags/${id}`),

  // Authors
  getAuthors: () => api.get('/admin/authors'),
  getAuthorById: (id) => api.get(`/admin/authors/${id}`),
  createAuthor: (data) => api.post('/admin/authors', data),
  updateAuthor: (id, data) => api.put(`/admin/authors/${id}`, data),
  deleteAuthor: (id) => api.delete(`/admin/authors/${id}`),

  // Jobs
  getJobs: (params) => api.get('/admin/jobs', { params }),
  getJobById: (id) => api.get(`/admin/jobs/${id}`),
  createJob: (data) => api.post('/admin/jobs', data),
  updateJob: (id, data) => api.put(`/admin/jobs/${id}`, data),
  deleteJob: (id) => api.delete(`/admin/jobs/${id}`),

  // Applications
  getApplications: (params) => api.get('/admin/applications', { params }),
  getApplicationById: (id) => api.get(`/admin/applications/${id}`),
  updateApplicationStatus: (id, data) => api.patch(`/admin/applications/${id}/status`, data),
  addApplicationNote: (id, data) => api.post(`/admin/applications/${id}/notes`, data),
  deleteApplication: (id) => api.delete(`/admin/applications/${id}`),
  bulkApplicationAction: (data) => api.post('/admin/applications/bulk', data),

  // Users
  getUsers: (params) => api.get('/admin/users', { params }),
  getUserById: (id) => api.get(`/admin/users/${id}`),
  createUser: (data) => api.post('/admin/users', data),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  updateUserStatus: (id, data) => api.patch(`/admin/users/${id}/status`, data),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  resetUserPassword: (id, data) => api.post(`/admin/users/${id}/reset-password`, data),

  // Leads / Contact submissions
  getLeads: (params) => api.get('/admin/leads', { params }),
  getLeadById: (id) => api.get(`/admin/leads/${id}`),
  updateLeadStatus: (id, data) => api.patch(`/admin/leads/${id}/status`, data),
  deleteLead: (id) => api.delete(`/admin/leads/${id}`),

  // Media
  getMedia: (params) => api.get('/admin/media', { params }),
  uploadMedia: (formData, config = {}) => api.post('/admin/media/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    ...config
  }),
  deleteMedia: (id) => api.delete(`/admin/media/${id}`),

  // Settings
  getSettings: () => api.get('/admin/settings'),
  updateSettings: (data) => api.put('/admin/settings', data),

  // Notifications
  getNotifications: (params) => api.get('/admin/notifications', { params }),
  markNotificationRead: (id) => api.patch(`/admin/notifications/${id}/read`),
  markAllNotificationsRead: () => api.patch('/admin/notifications/read-all'),
  deleteNotification: (id) => api.delete(`/admin/notifications/${id}`),

  // Audit Logs
  getAuditLogs: (params) => api.get('/admin/audit-logs', { params }),

  // SEO
  getSEO: (entityType, entityId) => api.get(`/admin/seo/${entityType}/${entityId}`),
  saveSEO: (entityType, entityId, data) => api.post(`/admin/seo/${entityType}/${entityId}`, data),
  deleteSEO: (entityType, entityId) => api.delete(`/admin/seo/${entityType}/${entityId}`),

  // CMS - Navbar
  getNavbarItems: () => api.get('/admin/cms/navbar'),
  createNavbarItem: (data) => api.post('/admin/cms/navbar', data),
  updateNavbarItem: (id, data) => api.put(`/admin/cms/navbar/${id}`, data),
  deleteNavbarItem: (id) => api.delete(`/admin/cms/navbar/${id}`),
  reorderNavbarItems: (data) => api.put('/admin/cms/navbar/reorder', data),
  getLogo: () => api.get('/admin/cms/logo'),
  updateLogo: (data) => api.put('/admin/cms/logo', data),

  // CMS - Footer Links
  getFooterLinks: () => api.get('/admin/cms/footer-links'),
  createFooterLink: (data) => api.post('/admin/cms/footer-links', data),
  updateFooterLink: (id, data) => api.put(`/admin/cms/footer-links/${id}`, data),
  deleteFooterLink: (id) => api.delete(`/admin/cms/footer-links/${id}`),
  reorderFooterLinks: (data) => api.put('/admin/cms/footer-links/reorder', data),

  // CMS - Footer Social Links
  getFooterSocialLinks: () => api.get('/admin/cms/footer-social-links'),
  createFooterSocialLink: (data) => api.post('/admin/cms/footer-social-links', data),
  updateFooterSocialLink: (id, data) => api.put(`/admin/cms/footer-social-links/${id}`, data),
  deleteFooterSocialLink: (id) => api.delete(`/admin/cms/footer-social-links/${id}`),
  reorderFooterSocialLinks: (data) => api.put('/admin/cms/footer-social-links/reorder', data),

  // ==================== FOOTER MANAGEMENT ====================
  getFooterSettings: () => api.get('/admin/footer/settings'),
  updateFooterSettings: (data) => api.put('/admin/footer/settings', data),
  getFooterSections: () => api.get('/admin/footer/sections'),
  createFooterSection: (data) => api.post('/admin/footer/sections', data),
  updateFooterSection: (id, data) => api.put(`/admin/footer/sections/${id}`, data),
  deleteFooterSection: (id) => api.delete(`/admin/footer/sections/${id}`),
  reorderFooterSections: (data) => api.post('/admin/footer/sections/reorder', data),
  getFooterLinks: () => api.get('/admin/footer/links'),
  getFooterLinksBySection: (sectionId) => api.get(`/admin/footer/links/section/${sectionId}`),
  createFooterLink: (data) => api.post('/admin/footer/links', data),
  updateFooterLink: (id, data) => api.put(`/admin/footer/links/${id}`, data),
  deleteFooterLink: (id) => api.delete(`/admin/footer/links/${id}`),
  reorderFooterLinks: (data) => api.post('/admin/footer/links/reorder', data),
  getFooterOffices: () => api.get('/admin/footer/offices'),
  createFooterOffice: (data) => api.post('/admin/footer/offices', data),
  updateFooterOffice: (id, data) => api.put(`/admin/footer/offices/${id}`, data),
  deleteFooterOffice: (id) => api.delete(`/admin/footer/offices/${id}`),
  reorderFooterOffices: (data) => api.post('/admin/footer/offices/reorder', data),
  getFooterContactItems: () => api.get('/admin/footer/contact-items'),
  createFooterContactItem: (data) => api.post('/admin/footer/contact-items', data),
  updateFooterContactItem: (id, data) => api.put(`/admin/footer/contact-items/${id}`, data),
  deleteFooterContactItem: (id) => api.delete(`/admin/footer/contact-items/${id}`),
  reorderFooterContactItems: (data) => api.post('/admin/footer/contact-items/reorder', data),
  getFooterSocialLinks: () => api.get('/admin/footer/social-links'),
  createFooterSocialLink: (data) => api.post('/admin/footer/social-links', data),
  updateFooterSocialLink: (id, data) => api.put(`/admin/footer/social-links/${id}`, data),
  deleteFooterSocialLink: (id) => api.delete(`/admin/footer/social-links/${id}`),
  reorderFooterSocialLinks: (data) => api.post('/admin/footer/social-links/reorder', data),

  // CMS - Clients
  getClients: () => api.get('/admin/cms/clients'),
  createClient: (data) => api.post('/admin/cms/clients', data),
  updateClient: (id, data) => api.put(`/admin/cms/clients/${id}`, data),
  deleteClient: (id) => api.delete(`/admin/cms/clients/${id}`),
  reorderClients: (data) => api.put('/admin/cms/clients/reorder', data),
}
