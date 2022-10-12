import api from './api'

const URLS = {
  fetchStockPurchases: '/api/stock/purchase',
}

export const fetchStockPurchases = () => {
  return api.get(URLS.fetchStockPurchases, {
   // baseURL: 'https://dog.ceo/api/',
  })
}

export const fetchKitty = () => {
  return api.get(URLS.fetchKittyUrl, {
    baseURL: 'https://api.thecatapi.com/v1/',
  })
}
