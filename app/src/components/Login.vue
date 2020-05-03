<template>
  <div class="container-fluid">
    <div class="row bg-login center">
      <div class="col center-inside">
        <div class="row">
          <div class="col">
            <Input
              ref="companyID"
              :show-error="showError"
              name="Company ID"
              :typeCompanyID="typeCompanyID"
              :error-message="errorMessage"
              class="mt-5"
            />
          </div>
        </div>
        <div class="row mt-3">
          <div id="btn-submit" class="col">
            <button
              :class="['btn-border', 'btn-action', 'field-length', 'form-content']" @click="handleOnSubmit()"
            > 
              <p class="btn-content">
                Login
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Input from './form/Input'
import * as auth from '../utils/auth'

// Mixins:
import Redirect from '../mixins/redirect'
import CompanyIDInput from '../mixins/inputCompanyID'

export default {
  data () {
    return {
      account: '',
      showError: false
    }
  },
  components: {
    Input
  },
  mixins: [Redirect, CompanyIDInput],
  methods: {
    async handleOnSubmit () {
      this.resetAttributes()
      // Get account address
      var currentAccounts = await auth.getCurrentAccounts()
      if (auth.isAccountExist(currentAccounts)) {
        this.account = currentAccounts[0]
        this.showError = !this.showError
        var companyID = this.$refs.companyID.data
        if (auth.isAttributeNotEmpty(companyID)) {
          // getCompanyID is Mixin method
          await this.getCompanyByID(companyID, this.account)
          if (this.companyName !== '') {
            // Set cookie and redirect to user page
            auth.setCookie(companyID, this.companyName)
            this.redirectToUserPage()
          }
        }
      }
    },
    resetAttributes () {
      this.resetCompanyIDAttributes()
      this.companyName = ''
    }
  }
}

</script>

<style>
  @import '../../static/css/main.css';
  @import '../../static/css/input.css';
  @import '../../static/css/transitions.css';
</style>