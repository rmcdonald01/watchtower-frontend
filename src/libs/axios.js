import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:881/' : 'https://mywatchtower.gq/',
  // In the event that I want to test with another device on my local network
  // baseURL: process.env.NODE_ENV === 'development' ? 'http://192.168.0.8:881/' : 'https://mywatchtower.gq/',
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

Vue.prototype.$http = axiosIns

export default axiosIns
