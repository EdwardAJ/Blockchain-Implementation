<template>
  <div class="col">
    <div class="ml-4">
      <div class="row">
        <div class="col">
          <h5 class="page-title page-title-margin"> 
            Add Company {{ companyName }}
          </h5>
        </div>
      </div>
      <div class="mt-4 animated fadeIn">
        <Input ref="name" name="Company Name" class="mt-4" />
        <Input ref="address" name="Company Address" />
        <Input ref="phone" name="Company Phone Number" />
      </div>
      <div class="row mt-3">
        <div class="col">
          <button
            :class="['btn-border', isUsernameEmpty ? 'btn-disabled': 'btn-action', 'field-length', 'form-content']" @click="handleOnSubmit()"
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

export default {
  components: {
    Input
  },
  computed: {
    companyName () {
      console.log(this.$refs['address'])
      if (this.$refs.address) {
        // console.log(this.$refs.address)
        return this.$refs.address
      }
    }
  },
  data () {
    return {
      
    }
  }
}
</script>
<style>
  @import '../../../static/css/main.css';
  @import '../../../static/css/transitions.css';
</style>