import Redirect from './redirect'
export default {
  mixins: [Redirect],
  methods: {
    handleError (error) {
      if (error.message.includes('Unauthorized')) {
        this.redirectToLoginPage()
      } else if (error.message.includes('User denied transaction signature')) {
        alert('Transcation has been cancelled')
        this.refreshPage()
      }
    }
  }
}