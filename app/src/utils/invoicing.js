import invoicing from '../contract-instances/InvoicingInstance'

export async function getInvoiceStatus (invoiceID, companyID) {
  var invoice = await invoicing.methods.getInvoiceStatus(invoiceID, companyID).call()
  
  // invoice[0] = amount; invoice[1] = paid or not
  return invoice
}

export const ownerAddress = '0xdbFE67093c45622Bb4fC55181c40E745f82d7fa8'

export async function getEthereumToIDRRate () {
  var response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=idr')
  var data = await response.json()
  return data.ethereum.idr
}

export function convertIDRToEth (amount, rate) {
  return amount * (1 / rate)
}