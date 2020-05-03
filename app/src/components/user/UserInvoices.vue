<template>
  <div class="col">
    <div class="ml-4">
      <InvoiceTable class="mt-5" ref="invoiceTable" />
    </div>
  </div>
</template>

<script>

// Components:
import InvoiceTable from '../invoice/InvoiceTable'
import { getCompanyID } from '../../utils/auth'

export default {
  components: {
    InvoiceTable
  },
  async mounted () {
    this.invoiceNotFound = true
    var companyID = getCompanyID()
    console.log('companyID: ', companyID)
    await this.$refs.invoiceTable.getInvoicesByID(companyID)
  }
}

</script>