import web3 from './web3.js'
import Owner from '../../../build/contracts/Owner'

const contractAddress = '0x000696FB9668704dcE7F0CfC98FE96be686FfdbF'
var instance = null

if (web3) {
  instance = new web3.eth.Contract(Owner.abi, contractAddress)
}

export default instance
