export default {
  methods: {
    redirectToAuthorityPage () {
      this.$router.push({ path: 'authority' })
    },
    redirectToLoginPage () {
      this.$router.push({ path: 'login' })
    },
    refreshPage () {
      this.$router.go()
    }
  }
}