import api from './axios'

export const chatbotAPI = {
  createLead: (data) => api.post('/chatbot/leads', data),
}
