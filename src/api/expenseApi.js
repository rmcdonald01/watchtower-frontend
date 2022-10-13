import api from './api'

const URLS = {
  addExpense: '/api/expense',
}

export const storeExpense = body => api.post(URLS.addExpense, body)
