/*=========================================================================================
  File Name: moduleCalendarMutations.js
  Description: Calendar Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default {

  SET_CATEGORIES (state, categories) {
    state.categories = categories
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
  SET_EXPENSE (state, expenses) {
    state.expenses = expenses
  },
  SET_PRODUCTS (state, products) {
    state.products = products
  },


}
