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
          <h5 class="page-title invoices-title-margin  animated fadeIn"> 
            Invoices Of {{ companyName }}
          </h5>
        </div>
      </div>
      <InvoiceTable ref="invoiceTable" />
    </div>
  </div>
</template>

<script>

// Components:
import Input from '../form/Input'
import InvoiceTable from '../invoice/InvoiceTable'

import CompanyIDInput from '../../mixins/inputCompanyID'

import { isAttributeNotEmpty } from '../../utils/auth'

export default {
  components: {
    Input,
    InvoiceTable
  },
  mixins: [CompanyIDInput],
  data () {
    return {
      showError: false,
      invoiceNotFound: true
    }
  },
  methods: {
    async handleOnSearch () {
      this.resetAttributes()
      var companyID = this.$refs.companyID.data
      if (isAttributeNotEmpty(companyID)) {
        // getCompanyID is Mixin method
        await this.getCompanyByID(companyID)
        await this.$refs.invoiceTable.getInvoicesByID(companyID)
      }
    },
    resetAttributes () {
      this.resetCompanyIDAttributes()
      this.companyName = ''
      this.invoiceNotFound = true
    }
  }
}
</script>