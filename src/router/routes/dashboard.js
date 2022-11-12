export default [
  {
    path: '/dashboard/finance',
    name: 'dashboard-finance',
    component: () => import('@/views/dashboard/expense/Finance.vue'),
    meta: {
      pageTitle: 'Expense',
      breadcrumb: [
        {
          text: 'Expense',
          active: true,
        },
      ],
      resource: 'Auth',
      action: 'view-dashboard',
    },

  },
  {
    path: '/expense',
    name: 'expense-index',
    component: () => import('@/views/expenses/Expenses.vue'),
    meta: {
      pageTitle: 'Expense',
      breadcrumb: [
        {
          text: 'Expense',
          active: true,
        },
      ],
      resource: 'Auth',
      action: 'view-expenses',
    },

  },
]
