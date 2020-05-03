import web3 from './web3.js'
import Companies from '../../../build/contracts/Companies'

const contractAddress = '0xF041F74882221eA68c662A86EDF965FD4927B982'
var instance = null

if (web3) {
  instance = new web3.eth.Contract(Companies.abi, contractAddress)
}

export default instance