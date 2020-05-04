import web3 from './web3.js'
import Owner from '../../../build/contracts/Owner'

const contractAddress = Owner.networks['5777'].address
var instance = null

if (web3) {
  instance = new web3.eth.Contract(Owner.abi, contractAddress)
}

export default instance
