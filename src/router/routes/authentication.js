export default [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/authentication/Login.vue'),
        meta: {
            layout: 'full',
            resource: 'Guest',
            redirectIfLoggedIn: true,
        },
    },
    {
        path: '/not-authorized',
        name: 'misc-not-authorized',
        component: () => import('@/views/authentication/NotAuthorized.vue'),
        meta: {
            layout: 'full',
            resource: 'Auth',
        },
    },
    {
        path: '/error-404',
        name: 'error-404',
        component: () => import('@/views/error/Error404.vue'),
        meta: {
            layout: 'full',
        },
    },
    {
        path: '*',
        redirect: 'error-404',
    },
]