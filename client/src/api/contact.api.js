import api from './axios'

export const contactAPI = {
  submit: (data) => api.post('/contact', data),
  getAll: () => api.get('/contact'),
  getById: (id) => api.get(`/contact/${id}`),
}
