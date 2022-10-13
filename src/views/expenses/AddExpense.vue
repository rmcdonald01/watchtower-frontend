<template>
  <b-row>
    <b-card title="Expense Form">
      <validation-observer ref="simpleRules">
        <b-form @submit.prevent>
          <b-row>
            <b-col cols="12">
              <validation-provider
                #default="{ errors }"
                name="Date"
                rules="required"
              >
                <b-form-group label="Date" label-for="h-date" label-cols-md="4">
                  <b-form-datepicker
                    id="h-date"
                    v-model="expense.spent_on"
                    class="mb-1"
                    :state="errors.length > 0 ? false : null"
                  />
                  <b-form-invalid-feedback
                    :state="errors.length > 0 ? false : null"
                  >
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col cols="12">
              <b-form-group
                label="Amount"
                label-for="h-amount"
                label-cols-md="4"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Amount"
                  :rules="{required: true, regex: /^\d*\.?\d*$/}"
                >
                  <b-form-input
                    id="h-amount"
                    type="text"
                    v-model="expense.amount"
                    placeholder="2000"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <validation-provider
                #default="{ errors }"
                name="Category"
                rules="required"
              >
                <b-form-group
                  label="Category"
                  label-for="h-category"
                  label-cols-md="4"
                  :state="errors.length > 0 ? false : null"
                >
                  <v-select
                    id="category"
                    v-model="selected"
                    :options="categories"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    label="title"
                  />
                  <b-form-invalid-feedback
                    :state="errors.length > 0 ? false : null"
                  >
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <b-col cols="12">
              <b-form-group
                label="Description"
                label-for="h-description"
                label-cols-md="4"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Description"
                  rules="required"
                >
                  <b-form-textarea
                    id="textarea-state"
                    v-model="expense.description"
                    placeholder="Enter only 10 characters"
                    rows="3"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- submit and reset -->
            <b-col offset-md="4">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                type="submit"
                variant="primary"
                class="mr-1"
                @click="addExpense(expense)"
                :disabled="storeExpenseStatusPending"
              >
                <span v-if="!storeExpenseStatusPending">Submit</span>
                <b-spinner v-if="storeExpenseStatusPending" small />
                <span v-if="storeExpenseStatusPending">Submitting...</span>
              </b-button>
              <b-button
                v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                type="reset"
                variant="outline-secondary"
              >
                Reset
              </b-button>
            </b-col>
          </b-row>
        </b-form>
      </validation-observer>
    </b-card>
  </b-row>
</template>

<script>

import { useApi, apiStatusComputedFactory, apiStatus } from '@/api'
import { storeExpense } from '@/api/expenseApi'

const {
  IDLE,
  PENDING,
  SUCCESS,
  ERROR,
} = apiStatus

import {
  BRow,
  BCol,
  BSpinner,
  BFormGroup,
  BFormInput,
  BForm,
  BButton,
  BFormDatepicker,
  BFormInvalidFeedback,
  BFormTextarea,
  BCardText,
  BCard,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required, email, regex } from '@validations'
import vSelect from 'vue-select'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
import { is401 } from '@/libs/utils/response'
export default {
  components: {
    vSelect,
    BRow,
    BCol,
    BSpinner,
    BFormGroup,
    BFormInput,
    BForm,
    BButton,
    BFormTextarea,
    BCardText,
    BFormDatepicker,
    ValidationProvider,
    ValidationObserver,
    BCard,
    BFormInvalidFeedback,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      expense: {},
      text: '',
      selected: '',
      storeExpenseStatus: IDLE,
    }
  },
  computed: {
    categories() {
      return this.$store.state.category.categories.data
    },
    ...apiStatusComputedFactory('storeExpenseStatus'),
  },
  created() {
    this.$store.dispatch('category/fetchCategories')
  },
  methods: {
    addExpense(data) {
      this.storeExpenseStatus = PENDING
      this.expense.category_id = this.selected.value
      this.$refs.simpleRules.validate().then(success => {
        // userApi
        // useApi('storeExpense', storeExpense(this.expense))

        if (success) {
          this.$store
            .dispatch('expense/addExpense', this.expense)
            .then((response) => {
              this.storeExpenseStatus = SUCCESS
              this.selected = ''
              this.expense = {
                description: '',
                amount: '',
                category: '',
              }
              this.showToast('success', 'bottom-right')
              this.$nextTick(() => {
                this.$refs.simpleRules.reset()
              })
            }).catch(() => {
              this.storeExpenseStatus = IDLE
            })
        } else {
          this.storeExpenseStatus = IDLE
          console.log('Validation failed')
        }
      })
    },
    showToast(variant, position) {
      this.$toast(
        {
          component: ToastificationContent,
          props: {
            title: 'Notification',
            icon: 'InfoIcon',
            text: '👋 Action completed.',
            variant,
          },
        },
        {
          position
        }
      )
    }
  }
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
</style>
