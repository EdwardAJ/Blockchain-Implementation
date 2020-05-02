<template>
  <div class="container-fluid">
    <div class="row">
      <Sidebar />
      <div v-if="currentAccount !== ''" :key="currentAccount">
        <router-view
          style="margin-left: 250px;"
          class="child-background"
          :account="currentAccount"
        />
      </div>
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
  data () {
    return {
      currentAccount: ''
    }
  },
  async beforeMount() {
    await this.handleAuth()
  },
  methods: {
    showError (error) {
      if (error.message.includes('Unauthorized')) {
        alert('You Must Be Owner To Access This Page.')
      } else {
        alert('An Error Occured. Please Login')
      }
    },
    async handleAuth () {
      if (web3) {
        try {
          var currentAccounts = await auth.getCurrentAccounts()
          if (auth.isAccountExist(currentAccounts)) {
            await owner.methods.isCurrentOwner().call({ from: currentAccounts[0] })
            this.currentAccount = currentAccounts[0]
            if (this.$route.path === '/authority'|| this.$route.path === '/authority/')
              this.redirectToCompaniesPage()
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
    }
  },
  watch: {
    async $route (to, from) {
      await this.handleAuth()
    }
  }
}
</script>

<style scoped>
  .child-background {
    width: calc(100vw - 250px);
    min-height: 100vh;
    background-color: #363636;
  }
</style>
