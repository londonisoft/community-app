import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'

// Containers
const TheContainer = () =>
    import ('@/containers/TheContainer')

// Views
const Dashboard = () =>
    import ('@/views/Dashboard')

const allaccount = () =>
    import ('@/views/account/List')
const blockAccount = () =>
    import ('@/views/account/BlockList')
const activeAccount = () =>
    import ('@/views/account/ActiveList')


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
const update = () =>
    import ('@/views/update/Form')
const changePass = () =>
    import ('@/views/change-pass/Form')

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
                path: 'account',
                redirect: '/base/cards',
                name: 'account',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [{
                        path: 'all',
                        name: 'Popovers',
                        component: allaccount,
                        meta: {
                            requiresAuth: true
                        }
                    },
                    {
                        path: 'active',
                        name: 'Popovers',
                        component: activeAccount,
                        meta: {
                            requiresAuth: true
                        }
                    },
                    {
                        path: 'block',
                        name: 'Popovers',
                        component: blockAccount,
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
                        path: 'notice',
                        name: 'Popovers',
                        component: () => import ('@/views/notice/Form'),
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
                        path: 'work-completed',
                        name: 'workCom',
                        component: () => import ('@/views/work-com/List'),
                        meta: {
                            requiresAuth: true
                        }
                    },
                    {
                        path: 'change-password',
                        name: 'changePassword',
                        component: changePass,
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