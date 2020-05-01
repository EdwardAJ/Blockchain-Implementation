<template>
  <div class="container-fluid">
    <div class="row">
      <Sidebar />
      <router-view style="margin-left: 250px;" />
    </div>
  </div>
</template>

<script>

import owner from '../contract-instances/OwnerInstance'
import * as auth from '../utils/auth'

// Redirect functions
import Redirect from '../mixins/redirect'

// Components
import Sidebar from './sidebar/Sidebar'

export default {
  components: {
    Sidebar
  },
  mixins: [Redirect],
  async beforeMount () {
    if (web3) {
      try {
        var currentAccounts = await auth.getCurrentAccounts()
        if (auth.isAccountExist(currentAccounts)) {
          await owner.methods.isCurrentOwner().call({ from: currentAccounts[0] })
        } else {
          this.redirectToLoginPage()
        }
      } catch (error) {
        this.showError(error)
        this.redirectToLoginPage()
      }
    } else {
      this.redirectToLoginPage()
    }
  },
  methods: {
    showError (error) {
      if (error.message.includes('Unauthorized')) {
        alert('You Must Be Owner To Access This Page.')
      } else {
        alert('An Error Occured. Please Login')
      }
    }
  }
}
</script>
