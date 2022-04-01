import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'
import Permissions from '@/mixins/Permissions'

// Containers
const TheContainer = () =>
    import ('@/containers/TheContainer')

// Views
const Dashboard = () =>
    import ('@/views/Dashboard')

const setting = () =>
    import ('@/views/setting/Form')

const channelList = () =>
    import ('@/views/channels/List')
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
                path: 'app-management',
                name: 'appUsers',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [  {
                    path: 'admin-users',
                    name: 'user-list',
                    component: () => import('../views/user/List'),
                    meta: {
                      requiresAuth: true,
                      name: 'user-list'
                    }
                  },
                  {
                    path: 'roles',
                    name: 'role-list',
                    component: () => import('../views/role/List'),
                    meta: {
                      requiresAuth: true,
                      name: 'role-list'
                    }
                  },
                  {
                    path: 'permissions',
                    name: 'permission-list',
                    component: () => import('../views/permission/List'),
                    meta: {
                      requiresAuth: true,
                      name: 'permission-list'
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
                        path: 'category-list',
                        name: 'category_list',
                        component: () => import('../views/category/List'),
                        meta: {
                            requiresAuth: true,
                            name: 'category_list'
                        }
                    },
                    {
                        path: 'channel-list',
                        name: 'PaymentMethod',
                        component: channelList,
                        meta: {
                            requiresAuth: true
                        }
                    },
                    {
                        path: 'change-password',
                        name: 'PaymentMethod',
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