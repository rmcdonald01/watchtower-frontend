import api from './api'

const URLS = {
  resetPassword: '/api/auth/reset-password',
}
export const resetPassword = body => api.post(URLS.resetPassword, body)
