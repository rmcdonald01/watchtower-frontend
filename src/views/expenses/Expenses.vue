<template>

  <!-- Table Container Card -->

  <b-card no-body>

    <div class="m-2">
        <!-- Filters -->
        <b-row class="mb-2">
            <!-- Per Page -->
            <b-col
                cols="6"
                md="6"
                class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
            >
                <label>Entries</label>
                <v-select
                    v-model="perPage"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="perPageOptions"
                    :clearable="false"
                    class="per-page-selector d-inline-block ml-50 mr-1"
                />

            </b-col>
            <b-col
                cols="6"
                md="6"
                class="d-flex align-items-center justify-content-end">
                <b-button variant="primary" :to="{ name: 'finance-expense-create' }">
                    Create Expense
                </b-button>

            </b-col>
        </b-row>

      <b-row>

        <!-- Search justify-content-start -->
        <b-col cols="12" md="12" class="d-flex align-items-center justify-content-start" >

              <b-col
                cols="4"
              >
                  <b-form-input
                      v-model="searchQuery"
                      class="d-inline-block mr-1"
                      placeholder="Search amount, description or something..."
                  />
              </b-col>

              <b-col cols="4"
                    >
                  <flat-pickr
                      v-model="rangeDate"
                      class="form-control"
                      placeholder="Select date"
                      :config="{ mode: 'range'}"
                  />
              </b-col>
              <b-col cols="4"
              >
                  <v-select
                      v-model="categoryFilter"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :options="categoryOption"
                      label="title"
                      class="invoice-filter-select"
                      placeholder="Select Status"
                  >
<!--                      <template #selected-option="{ label }">-->
<!--                        <span class="text-truncate overflow-hidden">-->
<!--                          {{ label }}-->
<!--                        </span>-->
<!--                      </template>-->
                  </v-select>
              </b-col>


        </b-col>
      </b-row>
    </div>
      <!-- Table Top -->
    <b-table v-if="expenses"
      ref="refInvoiceListTable"
      :items="fetchInvoices"
      responsive
      :fields="tableColumns"
      primary-key="id"
      :sort-by.sync="sortBy"
      show-empty
      empty-text="No matching records found"
      :sort-desc.sync="isSortDirDesc"
      class="position-relative"
    >
      <template #head(invoiceStatus)>
        <feather-icon icon="TrendingUpIcon" class="mx-auto" />
      </template>

      <!-- Column: Id -->
      <template #cell(id)="data">
        <b-link
          :to="{ name: 'apps-invoice-preview', params: { id: data.item.id } }"
          class="font-weight-bold"
        >
          #{{ data.value }}
        </b-link>
      </template>

      <!-- Column: Actions -->
      <template #cell(actions)="data">
        <div class="text-nowrap">
          <feather-icon
            :id="`invoice-row-${data.item.id}-send-icon`"
            icon="EditIcon"
            class="cursor-pointer"
            size="16"
            @click="
              $router.push({
                name: 'finance-expense-edit',
                params: { id: data.item.id }
              })
            "
          />
          <b-tooltip
            title="Edit Expense"
            class="cursor-pointer"
            :target="`invoice-row-${data.item.id}-send-icon`"
          />

          <feather-icon
            :id="`invoice-row-${data.item.id}-preview-icon`"
            icon="TrashIcon"
            size="16"
            class="mx-1 cursor-pointer"
            @click="deleteExpense(data.item.id)"
          />
          <b-tooltip
            title="Delete Expense"
            :target="`invoice-row-${data.item.id}-preview-icon`"
          />

          <!-- Dropdown -->
          <b-dropdown
            variant="link"
            toggle-class="p-0"
            no-caret
            :right="$store.state.appConfig.isRTL"
          >
            <template #button-content>
              <feather-icon
                icon="MoreVerticalIcon"
                size="16"
                class="align-middle text-body"
              />
            </template>
            <b-dropdown-item>
              <feather-icon icon="DownloadIcon" />
              <span class="align-middle ml-50">Download</span>
            </b-dropdown-item>
            <b-dropdown-item
              :to="{
                name: 'finance-expense-edit',
                params: { id: data.item.id }
              }"
            >
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>
            <b-dropdown-item>
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50">Delete</span>
            </b-dropdown-item>
            <b-dropdown-item>
              <feather-icon icon="CopyIcon" />
              <span class="align-middle ml-50">Duplicate</span>
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </template>
    </b-table>
    <div class="mx-2 mb-2">
      <b-row>
        <b-col
          cols="12"
          sm="6"
          class="d-flex align-items-center justify-content-center justify-content-sm-start"
        >
          <span class="text-muted"
            >Showing {{ dataMeta.from }} to {{ dataMeta.to }} of
            {{ dataMeta.of }} entries</span
          >
        </b-col>
        <!-- Pagination -->
        <b-col
          cols="12"
          sm="6"
          class="d-flex align-items-center justify-content-center justify-content-sm-end"
        >
          <b-pagination
            v-model="currentPage"
            :total-rows="totalInvoices"
            :per-page="perPage"
            first-number
            last-number
            class="mb-0 mt-1 mt-sm-0"
            prev-class="prev-item"
            next-class="next-item"
          >
            <template #prev-text>
              <feather-icon icon="ChevronLeftIcon" size="18" />
            </template>
            <template #next-text>
              <feather-icon icon="ChevronRightIcon" size="18" />
            </template>
          </b-pagination>
        </b-col>
      </b-row>
    </div>
  </b-card>

</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BFormInput,
  BButton,
  BTable,
  BMedia,
  BAvatar,
  BLink,
  BBadge,
  BDropdown,
  BDropdownItem,
  BPagination,
  BTooltip,
  BFormDatepicker,
} from 'bootstrap-vue';
import { avatarText } from '@core/utils/filter';
import vSelect from 'vue-select';
import { onUnmounted } from '@vue/composition-api';
import store from '@/store';
import useExpenseService from './services/expenseService';
import expenseListFilters from "@/views/finance/expenses/components/expense-list/ExpenseListFilters";
import {apiStatus, apiStatusComputedFactory} from '@/api'
import {withAsync} from '@/libs/helpers/withAsync'
import flatPickr from 'vue-flatpickr-component'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    BTooltip,
    BFormDatepicker,
    flatPickr,
    expenseListFilters,
    vSelect
  },
  setup() {
    const INVOICE_APP_STORE_MODULE_NAME = 'app-invoice';
    // const EXPENSE_APP_STORE_MODULE_NAME = 'expense';
    // const CATEGORIES_APP_STORE_MODULE_NAME = 'expense-categories';

    // Register module
    // if (!store.hasModule(INVOICE_APP_STORE_MODULE_NAME)) store.registerModule(INVOICE_APP_STORE_MODULE_NAME, invoiceStoreModule)
    //if (!store.hasModule(CATEGORIES_APP_STORE_MODULE_NAME)) store.registerModule(CATEGORIES_APP_STORE_MODULE_NAME, invoiceStoreModule)
    //if (!store.hasModule(EXPENSE_APP_STORE_MODULE_NAME)) store.registerModule(EXPENSE_APP_STORE_MODULE_NAME, invoiceStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME))
        store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME);
    });

    // const statusOptions = [
    // 'Auto & Transport',
    // 'Bills & Utilities',
    // 'Business Services',
    // 'Education',
    // 'Entertainment',
    // 'Fees & Charges',
    // 'Food & Dining',
    // 'Gifts & Donations',
    // 'Health & Fitness',
    // 'Investments',
    // 'Kids',
    // 'Personal Care',
    // 'Shopping',
    // 'Taxes',
    // 'Travel',
    // ]

    const {
      fetchInvoices,
      fetchCategories,
      categoryOption,
      categoryFilter,
      tableColumns,
      perPage,
      currentPage,
      totalInvoices,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refInvoiceListTable,
      statusFilter,
      expenses,
      refetchData,
      resolveInvoiceStatusVariantAndIcon,
      resolveClientAvatarVariant,
      deleteExpense,
      rangeDate,
    } = useExpenseService();

    fetchCategories();

    return {
      fetchInvoices,
      fetchCategories,
      categoryOption,
      categoryFilter,
      tableColumns,
      perPage,
      currentPage,
      totalInvoices,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refInvoiceListTable,

      statusFilter,

      refetchData,

      //statusOptions,
      expenses,
      avatarText,
      resolveInvoiceStatusVariantAndIcon,
      resolveClientAvatarVariant,
      deleteExpense,
      rangeDate,
    };
  }
};
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}

.invoice-filter-select {
  min-width: 190px;

  ::v-deep .vs__selected-options {
    flex-wrap: nowrap;
  }

  ::v-deep .vs__selected {
    width: 100px;
  }
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
