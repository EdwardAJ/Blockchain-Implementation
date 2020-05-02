<template>
  <div class="col">
    <div class="ml-4">
      <div class="row">
        <div class="col">
          <h5 class="page-title page-title-margin"> 
            Add Invoice
          </h5>
        </div>
      </div>
      <div class="mt-4 animated fadeIn">
        <Input
          ref="companyID"
          :show-error="showError"
          name="Company ID"
          :typeCompanyID="typeCompanyID"
          :error-message="errorMessage"
        />
        <Input
          ref="amount"
          :show-error="showError"
          :typeNum="typeNum"
          name="Amount (IDR)"
        />
      </div>
      <div class="row mt-3">
        <div id="btn-submit" class="col">
          <button
            :class="['btn-border', 'btn-action', 'field-length', 'form-content']" @click="handleOnSubmit()"
          > 
            <p class="btn-content">
              Add Invoice
            </p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import invoicing from '../../contract-instances/InvoicingInstance'
import companies from '../../contract-instances/CompaniesInstance'

import Input from '../form/Input'
import { isAttributeNotEmpty } from '../../utils/auth'

// Mixins:
import Redirect from '../../mixins/redirect'
import AccountProp from '../../mixins/accountProp'
import Byte32Input from '../../mixins/inputTypeByte32'

export default {
  components: {
    Input
  },
  mixins: [Redirect, AccountProp, Byte32Input],
  data () {
    return {
      typeCompanyID: true,
      typeNum: true,
      errorMessage: null,
      showError: false
    }
  },
  methods: {
    async handleOnSubmit () {
      this.resetAttributes()
      var companyID = this.$refs.companyID.data
      var amount = this.$refs.amount.data
      if (isAttributeNotEmpty(companyID) && this.isAttributeNotEmpty(amount)) {
        // Check if company valid
        
        this.addInvoice(companyID, amount)
      }
    },
    async addInvoice (companyID, amount) {
      try {
        var response = await invoicing.methods.addInvoice(companyID, amount).send({ from: this.account })
        this.refreshPage()
      } catch (error) {
        if (error.message.includes('Unauthorized')) {
          this.redirectToLoginPage()
        }
      }
    },
    resetAttributes () {
      this.showError = !this.showError
      this.resetBytes32Attr()
    }
  }
}
</script>
<style>
  @import '../../../static/css/main.css';
  @import '../../../static/css/transitions.css';
</style>