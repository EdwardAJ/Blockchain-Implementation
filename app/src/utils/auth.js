import web3 from '../contract-instances/web3'
import cookies from 'js-cookie'

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

export function setCookie (companyID, companyName) {
  // Expired in one day
  cookies.set('CompanyID', companyID, { expires: 1 })
  cookies.set('CompanyName', companyName, { expires: 1 })
}

export function deleteCookie () {
  cookies.remove('CompanyID')
  cookies.remove('CompanyName')
}

export function getCompanyID () {
  return cookies.get('CompanyID')
}

export function getCompanyName () {
  return cookies.get('CompanyName')
}