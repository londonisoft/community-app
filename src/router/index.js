import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'

// Containers
const TheContainer = () =>
    import ('@/containers/TheContainer')

// Views
const Dashboard = () =>
    import ('@/views/Dashboard')

const allWithdraw = () =>
    import ('@/views/withdraw/List')
const pendinWithdraw = () =>
    import ('@/views/withdraw/Pending')
const approveWithdraw = () =>
    import ('@/views/withdraw/Approve')
const rejectWithdraw = () =>
    import ('@/views/withdraw/Reject')

const allUser = () =>
    import ('@/views/user-signup/List')
const activeUser = () =>
    import ('@/views/user-signup/ActiveList')
const blockUser = () =>
    import ('@/views/user-signup/BlockList')
const exUser = () =>
    import ('@/views/user-signup/exList')
const profile = () =>
    import ('@/views/user-signup/Form')

const setting = () =>
    import ('@/views/setting/Form')
const packageList = () =>
    import ('@/views/package/List')
const purchasePackageList = () =>
    import ('@/views/purchase-package/List')
const addMoney = () =>
    import ('@/views/add-money/List')
const update = () =>
    import ('@/views/update/Form')
const paymentMethod = () =>
    import ('@/views/pay-method/List')
const transferList = () =>
    import ('@/views/transfer/List')
const addWallet = () =>
    import ('@/views/wallet/List')
const postList = () =>
    import ('@/views/post/List')

// Views - Pages
const Page404 = () =>
    import ('@/views/pages/Page404')
const Page500 = () =>
    import ('@/views/pages/Page500')
const Login = () =>
    import ('@/views/pages/Login')
const Register = () =>
    import ('@/views/pages/Register')

Vue.use(Router)

const routes = [{
        path: '/',
        redirect: '/dashboard',
        name: 'Home',
        component: TheContainer,
        children: [{
                path: 'dashboard',
                name: 'Dashboard',
                component: Dashboard,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'withdraw',
                redirect: '/base/cards',
                name: 'Withdraw',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [{
                        path: 'all',
                        name: 'Popovers',
                        component: allWithdraw,
                        meta: {
                            requiresAuth: true
                        }
                    },
                    {
                        path: 'approve',
                        name: 'Popovers',
                        component: approveWithdraw,
                        meta: {
                            requiresAuth: true
                        }
                    },
                    {
                        path: 'pending',
                        name: 'Popovers',
                        component: pendinWithdraw,
                        meta: {
                            requiresAuth: true
                        }
                    },
                    {
                        path: 'reject',
                        name: 'Popovers',
                        component: rejectWithdraw,
                        meta: {
                            requiresAuth: true
                        }
                    },
                    {
                        path: 'transfer-list',
                        name: 'transferList',
                        component: transferList,
                        meta: {
                            requiresAuth: true
                        }
                    },
                    {
                        path: 'add-wallet',
                        name: 'addWallet',
                        component: addWallet,
                        meta: {
                            requiresAuth: true
                        }
                    }
                ]
            },
            {
                path: 'users',
                redirect: '/base/cards',
                name: 'Users',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [{
                        path: 'all',
                        name: 'Popovers',
                        component: allUser,
                        meta: {
                            requiresAuth: true
                        }
                    },
                    {
                        path: 'active',
                        name: 'Popovers',
                        component: activeUser,
                        meta: {
                            requiresAuth: true
                        }
                    },
                    {
                        path: 'block',
                        name: 'Popovers',
                        component: blockUser,
                        meta: {
                            requiresAuth: true
                        }
                    },
                    {
                        path: 'profile',
                        name: 'Popovers',
                        component: profile,
                        meta: {
                            requiresAuth: true
                        }
                    },
                    {
                        path: 'exclusive',
                        name: 'Popovers',
                        component: exUser,
                        meta: {
                            requiresAuth: true
                        }
                    }
                ]
            },
            {
                path: 'other',
                redirect: '/base/cards',
                name: 'Other',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [{
                        path: 'setting',
                        name: 'Popovers',
                        component: setting,
                        meta: {
                            requiresAuth: true
                        }
                    },
                    {
                        path: 'package',
                        name: 'Popovers',
                        component: packageList,
                        meta: {
                            requiresAuth: true
                        }
                    },
                    {
                        path: 'purchase-package',
                        name: 'Popovers',
                        component: purchasePackageList,
                        meta: {
                            requiresAuth: true
                        }
                    },
                    {
                        path: 'add-money',
                        name: 'Popovers',
                        component: addMoney,
                        meta: {
                            requiresAuth: true
                        }
                    },
                    {
                        path: 'update',
                        name: 'Popovers',
                        component: update,
                        meta: {
                            requiresAuth: true
                        }
                    },
                    {
                        path: 'payment-method',
                        name: 'PaymentMethod',
                        component: paymentMethod,
                        meta: {
                            requiresAuth: true
                        }
                    }
                ]
            }
        ]
    },
    {
        path: '/pages',
        redirect: '/pages/404',
        name: 'Pages',
        component: {
            render(c) { return c('router-view') }
        },
        children: [{
                path: '404',
                name: 'Page404',
                component: Page404,
                meta: {
                    requiresAuth: false
                }
            },
            {
                path: '500',
                name: 'Page500',
                component: Page500,
                meta: {
                    requiresAuth: false
                }
            },
            {
                path: 'login',
                name: 'Login',
                component: Login,
                meta: {
                    requiresAuth: false
                }
            },
            {
                path: 'register',
                name: 'Register',
                component: Register,
                meta: {
                    requiresAuth: false
                }
            }
        ]
    }
]


const router = new Router({
    linkActiveClass: 'active',
    scrollBehavior: () => ({ y: 0 }),
    routes: routes,
    mode: 'history'
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next()
            return
        }
        next('/pages/login')
    } else {
        next()
    }
})

export default router