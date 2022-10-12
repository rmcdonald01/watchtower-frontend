import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'
import {is401, is404} from '@/libs/utils/response'
// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useExpenseList() {
  // Use toast
  const toast = useToast()

  const refInvoiceListTable = ref(null)

  // Table Handlers
  const tableColumns = [
    { key: 'id', label: '#', sortable: true },
    { key: 'amount', sortable: true, formatter: val => `$${val}` },
    { key: 'description', sortable: true },
    { key: 'spent_on', sortable: true },
    { key: 'actions' },
  ]
  const perPage = ref(10)
  const totalInvoices = ref(0)
  const currentPage = ref(1)
  const perPageOptions = [10, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)
  const statusFilter = ref(null)
  const statusOptions = ref([])
  const categoryOption = ref([])
  const categoryFilter = ref(null)
  const category = ref(null)
  const rangeDate = ref(null);
  let date_start = null;
  let date_end = null;

  const dataMeta = computed(() => {
    const localItemsCount = refInvoiceListTable.value ? refInvoiceListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalInvoices.value,
    }
  })

  const refetchData = () => {
    refInvoiceListTable.value.refresh()
  }

  watch([currentPage, perPage, searchQuery, categoryFilter, rangeDate], () => {
    categoryFilter.value ? category.value = categoryFilter.value.value : category.value = ''
    refetchData()
  })


    watch(rangeDate, () => {
        let split_range = rangeDate.value.split('to');
        if (split_range.length > 1) {
            date_start = split_range[0].trim();
            date_end = split_range[1].trim();
        } else {
            date_start = split_range[0].trim();
            date_end = date_start;
        }
    });
    const expenses = computed(function () {
   return store.getters['expense/expenses']
 })

  const fetchInvoices = (ctx, callback) => {
    store
      .dispatch('expense/fetchExpenses', {
        q: searchQuery.value,
        perPage: perPage.value,
        page: currentPage.value,
        sortBy: sortBy.value,
        sortDesc: isSortDirDesc.value,
        category: category.value,
        date_start: date_start,
        date_end: date_end,
      })
      .then(response => {
        const { invoices, total } = {
          invoices: response.data.data,
          total: response.data.meta.total,
        }
        // const { invoices, total } = response.data

        callback(invoices)
        totalInvoices.value = total
      })
      .catch(error => {
        if (!is401(error)) {
          toast({
            component: ToastificationContent,
            props: {
              title: 'Error fetching expenses',
              icon: 'AlertTriangleIcon',
              variant: 'danger',
            },
          })
        }
      })
  }

  const fetchCategories = (ctx, callback) => {
    store
      .dispatch('category/fetchCategories', {
      // q: searchQuery.value,
      })
      .then(response => {
        categoryOption.value = response.data.data
      })
      .catch(error => {
        // !error.response.status === 401
        if (!is401(error)) {
          toast({
            component: ToastificationContent,
            props: {
              title: 'Error fetching categories',
              icon: 'AlertTriangleIcon',
              variant: 'danger',
            },
          })
        }
      })
  }

  const deleteExpense = (id, callback) => {
    store.dispatch('expense/deleteExpense', {id: id}).then((response) => {
      //refetchData()
      toast({
        component: ToastificationContent,
        props: {
          title: 'Completed',
          icon: 'AlertTriangleIcon',
          variant: 'success',
        },
      })

    }).catch((error) => {
      if(is404(error)){
        toast({
        component: ToastificationContent,
        props: {
          title: "Record not found",
          icon: 'AlertTriangleIcon',
          variant: 'danger',
        }
        })
        refetchData()
        return;
      }
      toast({
        component: ToastificationContent,
        props: {
          title: 'Action failed - try agin later',
          icon: 'AlertTriangleIcon',
          variant: 'danger',
        },
      })
    });
  }

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  const resolveInvoiceStatusVariantAndIcon = status => {
    if (status === 'Partial Payment') return { variant: 'warning', icon: 'PieChartIcon' }
    if (status === 'Paid') return { variant: 'success', icon: 'CheckCircleIcon' }
    if (status === 'Downloaded') return { variant: 'info', icon: 'ArrowDownCircleIcon' }
    if (status === 'Draft') return { variant: 'primary', icon: 'SaveIcon' }
    if (status === 'Sent') return { variant: 'secondary', icon: 'SendIcon' }
    if (status === 'Past Due') return { variant: 'danger', icon: 'InfoIcon' }
    return { variant: 'secondary', icon: 'XIcon' }
  }

  const resolveClientAvatarVariant = status => {
    if (status === 'Partial Payment') return 'primary'
    if (status === 'Paid') return 'danger'
    if (status === 'Downloaded') return 'secondary'
    if (status === 'Draft') return 'warning'
    if (status === 'Sent') return 'info'
    if (status === 'Past Due') return 'success'
    return 'primary'
  }
    const resolveUserRoleVariant = role => {
        if (role === 'subscriber') return 'primary'
        if (role === 'author') return 'warning'
        if (role === 'maintainer') return 'success'
        if (role === 'editor') return 'info'
        if (role === 'admin') return 'danger'
        return 'primary'
    }

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
    expenses,
    resolveInvoiceStatusVariantAndIcon,
    resolveClientAvatarVariant,
    refetchData,
    deleteExpense,
    resolveUserRoleVariant,
    rangeDate,
  }
}
