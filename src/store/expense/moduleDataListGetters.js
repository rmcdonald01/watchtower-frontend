/*=========================================================================================
  File Name: moduleCalendarGetters.js
  Description: Calendar Module Getters
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default {
  // getItem: state => (productId) => state.products.find((product) => product.id == productId),
  expenseMonthly: state => state.expenseMonthly.data,
  hasExpenseMonthly(state) {
    return Object.keys(state.expenseMonthly).length > 0  && Object.keys(state.expenseMonthly.data.data).length > 0
  },
  expenses: state => state.expenses
}
