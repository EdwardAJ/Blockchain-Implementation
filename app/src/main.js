// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

window.Event = new Vue()


// If ethereum exists
// if (window.ethereum) {
//   window.web3 = new Web3(ethereum)
//   try {
//     ethereum.enable()
//   } catch (error) {
//     alert('User deny')
//   }
// } else if (window.web3) {
//   window.web3 = new Web3(web3.currentProvider)
// } else {
//   alert('Please install MetaMask!')
// }
// console.log('WEB3: ', web3)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})