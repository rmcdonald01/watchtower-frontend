import axios from '@axios'

export default {
  namespaced: true,
  state: {
    budget_overview: [],
    budget_categories_sum: [],
    daily_expense_bar_chart:[],
  },
  getters: {
    getBudgetOverview: state => state.budget_overview,
    hasBudgetOverview (state) {
      return state.budget_overview.data && state.budget_overview.data.amount;
    },
    hasBudgetCategoriesSum(state) {
      return state.budget_categories_sum.data && state.budget_categories_sum.labels;
    },
    getBudgetCategoriesSum (state) {
      if(state.budget_categories_sum.data){
        let series = []
        state.budget_categories_sum.data.forEach( category => {
          series.push(category.total_expense);
        });
        return series;
      }

      return [];
    },
    getBudgetCategoriesLabels(state) {
      // if(state.budget_categories_sum.data){
      //   let labels = []
      //   state.budget_categories_sum.data.forEach( category => {
      //     series.push(category.total_expense);
      //   });
      //   return labels;
      // }

      return state.budget_categories_sum.labels;
    },
    getExpenseDailyBarChart(state){
      return state.daily_expense_bar_chart
    },
    hasDailyExpenseBarChart(state) {
      //state.daily_expense_bar_chart = {}
      return Object.keys(state.daily_expense_bar_chart).length > 0 && Object.keys(state.daily_expense_bar_chart.data.data).length > 0
    },
    getDailyExpenseBarChart(state) {
      return state.daily_expense_bar_chart;
    },

  },
  mutations: {
    SET_BUDGET_OVERVIEW (state, budget) {
      state.budget_overview = budget
    },
    SET_BUDGET_CATEGORIES_SUM (state, budget_categories) {
      state.budget_categories_sum = budget_categories
    },
    SET_DAILY_EXPENSE_BAR_CHART(state, daily_expense){
      state.daily_expense_bar_chart = daily_expense
    }
  },
  actions: {
     fetchBudgetOverview({ commit }, queryParams) {
          return new Promise((resolve, reject) => {
            axios.get('/api/budgetoverview')
            .then((response) => {
              commit('SET_BUDGET_OVERVIEW', response.data)
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
          })
    },
    fetchExpensBudgetCategries({commit}) {
      return new Promise((resolve, reject) => {
        axios.get('/api/budget-expenses/categories/sum')
          .then((response) => {
            commit('SET_BUDGET_CATEGORIES_SUM', response.data)
            resolve(response);
          }).catch((error) => {
            reject(error)
          })
      });
    },
    fetchMonthlyExpenseForLineChart({commit}, queryParams){
      new Promise((resolve, reject) => {
        axios.get('/api/expense/monthly/line-chart', queryParams)
        .then((response) => {
          resolve(response)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    fetchDailyExpenseBarChart({ commit }, queryParams ) {
      return new Promise((resolve, reject) => {
        axios.get('/api/expense/report/daily-bar-chart', {}).then(response => {
          commit('SET_DAILY_EXPENSE_BAR_CHART', response.data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
  },

}
