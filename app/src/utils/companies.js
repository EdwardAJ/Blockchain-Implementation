import companies from '../contract-instances/CompaniesInstance'

export async function getCompanyByIDFromContract (companyID) {
  var company = await companies.methods.getCompanyByID(companyID).call()
  return company
}