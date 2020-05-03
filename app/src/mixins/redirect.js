export default {
  methods: {
    redirectToCompaniesPage () {
      this.$router.replace({ path: '/authority/companies' })
    },
    redirectToLoginPage () {
      this.$router.replace({ path: '/login' })
    },
    refreshPage () {
      this.$router.go()
    },
    redirectToUserInvoicesPage () {
      this.$router.replace({ path: '/user/invoices' })
    }
  }
}