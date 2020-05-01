// Import dependencies
import Vue from 'vue'
import Router from 'vue-router'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Import components
import Main from '@/components/Main'
import Login from '@/components/Login'
import Authority from '@/components/Authority'
import Companies from '@/components/authority/Companies'
import Invoices from '@/components/authority/Invoices'
import AddCompany from '@/components/authority/AddCompany'

// Import utility functions
import * as auth from '../utils/auth'

Vue.use(BootstrapVue)
Vue.use(Router)

const router = new Router({
  mode: 'history',
  hash: false,
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/authority/',
      name: 'Authority',
      component: Authority,
      children: [
        {
          path: 'companies',
          component: Companies
        },
        {
          path: 'add-company',
          component: AddCompany
        },
        {
          path: 'invoices',
          component: Invoices
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  var currentAccounts = await auth.getCurrentAccounts()
  // Path needs authorization
  if (to.path !== '/login') {
    if (web3 && auth.isAccountExist(currentAccounts)) {
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    // Path does not need authorization
    // if (web3 && auth.isAccountExist(currentAccounts)) {
    //   next({ path: '/'})
    // } else {
    //   next()
    // }
    next()
  }
})

export default router
