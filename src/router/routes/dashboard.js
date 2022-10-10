export default [
  {
    path: '/dashboard/finance',
    name: 'dashboard-finance',
    component: () => import('@/views/dashboard/expense/Finance.vue'),
    meta: {
      // resource: 'ACL',
      action: 'view-dashboard',
    },

  },
]
