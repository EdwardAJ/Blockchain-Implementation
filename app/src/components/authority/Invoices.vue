<template>
  <div class="col">
    <div class="ml-4">
      <div class="row animated fadeIn">
        <div class="col mt-4">
          <Input
            ref="companyID"
            :show-error="showError"
            name="Company ID"
            :typeCompanyID="typeCompanyID"
            :error-message="errorMessage"
            class="mt-5"
          >
            <div id="btn-submit" class="col">
              <button
                :class="['btn-border', 'btn-action', 'btn-search', 'form-content']" @click="handleOnSearch()"
              > 
                <p class="btn-content"> Search </p>
              </button>
            </div>
          </Input>
        </div>
      </div>
      <div class="row mt-4">
        <div v-if="companyNotFound">
          <p class="col not-found animated fadeIn"> Company Not Found </p>
        </div>
        <div v-else-if="companyName">
          <h5 class="page-title ml-3 animated fadeIn"> 
            Invoices Of {{ companyName }}
          </h5>
        </div>
      </div>
      <div class="row">
        <div v-if="invoiceNotFound">
          <p class="col not-found animated fadeIn"> Invoice Not Found </p>
        </div>
        <div v-else>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

import invoicing from '../../contract-instances/InvoicingInstance'

import Input from '../form/Input'
import Table from '../table/Table'

import { isAttributeNotEmpty } from '../../utils/auth'

// Mixins:
import Redirect from '../../mixins/redirect'
import AccountProp from '../../mixins/accountProp'
import CompanyIDInput from '../../mixins/inputCompanyID'

export default {
  components: {
    Input
  },
  mixins: [Redirect, AccountProp, CompanyIDInput],
  data () {
    return {
      columns: [
        {
          key: 'invoiceID',
          label: 'Invoice ID'
        },
        {
          key: 'amount',
          label: 'Amount'
        }
      ],
      rowsPaid: [],
      rowsUnpaid: [],
      showError: false,
      companyName: '',
      invoiceNotFound: false
    }
  },
  methods: {
    async handleOnSearch () {
      this.resetAttributes()
      var companyID = this.$refs.companyID.data
      if (isAttributeNotEmpty(companyID)) {
        // getCompanyID is Mixin method
        await this.getCompanyByID(companyID, this.account)
        await this.getInvoicesByID(companyID, this.account)
      }
    },
    async getInvoicesByID (companyID, account) {
      try {
        var invoicesArray = await invoicing.methods.getInvoicesByCompanyID(companyID).call({ from: account })
        this.showInvoices(invoicesArray)
      } catch (error) {
        if (error.message.includes('Invoice not Found')) {
          this.showInvoiceNotFound()
        }
      }
    },
    showInvoiceNotFound () {
      this.invoiceNotFound = true
    },
    showCompanyName (companyName) {
      this.companyName = companyName
    },
    showInvoices (invoicesArray) {
      this.rowsPaid = []
      this.rowsUnpaid = []
      console.log('Invoices array: ', invoicesArray)
      //TODO
    },
    resetAttributes () {
      this.resetCompanyIDAttributes()
      this.companyName = ''
      this.invoiceNotFound = false
    }
  }
}
</script>
<style>
  @import '../../../static/css/main.css';
  @import '../../../static/css/transitions.css';
</style>