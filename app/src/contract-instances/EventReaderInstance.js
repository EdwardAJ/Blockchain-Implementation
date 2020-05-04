import web3EventReader from './web3EventReader.js'

import Invoicing from '../../../build/contracts/Invoicing'

const contractAddress = Invoicing.networks['5777'].address
var instanceEventReader = null

if (web3EventReader) {
  var instanceEventReader = new web3.eth.Contract(Invoicing.abi, contractAddress)
}

export default instanceEventReader
