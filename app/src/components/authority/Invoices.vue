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
          <p class="col not-found"> No Company Found </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import companies from '../../contract-instances/CompaniesInstance'
import Input from '../form/Input'

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
      showError: false,
      companyNotFound: false,
      typeCompanyID: true,
      errorMessage: null
    }
  },
  methods: {
    handleOnSearch () {
      this.showError = !this.showError
      this.errorMessage = null
      this.companyNotFound = false
      var companyID = this.$refs.companyID.data
      if (this.isAttributeNotEmpty(companyID)) {
        this.getCompanyByID(companyID)
      }
    },
    isAttributeNotEmpty (attr) {
      return attr !== ''
    },
    async getCompanyByID (companyID) {
      try {
        var response = await companies.methods.getCompanyByID(companyID).call({ from: this.account })
        console.log('resp: ', response)
      } catch (error) {
        console.log(error)
        if (error.message.includes('Company is not found')) {
          this.showCompanyNotFound()
        } else if (error.message.includes('invalid bytes32')) {
          this.showBytes32Error()
        }
      }
    },
    showCompanyNotFound () {
      this.companyNotFound = true
    },
    showBytes32Error () {
      this.errorMessage = 'invalid bytes32'
    }
  }
}
</script>
<style>
  @import '../../../static/css/main.css';
  @import '../../../static/css/transitions.css';
</style>