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
                <p class="btn-content">
                  Search
                </p>
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

import companies from '../../contract-instances/CompaniesInstance'
import invoicing from '../../contract-instances/InvoicingInstance'

import Input from '../form/Input'
import Table from '../table/Table'

// Mixins:
import Redirect from '../../mixins/redirect'
import AccountProp from '../../mixins/accountProp'

export default {
  components: {
    Input
  },
  mixins: [Redirect, AccountProp],
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
      companyNotFound: false,
      invoiceNotFound: false,
      typeCompanyID: true,
      errorMessage: null,
      companyName: ''
    }
  },
  methods: {
    async handleOnSearch () {
      this.resetAttributes()
      var companyID = this.$refs.companyID.data
      if (this.isAttributeNotEmpty(companyID)) {
        await this.getCompanyByID(companyID)
        await this.getInvoicesByID(companyID)
      }
    },
    isAttributeNotEmpty (attr) {
      return attr !== ''
    },
    async getCompanyByID (companyID) {
      try {
        var company = await companies.methods.getCompanyByID(companyID).call({ from: this.account })
        this.showCompanyName(company[0])
      } catch (error) {
        if (error.message.includes('Company is not found')) {
          this.showCompanyNotFound()
        } else if (error.message.includes('invalid bytes32')) {
          this.showBytes32Error()
        }
      }
    },
    async getInvoicesByID (companyID) {
      try {
        var invoicesArray = await invoicing.methods.getInvoicesByCompanyID(companyID).call({ from: this.account })
        this.showInvoices(invoicesArray)
      } catch (error) {
        if (error.message.includes('Invoice not Found')) {
          this.showInvoiceNotFound()
        }
      }
    },
    showCompanyNotFound () {
      this.companyNotFound = true
    },
    showInvoiceNotFound () {
      this.invoiceNotFound = true
    },
    showBytes32Error () {
      this.errorMessage = 'invalid bytes32'
    },
    showCompanyName (companyName) {
      this.companyName = companyName
    },
    showInvoices (invoicesArray) {
      this.rowsPaid = []
      this.rowsUnpaid = []
      // invoicesArray.forEach((invoice) => {
        
      // })
    },
    resetAttributes () {
      this.showError = !this.showError
      this.errorMessage = null
      this.companyNotFound = false
      this.invoiceNotFound = false
      this.companyName = ''
    }
  }
}
</script>
<style>
  @import '../../../static/css/main.css';
  @import '../../../static/css/transitions.css';
</style>