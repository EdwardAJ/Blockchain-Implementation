// Import dependencies
import Vue from 'vue'
import Router from 'vue-router'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Import components
import User from '@/components/User'
import Login from '@/components/Login'
import Authority from '@/components/Authority'
import Companies from '@/components/authority/Companies'
import Invoices from '@/components/authority/Invoices'
import AddCompany from '@/components/authority/AddCompany'
import AddInvoice from '@/components/authority/AddInvoice'

// Import owner
import owner from '../contract-instances/OwnerInstance'

// Import utility functions
import * as auth from '../utils/auth'

Vue.use(BootstrapVue)
Vue.use(Router)

const router = new Router({
  mode: 'history',
  hash: false,
  routes: [
    {
      path: '/user',
      name: 'User',
      component: User,
      children: [
        {
          path: ''
        }
      ]
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
        }, {
          path: 'add-invoice',
          component: AddInvoice
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
  if (to.path !== '/login' && to.path !== '/') {
    if (web3 && auth.isAccountExist(currentAccounts)) {
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    if (web3) {
      try {
        var currentAccounts = await auth.getCurrentAccounts()
        if (auth.isAccountExist(currentAccounts)) {
          await owner.methods.isCurrentOwner().call({ from: currentAccounts[0] })
          next({ path: '/authority/companies'})
        }
      } catch (error) {
        next()
      }
    } else {
      next()
    }
  }
})

export default router
