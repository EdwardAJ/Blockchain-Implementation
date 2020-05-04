import web3 from '../contract-instances/web3'
import { getCurrentAccounts, isAccountExist } from './auth'

export async function sendEthereum (toAddress, amount) {
  var accounts = await getCurrentAccounts()
  if (isAccountExist(accounts)) {
    var fromAddress = accounts[0]
    var strAmount = amount.toString()
    var amountToSend = await web3.utils.toWei(strAmount, "ether")
    var send = await web3.eth.sendTransaction({ from: fromAddress, to: toAddress, value: amountToSend})
    console.log('SEND: ', send)
  }
}