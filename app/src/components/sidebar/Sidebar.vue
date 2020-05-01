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
        @click="changeActiveElmtID('companies')"
      >
        <div id="companies">
          All Companies
        </div>
      </b-nav-item>
      <!-- Add Company -->
      <b-nav-item
        link-classes="side-bar-color mt-3 ml-4"
        @click="changeActiveElmtID('add-company')"
      >
        <div id="add-company">
          Add Company
        </div>
      </b-nav-item>
      <!-- All Invoices -->
      <b-nav-item
        link-classes="side-bar-color mt-3 ml-4"
        @click="changeActiveElmtID('invoices')"
      >
        <div id="invoices">
          All Invoices
        </div>
      </b-nav-item>
      <!-- Add Invoices -->
      <b-nav-item
        link-classes="side-bar-color mt-3 ml-4"
        @click="changeActiveElmtID('add-invoice')"
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
    this.onPathChangeHandler(window.location.pathname)
  },
  methods: {
    setClass (elmtID, className) {
      let elmt = document.getElementById(elmtID)
      elmt.className = className
    },
    changeActiveElmtID (elmtID) {
      this.activeElmtID = elmtID
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
      }
      this.changeActiveElmtID(elmtID)
      this.setClass(elmtID, 'active')
    }
  }
}
</script>

<style scoped>
  .side-bar-layout {
    height: auto;
    left: 0;
    width: 250px;
    padding-left: 10px;
    overflow-y: scroll;
    position: fixed;
    top: 0;
    bottom: 0;
  }

  .side-bar-bg {
    background-color: #2C2C2C;
  }

  .side-bar-font {
    font-family: 'Lato-Light';
    font-size: 1.0rem;
    letter-spacing: 0.035rem;
  }

  .side-bar-layout::-webkit-scrollbar {
    display: none;
  }

  .side-bar-layout {
    -ms-overflow-style: none;
  }

  .icon-text-wrapper {
    display: flex;
  }

  .active {
    font-family: 'Lato-Bold';
  }

  .side-bar-color {
    color: white;
  }

  .side-bar-color:hover {
    background-color: #363636;
  }

  #app-title {
    font-family: 'Lato-Bold';
    font-size: 1.65rem;
  }

  .title-margin {
    margin-top: 20px;
  }

  .authority-margin-top {
    margin-top: -10px;
  }
</style>