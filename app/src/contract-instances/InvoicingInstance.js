import web3 from './web3.js'
import web3EventReader from './web3EventReader.js'

import Invoicing from '../../../build/contracts/Invoicing'

const contractAddress = Invoicing.networks['5777'].address
var instance = null

if (web3) {
  instance = new web3.eth.Contract(Invoicing.abi, contractAddress)
}

export default instance
