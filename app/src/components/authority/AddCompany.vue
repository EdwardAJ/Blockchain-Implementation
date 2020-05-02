<template>
  <div class="col">
    <div class="ml-4">
      <div class="row">
        <div class="col">
          <h5 class="page-title page-title-margin"> 
            Add Company
          </h5>
        </div>
      </div>
      <div class="mt-4 animated fadeIn">
        <Input ref="name" :show-error="showError" name="Company Name" class="mt-4" />
        <Input ref="address" :show-error="showError" name="Company Address" />
        <Input ref="phone" :show-error="showError" name="Company Phone Number" />
      </div>
      <div class="row mt-3">
        <div id="btn-submit" class="col">
          <button
            :class="['btn-border', 'btn-action', 'field-length', 'form-content']" @click="handleOnSubmit()"
          > 
            <p class="btn-content">
              Add Company
            </p>
          </button>
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
      showError: false
    }
  },
  methods: {
    handleOnSubmit () {
      this.showError = !this.showError
      var companyName = this.$refs.name.data
      var companyAddr = this.$refs.address.data
      var companyPhone = this.$refs.phone.data
      if (this.isAttributeNotEmpty(companyName) && this.isAttributeNotEmpty(companyAddr) && this.isAttributeNotEmpty(companyPhone)) {
        this.addCompany(companyName, companyAddr, companyPhone)
      }
    },
    isAttributeNotEmpty (attr) {
      return attr !== ''
    },
    async addCompany (companyName, companyAddr, companyPhone) {
      try {
        var response = await companies.methods.addCompany(companyName, companyAddr, companyPhone).send({ from: this.account })
        this.refreshPage()
      } catch (error) {
        this.redirectToLoginPage()
      }
    }
  }
}
</script>
<style>
  @import '../../../static/css/main.css';
  @import '../../../static/css/transitions.css';
</style>