import web3 from './web3.js'
import Owner from '../../../build/contracts/Owner'

const contractAddress = '0x91a04F97C759635B3E112cC84370a85dd31F127c'
var instance = null

if (web3) {
  instance = new web3.eth.Contract(Owner.abi, contractAddress)
}

export default instance
