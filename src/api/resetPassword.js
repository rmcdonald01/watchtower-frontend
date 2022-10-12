import api from './api'
const URLS = {
    resetPassword: '/api/auth/reset-password',
  }
export const resetPassword = (body) => {
    return api.post(URLS.resetPassword, body);
}
