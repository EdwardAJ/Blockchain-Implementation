<template>
  <div>
    <div class="row mt-2 animated fadeIn" :key="invoiceNotFound">
      <div v-if="invoiceNotFound">
        <p class="col not-found"> Invoice Not Found </p>
      </div>
      <div v-else class="col table-margin-left">
        <div class="row mt-4">
          <p class="col invoices-status"> Unpaid Invoices: </p>
        </div>
        <Table
          v-if="rowsUnpaid.length > 0"
          :prop-rows="rowsUnpaid"
          :prop-columns="columns"
        />
        <div class="row mt-4">
          <p class="col invoices-status"> Paid Invoices: </p>
        </div>
        <Table
          v-if="rowsPaid.length > 0"
          :prop-rows="rowsPaid"
          :prop-columns="columns"
        />
      </div>
    </div>
  </div>
</template>

<script>

import invoicing from '../../contract-instances/InvoicingInstance'

// Components:
import Table from '../table/Table'

export default {
  components: {
    Table
  },
  data () {
    return {
      columns: [
        {
          key: 'invoiceID',
          label: 'Invoice ID'
        },
        {
          key: 'amount',
          label: 'Amount'
        }
      ],
      rowsPaid: [],
      rowsUnpaid: [],
      invoiceNotFound: true,
    }
  },
  methods: {
    async getInvoicesByID (companyID, account) {
      try {
        var invoicesArray = await invoicing.methods.getInvoicesByCompanyID(companyID).call()
        this.showInvoices(invoicesArray)
      } catch (error) {
        if (error.message.includes('Invoice not Found')) {
          this.showInvoiceNotFound()
        }
      }
    },
    showInvoiceNotFound () {
      this.invoiceNotFound = true
    },
    showInvoices (invoicesArray) {
      this.rowsPaid = []
      this.rowsUnpaid = []
      this.invoiceNotFound = false

      invoicesArray.forEach((invoice) => {
        let invoiceObj = {
          invoiceID: invoice[0],
          amount: invoice[1]
        }
        // Paid invoice
        if (invoice[2]) {
          this.rowsPaid.push(invoiceObj)
        } else {
          this.rowsUnpaid.push(invoiceObj)
        }
      })
    }
  }
}
</script>

<style>
  @import '../../../static/css/main.css';
  @import '../../../static/css/transitions.css';
</style>