<template>
  <section id="dashboard-ecommerce">
    <!-- Monthly Expenses Line chart -->
    <b-row class="match-height">
      <b-col lg="8" md="6">
        <card-monthly-expense-line-chart
          v-if="hasExpenseMonthly"
          :expenseMonthly="expenseMonthly"
        />
      </b-col>
      <!-- Budget Overview Card -->
      <b-col lg="4" md="6">
        <financial-budget-overview
          v-if="hasBudgetOverview"
          :data="data.finGoalOverview"
          :budgetOverview="budgetOverview"
        />
      </b-col>
      <!--/ Budget Overview Card -->
    </b-row>
    <!-- / Monthly Expenses Line chart -->
    <b-row class="match-height">
      <b-col xl="6" md="6">
        <expense-horizontal-bar-chart v-if="hasDailyExpenseBarChart" :daily-expense-bar-chart="dailyExpenseBarChart"/>
      </b-col>
    </b-row>



  </section>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'

// import { getUserData } from '@/auth/utils';
// import EcommerceMedal from './EcommerceMedal.vue';
// import EcommerceStatistics from './EcommerceStatistics.vue';
// import EcommerceRevenueReport from './EcommerceRevenueReport.vue';
// import EcommerceOrderChart from './EcommerceOrderChart.vue';
// import EcommerceProfitChart from './EcommerceProfitChart.vue';
// import EcommerceEarningsChart from './EcommerceEarningsChart.vue';
// import EcommerceCompanyTable from './EcommerceCompanyTable.vue';
// import EcommerceMeetup from './EcommerceMeetup.vue';
// import EcommerceBrowserStates from './EcommerceBrowserStates.vue';
// import EcommerceGoalOverview from './EcommerceGoalOverview.vue';
// import EcommerceTransactions from './EcommerceTransactions.vue';
import budgetStoreModule from '@/store/dashboard/budget-overview'
import FinEcommerceEarningsChart from './finance/EcommerceEarningsChart.vue'
import FinancialBudgetOverview from './finance/BudgetOverview.vue'
import FinancialSavingsOverview from './finance/FinancialSavingsOverview.vue'
import CardMonthlyExpenseLineChart from './finance/MonthlyExpenseLineChart.vue'
import ExpenseHorizontalBarChart from './finance/components/ExpenseHorizontalBarChart.vue'
import store from '@/store'

export default {
  components: {
    BRow,
    BCol,
    FinEcommerceEarningsChart,
    FinancialBudgetOverview,
    FinancialSavingsOverview,
    CardMonthlyExpenseLineChart,
    ExpenseHorizontalBarChart,
  },
  data() {
    return {
      data: {}
    }
  },
  computed: {
    // test out using the mapGetters
    budgetOverview() {
      return this.$store.getters['dashboardBudget/getBudgetOverview'].data
    },
    hasBudgetOverview() {
      return this.$store.getters['dashboardBudget/hasBudgetOverview']
    },
    hasExpenseMonthly() {
      // console.log(this.$store.getters['expense/expenseMonthly'])
      return this.$store.getters['expense/hasExpenseMonthly']
    },
    expenseMonthly() {
      // console.log(this.$store.getters['expense/expenseMonthly'])
      return this.$store.getters['expense/expenseMonthly']
    },
    dailyExpenseBarChart() {
      return this.$store.getters['dashboardBudget/getDailyExpenseBarChart']
    },
    hasDailyExpenseBarChart() {
      return this.$store.getters['dashboardBudget/hasDailyExpenseBarChart']
    },
  },
  created() {
    const BUDGET_APP_STORE_MODULE_NAME = 'dashboardBudget'

    // Register module
    if (!this.$store.hasModule(BUDGET_APP_STORE_MODULE_NAME))
      this.$store.registerModule(
        BUDGET_APP_STORE_MODULE_NAME,
        budgetStoreModule,
      )

  },
  onUnmounted() {
    const BUDGET_APP_STORE_MODULE_NAME = 'dashboardBudget';
    if (this.$store.hasModule(BUDGET_APP_STORE_MODULE_NAME))
      this.$store.unregisterModule(BUDGET_APP_STORE_MODULE_NAME);
  },
  methods: {
    loadBudgetOverview() {
      //fetch buget overview
      this.$store.dispatch('dashboardBudget/fetchBudgetOverview');
    }
  },
  mounted() {
    // Dispatch
    // fetch Monthly Expense For LineChart
    this.$store.dispatch('expense/fetchMonthlyExpenseForLineChart');
    //fetch Budget Overview
    this.$store.dispatch('dashboardBudget/fetchBudgetOverview');
    // fetch Daily Expense (Balance)
    this.$store.dispatch('dashboardBudget/fetchDailyExpenseBarChart');
    //this.$store.dispatch('expense/fetchMonthlyExpenseForLineChart');
  }
};
</script>

<style lang="scss">
@import '@core/scss/vue/libs/chart-apex.scss';
</style>
