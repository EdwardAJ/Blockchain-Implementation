import Byte32Input from './inputTypeByte32'
import * as invoicingUtils from '../utils/invoicing'


export default {
  data () {
    return {
      invoiceNotFound: false
    }
  },
  mixins: [Byte32Input],
  methods: {
    async getInvoiceByID (invoiceID, companyID) {
      try {
        console.log('invoiceiD')
        var invoice = await invoicingUtils.getInvoiceStatus(invoiceID, companyID)
        return invoice
      } catch (error) {
        if (error.message.includes('Invoice not Found')) {
          this.showInvoiceNotFound()
        } else if (error.message.includes('invalid bytes32')) {
          this.showBytes32Error()
        } else {
          this.errorMessage = error.message
        }
      }
      return null
    },
    showInvoiceNotFound () {
      this.errorMessage = 'Invoice Not Found'
      this.invoiceNotFound = true
    },
    showInvoicePaidError () {
      this.errorMessage = 'Invoice has already been paid'
    },
    showBytes32Error () {
      this.errorMessage = 'invalid bytes32'
    },
    resetInvoiceAttributes () {
      this.showError = !this.showError
      this.resetBytes32Attr()
      this.invoiceNotFound = false
    }
  }
}