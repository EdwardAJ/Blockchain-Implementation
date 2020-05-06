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

import invoicing from '../contract-instances/InvoicingInstance'
import owner from '../contract-instances/OwnerInstance'
import * as auth from '../utils/auth'

import eventReader from '../contract-instances/EventReaderInstance'

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
  mounted () {
    eventReader.events.InvoiceAdded({}, (error, event) => {
      // Fires when there exists new generated invoice
      console.log("Event: ", event)
      alert('Invoice ID generated: ' + event.returnValues[0])
      this.refreshPage()
    })

    eventReader.events.InvoicePaid({}, (error, event) => {
      alert('New invoice has been paid!')
      this.refreshPage()
    })

    window.ethereum.on('accountsChanged', (accounts) => {
      this.handleAuth()
    })
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
  }
}
</script>

<style>
  @import '../../static/css/main.css';
</style>
