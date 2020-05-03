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
    redirectToUserPage (username) {
      this.$router.replace({ path: '/user/' + username})
    }
  }
}