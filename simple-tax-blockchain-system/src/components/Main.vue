<template>
  <div>
    <p> {{ currentAddress }} </p>
  </div>
</template>

<script>
import web3 from '../../contracts/web3'
// import invoice from './contracts/InvoicingInstance'

export default {
  name: 'Main',
  data () {
    return {
      currentAddress: ''
    }
  },
  async beforeMount () {
    // Get the account used in MetaMask
    this.currentAddress = await web3.currentProvider.selectedAddress
    // Check if the user is owner of contract

    // var accounts = await web3.eth.accounts
    // console.log(accounts)

    // var addresses = await web3.eth.accounts
  }
}
</script>
