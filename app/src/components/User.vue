<template>
  <div class="container-fluid">
    <div class="row">
      <UserSidebar :company-name="companyName" />
      <router-view
        style="margin-left: 250px;"
        class="child-background"
      />
    </div>
  </div>
</template>

<script>

import owner from '../contract-instances/OwnerInstance'
import eventReader from '../contract-instances/EventReaderInstance'

import * as auth from '../utils/auth'
import { getCompanyByIDFromContract } from '../utils/companies'

// Redirect functions
import Redirect from '../mixins/redirect'

// Components
import UserSidebar from './sidebar/UserSidebar'

export default {
  components: {
    UserSidebar
  },
  mixins: [Redirect],
  data () {
    return {
      companyName: ''
    }
  },
  async beforeMount() {
    await this.handleAuth()
  },
  mounted () {
    this.companyName = auth.getCompanyName()

    eventReader.events.InvoiceAdded({}, (error, event) => {
      // console.log("Event: ", event)
    })

    window.ethereum.on('accountsChanged', (accounts) => {
      auth.deleteCookie()
      this.redirectToLoginPage()
    })
  },
  methods: {
    async handleAuth () {
      if (web3) {
        try {
          // Check if it is the owner
          var currentAccounts = await auth.getCurrentAccounts()
          if (auth.isAccountExist(currentAccounts)) {
            await owner.methods.isCurrentOwner().call({ from: currentAccounts[0] })
            this.redirectToCompaniesPage()
          } else {
            this.redirectToLoginPage()
          }
        } catch (error) {
          if (error.message.includes('Unauthorized')) {
            this.handleCompanyID()
          }
        }
      } else {
        this.redirectToLoginPage()
      }
    },
    async handleCompanyID () {
      var companyID = auth.getCompanyID()
      try {
        var company = await getCompanyByIDFromContract(companyID)
        if (this.$route.path === '/user'|| this.$route.path === '/user/') {
          this.redirectToUserInvoicesPage()
        }
      } catch (error) {
        if (error.message.includes('Company is not found')) {
          this.redirectToLoginPage()
        }
      }
    }
  }
}
</script>

<style>
  @import '../../static/css/main.css';
</style>
