import web3 from './web3.js'
import Invoices from '../../../build/contracts/Invoices'

const contractAddress = '0x328225F6d09f3F0e12DCf9936e0AfB466E570941'
var instance = null

if (web3) {
  instance = new web3.eth.Contract(Invoices.abi, contractAddress)
}

export default instance
