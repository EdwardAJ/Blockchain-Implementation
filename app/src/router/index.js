import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Authority from '@/components/Authority'
import Login from '@/components/Login'

import * as auth from '../utils/auth'

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
      path: '/authority',
      name: 'Authority',
      component: Authority
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  // Path needs authorization
  if (to.path !== '/login') {
    var currentAccounts = await auth.getCurrentAccounts()
    if (web3 && auth.isAccountExist(currentAccounts)) {
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    // Path does not need authorization, proceed.
    next()
  }
})

export default router
