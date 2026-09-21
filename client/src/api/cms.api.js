import api from './axios'

export const cmsAPI = {
  // Navbar
  getNavbarItems: () => api.get('/cms/navbar', { params: { _t: Date.now() } }),
  getLogo: () => api.get('/cms/logo', { params: { _t: Date.now() } }),

  // Footer
  getFooterData: () => api.get('/footer'),

  // Footer Links
  getFooterLinks: () => api.get('/cms/footer-links'),
  getFooterLinksBySection: (section) => api.get(`/cms/footer-links/${section}`),

  // Footer Social Links
  getFooterSocialLinks: () => api.get('/cms/footer-social-links'),

  // Clients
  getClients: () => api.get('/cms/clients'),
  getClientSectionSettings: () => api.get('/cms/clients-section'),
}
