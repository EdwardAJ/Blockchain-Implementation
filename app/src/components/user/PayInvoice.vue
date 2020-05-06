<template>
  <div class="col">
    <div class="ml-4">
      <div class="row">
        <div class="col">
          <h5 class="page-title page-title-margin"> 
            Pay Invoice
          </h5>
        </div>
      </div>
      <div class="mt-4 animated fadeIn">
        <Input
          ref="invoiceID"
          :show-error="showError"
          name="Invoice ID"
          :typeByte32="typeByte32"
          :error-message="errorMessage"
        />
      </div>
      <div class="row mt-3">
        <div id="btn-submit" class="col">
          <button
            :class="['btn-border', 'btn-action', 'field-length', 'form-content']" @click="handleOnSubmit()"
          > 
            <p class="btn-content">
              Pay Invoice
            </p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import invoicing from '../../contract-instances/InvoicingInstance'

import Input from '../form/Input'
import * as auth from '../../utils/auth'
import * as invoicingUtils from '../../utils/invoicing'
import * as pay from '../../utils/pay'

// Mixins:
import Redirect from '../../mixins/redirect'
import InvoiceIDInput from '../../mixins/inputInvoiceID'

export default {
  components: {
    Input
  },
  mixins: [Redirect, InvoiceIDInput],
  data () {
    return {
      typeNum: true,
      showError: false
    }
  },
  methods: {
    async handleOnSubmit () {
      this.resetAttributes()
      var invoiceID = this.$refs.invoiceID.data
      if (auth.isAttributeNotEmpty(invoiceID)) {
        // Check if invoice valid, with function called from Mixin
        var companyID = auth.getCompanyID()
        var invoice = await this.getInvoiceByID(invoiceID, companyID)
        if (invoice) {
          var amount = invoice[0]
          var statusPaid = invoice[1]
          if (statusPaid) {
            this.showInvoicePaidError()
          } else {
            await this.payInvoice(companyID, invoiceID, amount)
          }
        }
      }
    },
    async payInvoice (companyID, invoiceID, amount) {
      // Utils: invoicingUtils already included in mixin
      var accounts = await auth.getCurrentAccounts().catch((error) => {
        alert('An error occured')
      })
      if (auth.isAccountExist(accounts)) {
        var fromAddress = accounts[0]
        try {
          var ethToIDRRate = await invoicingUtils.getEthereumToIDRRate()
          var ethAmount = invoicingUtils.convertIDRToEth(amount, ethToIDRRate)
          try {
            await pay.sendEthereum(invoicingUtils.ownerAddress, ethAmount)
            // If success, then proceed to change invoice status
            var response = await invoicing.methods.payInvoice(invoiceID, companyID).send({ from: fromAddress}).catch((error) => {
              alert('An error occured: ' + error)
            })
            alert('Invoice has been paid!')
            this.refreshPage()
          } catch (error) {
            alert('An error occured: ' + error)
          }
        } catch (error) {
          alert('An error occured: ' + error)
        }
      }
    },
    resetAttributes () {
      this.resetInvoiceAttributes()
    }
  }
}
</script>
<style>
  @import '../../../static/css/main.css';
  @import '../../../static/css/transitions.css';
</style>