import Byte32Input from './inputTypeByte32'
import companies from '../contract-instances/CompaniesInstance'

export default {
  data () {
    return {
      companyNotFound: false
    }
  },
  mixins: [Byte32Input],
  methods: {
    async getCompanyByID (companyID, account) {
      try {
        var company = await companies.methods.getCompanyByID(companyID).call({ from: account })
        this.showCompanyName(company[0])
      } catch (error) {
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
    },
    resetCompanyIDAttributes () {
      this.showError = !this.showError
      this.resetBytes32Attr()
      this.companyNotFound = false
    }
  }
}