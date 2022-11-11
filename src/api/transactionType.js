import api from './api'

const URLS = {
  transactionTypes: '/api/v1/expense/types',
}

export const getTransactionTypes = () => api.get(URLS.transactionTypes, {})
