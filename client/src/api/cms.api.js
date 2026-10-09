import api from './axios'

export const cmsAPI = {
  // Navbar
  getNavbarItems: (fresh = false) => api.get('/cms/navbar', { params: fresh ? { _t: Date.now() } : undefined }),
  getLogo: (fresh = false) => api.get('/cms/logo', { params: fresh ? { _t: Date.now() } : undefined }),

  // Footer
  getFooterData: () => api.get('/footer'),

  // Clients
  getClients: () => api.get('/cms/clients'),
  getClientSectionSettings: () => api.get('/cms/clients-section'),
}
