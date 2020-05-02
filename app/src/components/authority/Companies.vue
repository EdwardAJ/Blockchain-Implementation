<template>
  <div class="col">
    <div class="ml-4">
      <div class="row">
        <div class="col">
          <h5 class="page-title page-title-margin"> 
            All Companies
          </h5>
        </div>
      </div>
      <div class="row mt-4 animated fast fadeIn">
        <div v-if="rows.length === 0">
          <p class="col not-found"> No Company Found </p>
        </div>
        <div v-else class="col table-margin-left">
          <Table
            :prop-rows="rows"
            :prop-columns="columns"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import companies from '../../contract-instances/CompaniesInstance'
import Table from '../table/Table'

// Mixins:
import Redirect from '../../mixins/redirect'
import AccountProp from '../../mixins/accountProp'

export default {
  components: {
    Table
  },
  mixins: [Redirect, AccountProp],
  async mounted () {
    try {
      console.log('Companies: ', companies)
      var response = await companies.methods.getAllCompanies().call({ from: this.account })
      this.showAllCompanies(response)
    } catch (error) {
      console.log(error)
      this.redirectToLoginPage()
    }
  },
  data () {
    return {
      columns: [
        {
          key: 'name',
          label: 'Name'
        },
        {
          key: 'address',
          label: 'Address'
        },
        {
          key: 'phoneNumber',
          label: 'Phone Number'
        },
        {
          key: 'companyID',
          label: 'Company ID'
        }
      ],
      rows: []
    }
  },
  methods: {
    showAllCompanies (companiesArray) {
      this.rows = []
      companiesArray.forEach((company) => {
        let companyObj = {
          name: company[1],
          address: company[2],
          phoneNumber: company[3],
          companyID: company[0]
        }
        this.rows.push(companyObj)
      })
    }
  }
}
</script>
<style>
  @import '../../../static/css/main.css';
  @import '../../../static/css/transitions.css';
</style>