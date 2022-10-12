import axios from '@axios'
// Main api function
const api = axios =>
// Wrapper functions around axios
  ({
    get: (url, config) => axios.get(url, config),
    post: (url, body, config) => axios.post(url, body, config),
    patch: (url, body, config) => axios.patch(url, body, config),
    delete: (url, config) => axios.delete(url, config),
  })

// Initialise the api function and pass axiosInstance to it
export default api(axios)
