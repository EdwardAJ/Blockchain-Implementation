import web3 from './web3.js'
import Invoicing from '../../../build/contracts/Invoicing'

const contractAddress = '0x8654C610a2302a4A37634E3D900239306abffC6B'
var instance = null

if (web3) {
  instance = new web3.eth.Contract(Invoicing.abi, contractAddress)
}

export default instance
