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

  fetchExpenses ({ commit }, queryParams) {
    return new Promise((resolve, reject) => {
      axios.get('/api/expense', { params: queryParams })
        .then((response) => {
          commit('SET_EXPENSES', response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchExpense ({ commit }, queryParams) {
    return new Promise((resolve, reject) => {
      axios.get('/api/expense/' + queryParams.id)
        .then((response) => {
          commit('SET_EXPENSE', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchDailyExpenses ({ commit }, queryParams) {
    return new Promise((resolve, reject) => {
      axios.get('/api/expense/daily', { params: queryParams })
        .then((response) => {
          commit('SET_EXPENSE', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchMonthlyExpenses ({ commit }, queryParams) {
    return new Promise((resolve, reject) => {
      axios.get('/api/expense/monthly', { params: queryParams })
        .then((response) => {
          commit('SET_EXPENSE', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  addExpense ({ commit }, expense) {
    return new Promise((resolve, reject) => {
      axios.post('/api/expense/', expense)
        .then((response) => {
          //commit('ADD_ITEM', Object.assign(item, {id: response.data.id}))
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  deleteExpense({commit}, params){
    return new Promise((resolve, reject) => {
      axios.delete('/api/expense/' + params.id, {}).then((response) => {
        resolve(response.data)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  fetchWeeklyExpense ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('/api/products')
        .then((response) => {
          commit('SET_PRODUCTS', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchExpensBudgetCategries({commit}) {
    return new Promise((resolve, reject) => {
      axios.get('/api/expense/budget/category')
        .then((response) => {
          commit('SET_SUM_BUDGET_CATEGORIES')
          resolve(response);
        })
    });
  },
  updateExpense({commit}, params) {
    return new Promise((resole, reject) => {
      console.log(params);
      axios.patch('/api/expense/' + params.id, params.expense)
      .then((response) => {
        resole(response)
      }).catch((error) => {
        reject(error);
      })
    })
  },
  fetchMonthlyExpenseForLineChart({commit}, queryParams){
    new Promise((resolve, reject) => {
      axios.get('/api/expense/monthly/line-chart', queryParams)
      .then((response) => {
        commit('SET_EXPENSE_MONTHLY', response.data)
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  }

}
