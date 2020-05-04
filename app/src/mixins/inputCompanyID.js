import Byte32Input from './inputTypeByte32'
import { getCompanyByIDFromContract } from '../utils/companies'


export default {
  data () {
    return {
      companyNotFound: false,
      companyName: ''
    }
  },
  mixins: [Byte32Input],
  methods: {
    async getCompanyByID (companyID) {
      try {
        var company = await getCompanyByIDFromContract(companyID)
        this.showCompanyName(company[0])
      } catch (error) {
        if (error.message.includes('Company is not found')) {
          this.showCompanyNotFound()
        } else if (error.message.includes('invalid bytes32')) {
          this.showBytes32Error()
        } else {
          this.errorMessage = error.message
        }
      }
    },
    showCompanyName (companyName) {
      this.companyName = companyName
    },
    async showCompanyNotFound () {
      this.errorMessage = 'Company Not Found'
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