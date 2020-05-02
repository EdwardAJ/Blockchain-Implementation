import web3 from '../contract-instances/web3'

export async function getCurrentAccounts () {
  var accounts = await web3.eth.getAccounts()
  return accounts
}

export function isAccountExist (accounts) {
  return accounts.length > 0
}

export function isAttributeNotEmpty (attr) {
  return attr !== ''
}