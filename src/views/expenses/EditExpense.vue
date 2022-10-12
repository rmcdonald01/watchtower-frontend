<template>
  <b-row>
    <!-- Alert: No item found -->
    <b-alert variant="danger" :show="isExpenseData === undefined">
      <h4 class="alert-heading">
        Error fetching expense data
      </h4>
      <div class="alert-body">
        No expense found with this expense id. Check
        <b-link class="alert-link" :to="{ name: 'finance-expense-list' }">
          Expense List
        </b-link>
        for other expenses.
      </div>
    </b-alert>

    <b-card title="Expense Form" v-if="expense">
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
                  rules="required|double:2"
                >
                  <b-form-input
                    id="h-amount"
                    type="text"
                    v-model="expense.amount"
                    placeholder="2000.90"
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
                    :options="categories"
                    v-model="selected"
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
                @click="updateExpense(expense)"
              >
                Update
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
import { ref, onUnmounted } from '@vue/composition-api';
import store from '@/store';
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BForm,
  BButton,
  BFormDatepicker,
  BFormInvalidFeedback,
  BAlert,
  BLink
} from 'bootstrap-vue';
import Ripple from 'vue-ripple-directive';
import router from '@/router';
import { BFormTextarea, BCardText, BCard } from 'bootstrap-vue';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { required, email, decimal } from '@validations';
//import { double} from 'vee-validate/dist/rules'
import vSelect from 'vue-select';
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';

export default {
  components: {
    vSelect,
    BRow,
    BCol,
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
    BLink,
    BAlert
  },
  directives: {
    Ripple
  },
  data() {
    return {
      //expense: {},
      text: '',
      // selected: {
      //    value: 2,
      //    title:"Education"
      // },
      isExpenseData: '',
      countryName: [
        { value: 'Russia', title: 'Russia' },
        { value: 'Canada', title: 'Canada' },
        { value: 'China', title: 'China' },
        { value: 'United States', title: 'United States' },
        { value: 'Brazil', title: 'Brazil' },
        { value: 'Australia', title: 'Australia' },
        { value: 'India', title: 'India' }
      ]
    };
  },
  computed: {
    categories() {
      return this.$store.state.category.categories.data;
    },
    expense: {
      get() {
        return this.$store.state.expense.expense;
      },
      set(expenseData) {
        return expenseData;
      }
    },
    selected: {
      get() {
        return this.expense.category;
      },
      set(selected) {
        this.expense.category = selected;
        return selected;
      }
    }
  },
  methods: {
    updateExpense(data) {
      console.log(data);
      console.log(this.$route.params.id);

      this.expense.category_id = this.selected.value;
      delete this.expense['category'];
      console.log(this.expense);

      this.$store
        .dispatch('expense/updateExpense', {id: this.$route.params.id, expense: this.expense  })
        .then(response => {
          this.showToast('success', 'bottom-left');
        })
        .catch(error => {
          console.log(error);
          this.showToast('danger', 'bottom-left');
        });
      return;
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          this.$store
            .dispatch('expense/addExpense', this.expense)
            .then(response => {
              this.selected = '';
              this.expense = {
                description: '',
                amount: '',
                categor: ''
              };
              this.showToast('success', 'bottom-right');
              this.$nextTick(() => {
                this.$refs.simpleRules.reset();
              });
            });
        } else {
          console.log('Validation failed');
        }
      });
    },
    showToast(variant, position) {
      this.$toast(
        {
          component: ToastificationContent,
          props: {
            title: 'Notification',
            icon: 'InfoIcon',
            text: '👋 Action completed.',
            variant
          }
        },
        {
          position
        }
      );
    },
    setSelected(value) {
      console.log(value);
      //  trigger a mutation, or dispatch an action
    }
  },
  created() {
    // if (!moduleDataList.isRegistered) {
    //  // this.$store.registerModule('dataList', moduleDataList1)
    //   moduleDataList.isRegistered = true
    // }
    //const expenseData = ref(null)
    //const paymentDetails = ref({})
  },
  mounted() {
    this.$store.dispatch('category/fetchCategories');

    store
      .dispatch('expense/fetchExpense', { id: router.currentRoute.params.id })
      .then(response => {})
      .catch(error => {
        if (error.response.status === 404) {
          //this.expenseData = undefined
          this.isExpenseData = undefined;
        }
      });
  }
};
</script>
