<template>
  <b-card no-body>
    <b-card-header class="pb-50">
      <h5>
        Filters
      </h5>
    </b-card-header>
    <b-card-body>
      <b-row>
        <b-col
          cols="12"
          md="4"
          class="mb-md-0 mb-2"
        >
          <label>Date</label>



        </b-col>
        <b-col
          cols="12"
          md="4"
          class="mb-md-0 mb-2"
        >
<!--          <label>Plan</label>-->
<!--          <v-select-->
<!--            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"-->
<!--            :value="planFilter"-->
<!--            :options="planOptions"-->
<!--            class="w-100"-->
<!--            :reduce="val => val.value"-->
<!--            @input="(val) => $emit('update:planFilter', val)"-->
<!--          />-->
        </b-col>
        <b-col
          cols="12"
          md="4"
          class="mb-md-0 mb-2"
        >
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardBody, BRow, BCol, BFormDatepicker
} from 'bootstrap-vue'
import vSelect from 'vue-select'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardBody,
    BFormDatepicker,
    vSelect,
  },

}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
