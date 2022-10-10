/*=========================================================================================
  File Name: moduleCalendarActions.js
  Description: Calendar Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import axios from '@axios'

export default {

  
  //Development working example

  fetchCategories ({ commit }, queryParams) {
    return new Promise((resolve, reject) => {
      axios.get('/api/categories', { params: queryParams })
        .then((response) => {
          commit('SET_CATEGORIES', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  addCategory ({ commit }, expense) {
    return new Promise((resolve, reject) => {
      axios.post('/api/category/', expense)
        .then((response) => {
          //commit('ADD_ITEM', Object.assign(item, {id: response.data.id}))
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  // fetchDailyExpenses ({ commit }, queryParams) {
  //   return new Promise((resolve, reject) => {
  //     axios.post('/api/expense/daily', { params: queryParams })
  //       .then((response) => {
  //         commit('SET_EXPENSE', response.data)
  //         resolve(response)
  //       })
  //       .catch((error) => { reject(error) })
  //   })
  // },
  // fetchMonthlyExpenses ({ commit }, queryParams) {
  //   return new Promise((resolve, reject) => {
  //     axios.post('/api/expense/monthly', { params: queryParams })
  //       .then((response) => {
  //         commit('SET_EXPENSE', response.data)
  //         resolve(response)
  //       })
  //       .catch((error) => { reject(error) })
  //   })
  // },

  // fetchWeeklyExpense ({ commit }) {
  //   return new Promise((resolve, reject) => {
  //     axios.get('/api/products')
  //       .then((response) => {
  //         commit('SET_PRODUCTS', response.data)
  //         resolve(response)
  //       })
  //       .catch((error) => { reject(error) })
  //   })
  // },

}
