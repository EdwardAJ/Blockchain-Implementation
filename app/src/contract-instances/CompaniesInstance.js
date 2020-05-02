import web3 from './web3.js'
import Companies from '../../../build/contracts/Companies'

const contractAddress = '0x09b8e78a0854Fa613E466E126390f373a66553B3'
var instance = null

if (web3) {
  instance = new web3.eth.Contract(Companies.abi, contractAddress)
}

export default instance