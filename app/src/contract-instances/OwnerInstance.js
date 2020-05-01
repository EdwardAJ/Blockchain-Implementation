import web3 from './web3.js'
import Owner from '../../../build/contracts/Owner'

const contractAddress = '0x3f5dA77396926AB653685c7e48839D268a523E8b'
var instance = null

if (web3) {
  instance = new web3.eth.Contract(Owner.abi, contractAddress)
}

export default instance
