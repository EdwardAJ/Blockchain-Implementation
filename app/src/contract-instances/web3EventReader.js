import Web3 from 'web3'

var web3EventReader = null

if (window.web3) {
  web3EventReader = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:7545'))
}

export default web3EventReader