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
import Table from '../table/Table'
export default {
  components: {
    Table
  },
  data () {
    return {
      columns: [
        {
          key: 'companyID',
          label: 'Company ID',
          sortable: true
        },
        {
          key: 'name',
          label: 'Name',
          sortable: true
        },
        {
          key: 'address',
          label: 'Address',
          sortable: true
        },
        {
          key: 'phoneNumber',
          label: 'Phone Number',
          sortable: true
        }
      ],
      rows: [
        {
          companyID: 'asdda',
          name: 'Aing',
          address: 'Jl. asdad',
          phoneNumber: '08222'
        },
        {
          companyID: 'asdda',
          name: 'Aing',
          address: 'Jl. asdad',
          phoneNumber: '08222'
        }
      ]
    }
  }
}
</script>
<style>
  @import '../../../static/css/main.css';
</style>