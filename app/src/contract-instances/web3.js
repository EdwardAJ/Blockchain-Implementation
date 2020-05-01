import Web3 from 'web3'

// If ethereum exists
if (window.ethereum) {
  window.web3 = new Web3(ethereum)
  try {
    ethereum.enable()
  } catch (error) {
    alert('User deny')
  }
} else if (window.web3) {
  window.web3 = new Web3(web3.currentProvider)
} else {
  alert('Please install MetaMask!')
}

export default web3
