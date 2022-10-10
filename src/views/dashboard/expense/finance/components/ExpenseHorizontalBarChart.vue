<template>
  <b-card no-body>
    <b-card-header>
      <div>
        <b-card-sub-title class="mb-25">
          Daily Expense (Balance)
        </b-card-sub-title>
        <b-card-title>$77,123</b-card-title>
      </div>
      <!-- datepicker -->
      <div class="d-flex align-items-center">
        <feather-icon
          icon="CalendarIcon"
          size="16"
        />
        <flat-pickr
          v-model="rangePicker"
          :config="{ mode: 'range'}"
          class="form-control flat-picker bg-transparent border-0 shadow-none"
          placeholder="YYYY-MM-DD"
        />
      </div>
      <!-- datepicker -->
    </b-card-header>

    <!-- chart -->
    <b-card-body>
      <chartjs-component-horizontal-bar-chart
        :height="400"
        :data="myDailyExpense.horizontalBarChart.data"
        :options="myDailyExpense.horizontalBarChart.options"
      />
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardBody, BCardHeader, BCardTitle, BCardSubTitle,
} from 'bootstrap-vue'
import flatPickr from 'vue-flatpickr-component'
import ChartjsComponentHorizontalBarChart from './ChartjsComponentHorizontalBarChart.vue'
import chartjsData from './chartjsData'

export default {
  components: {
    BCard,
    BCardBody,
    BCardHeader,
    BCardTitle,
    BCardSubTitle,
    flatPickr,
    ChartjsComponentHorizontalBarChart,
  },
  props: ['dailyExpenseBarChart'],
  data() {
    return {
      chartjsData,
      rangePicker: ['2019-05-01', '2019-05-10'],
    }
  },
  computed: {
    myDailyExpense() {
      this.chartjsData.horizontalBarChart.data.datasets[0].data = this.dailyExpenseBarChart.data.data
      this.chartjsData.horizontalBarChart.data.labels = this.dailyExpenseBarChart.data.label
      return this.chartjsData
    }
  }
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
