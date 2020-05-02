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
      <!-- Authority Page -->
      <b-nav-item 
        link-classes="side-bar-color ml-4 mb-2 authority-margin-top"
      >
        Authority Page
      </b-nav-item>
      <!-- All Companies -->
      <b-nav-item
        link-classes="side-bar-color mt-4 ml-4"
        @click="handleNewActiveElmtID('companies')"
      >
        <div ref="companies" id="companies">
          All Companies
        </div>
      </b-nav-item>
      <!-- Add Company -->
      <b-nav-item
        link-classes="side-bar-color mt-3 ml-4"
        @click="handleNewActiveElmtID('add-company')"
      >
        <div id="add-company">
          Add Company
        </div>
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
      <!-- Add Invoices -->
      <b-nav-item
        link-classes="side-bar-color mt-3 ml-4"
        @click="handleNewActiveElmtID('add-invoice')"
      >
        <div id="add-invoice">
          Add Invoice
        </div>
      </b-nav-item>
    </b-nav>
  </b-nav>
</template>

<script>

export default {
  data () {
    return {
      activeElmtID: 'companies'
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
      case 'companies':
        this.$router.replace({ path: '/authority/companies'})
        break
      case 'add-company':
        this.$router.replace({ path: '/authority/add-company'})
        break
      case 'invoices':
        this.$router.replace({ path: '/authority/invoices'})
        break
      case 'add-invoice':
        this.$router.replace({ path: '/authority/add-invoice'})
        break
      }
    },
    onPathChangeHandler (browserURL) {
      var elmtID = ''
      if ((/^\/authority\/companies(\/|(\?)|$)/.test(browserURL))) {
        elmtID ='companies'
      } else if ((/^\/authority\/add-company(\/|(\?)|$)/.test(browserURL))) {
        elmtID = 'add-company'
      } else if((/^\/authority\/invoices(\/|(\?)|$)/.test(browserURL))){
        elmtID = 'invoices'
      } else if((/^\/authority\/add-invoice(\/|(\?)|$)/.test(browserURL))) {
        elmtID = 'add-invoice'
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