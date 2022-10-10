/*=========================================================================================
  File Name: moduleCalendarMutations.js
  Description: Calendar Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default {

  SET_PRODUCTS (state, products) {
    state.products = products
  },
  UPDATE_PRODUCT (state, product) {
    const productIndex = state.products.findIndex((p) => p.id === product.id)
    Object.assign(state.products[productIndex], product)
  },
  REMOVE_ITEM (state, itemId) {
    const ItemIndex = state.products.findIndex((p) => p.id === itemId)
    state.products.splice(ItemIndex, 1)
  },
  //Developer
  SET_EXPENSES (state, expenses) {
    state.expenses = expenses
  },
  SET_EXPENSE (state, expense) {
    state.expense = expense.data
  },
  SET_PRODUCTS (state, products) {
    state.products = products
  },
  SET_EXPENSE_MONTHLY(state, expenseMonthly) {
    state.expenseMonthly = expenseMonthly
  }


}
