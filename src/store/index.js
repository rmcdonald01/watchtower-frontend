import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import expense from './expense/expenseStoreModule'
import category from './category/categoryStoreModule'
import budget from './budget/storeModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    expense,
    category,
    budget,
  },
  strict: process.env.DEV,
})
