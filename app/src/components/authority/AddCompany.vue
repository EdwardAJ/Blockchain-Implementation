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
      <div class="row mt-2">
        <div class="col">
          
        </div>
      </div>
      <Input name="Company Name" />
    </div>
  </div>
</template>

<script>

import companies from '../../contract-instances/CompaniesInstance'
import Input from '../form/Input'

export default {
  data () {
    return {
      
    }
  }
}
</script>
<style>
  @import '../../../static/css/main.css';
</style>