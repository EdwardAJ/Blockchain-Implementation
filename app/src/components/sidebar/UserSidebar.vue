<template>
  <b-nav class="side-bar-layout side-bar-bg side-bar-font">
    <b-nav vertical>
      <!-- App Title -->
      <b-nav-item 
        link-classes="side-bar-color mt-5 ml-4"
        style="margin-top: 15px;"
      >
        <div id="app-title">
          Tax-Sy
        </div>
      </b-nav-item>
      <!-- User Page -->
      <b-nav-item 
        link-classes="side-bar-color ml-4 mb-2 authority-margin-top"
      >
        {{ companyName }}
      </b-nav-item>
      <!-- All Invoices -->
      <b-nav-item
        link-classes="side-bar-color mt-3 ml-4"
        @click="handleNewActiveElmtID('invoices')"
      >
        <div id="invoices">
          All Invoices
        </div>
      </b-nav-item>
      <!-- Pay Invoice -->
      <b-nav-item
        link-classes="side-bar-color mt-3 ml-4"
        @click="handleNewActiveElmtID('pay-invoice')"
      >
        <div id="pay-invoice">
          Pay Invoice
        </div>
      </b-nav-item>
    </b-nav>
  </b-nav>
</template>

<script>

export default {
  props: {
    companyName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      activeElmtID: 'invoices'
    }
  },
  watch: {
    activeElmtID (newElmtID, oldElmtID) {
      this.setClass(oldElmtID, '')
      this.setClass(newElmtID, 'active')
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.onPathChangeHandler(window.location.pathname)
    })
  },
  methods: {
    setClass (elmtID, className) {
      let elmt = document.getElementById(elmtID)
      this.$refs.companies.class = className
      elmt.className = className
    },
    changeActiveElmtID (elmtID) {
      this.activeElmtID = elmtID
    },
    handleNewActiveElmtID (elmtID) {
      this.changeActiveElmtID(elmtID)
      this.redirectRoute(elmtID)
    },
    redirectRoute (elmtID) {
      switch (elmtID) {
      case 'invoices':
        this.$router.replace({ path: '/user/invoices'})
        break
      case 'pay-invoice':
        this.$router.replace({ path: '/user/pay-invoice'})
        break
      }
    },
    onPathChangeHandler (browserURL) {
      var elmtID = ''
      if ((/^\/user\/invoices(\/|(\?)|$)/.test(browserURL))) {
        elmtID ='invoices'
      } else if ((/^\/user\/pay-invoice(\/|(\?)|$)/.test(browserURL))) {
        elmtID = 'pay-invoice'
      }
      this.changeActiveElmtID(elmtID)
      this.setClass(elmtID, 'active')
    }
  }
}
</script>

<style scoped>
  @import '../../../static/css/sidebar.css';
</style>