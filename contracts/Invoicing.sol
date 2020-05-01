pragma solidity 0.5.16;
pragma experimental ABIEncoderV2;

import "./Owner.sol";

contract Invoicing is Owner {
    
    bytes32 hashID;
    struct Invoice {
        bytes32 hashID;
        uint256 amountToPay;
        bool isInvoicePaid;
        bool exists;
    }
    
    mapping (bytes32 => mapping (bytes32 => Invoice)) invoicesList;
    mapping(bytes32 => Invoice[]) allInvoicesByCompany;
    
    event InvoiceAdded(bytes32 _hashId);
    
    // for authority to add invoice
    function addInvoice(bytes32 _payeeID, uint256 _amountToPay) public onlyOwner {
        // Create new random hash
        hashID = keccak256(abi.encodePacked(_payeeID, _amountToPay));
        invoicesList[_payeeID][hashID] = Invoice(hashID, _amountToPay, false, true);
        allInvoicesByCompany[_payeeID].push(Invoice(hashID, _amountToPay, false, true));
        emit InvoiceAdded(hashID);
    }
    
    // for companies
    function getInvoiceStatus(bytes32 _hashID, bytes32 _payeeID) public view returns (uint256, bool){
        // Validate invoice first
        require (
            invoicesList[_payeeID][_hashID].exists == false,
            "Invoice not Found"
        );
        
        return (invoicesList[_payeeID][_hashID].amountToPay, invoicesList[_payeeID][_hashID].isInvoicePaid);
    }
    
    function getInvoicesCountByCompanyID (bytes32 _payeeID) public view returns (uint) {
        return allInvoicesByCompany[_payeeID].length;
    }
    
    // for companies
    function payInvoice(bytes32 _hashID, bytes32 _payeeID) public payable {
        // Validate invoice first
        // If invoices with hashID = _hashID exist
        require (
            invoicesList[_payeeID][_hashID].exists && msg.value >= invoicesList[_payeeID][_hashID].amountToPay,
            "Invoice not Found"
        );
        // Search for allInvoicesByCompany array
        uint count = getInvoicesCountByCompanyID(_payeeID);
        for (uint i = 0; i < count; i++) {
            if (allInvoicesByCompany[_payeeID][i].hashID == _hashID) {
                allInvoicesByCompany[_payeeID][i].isInvoicePaid = true;
                break;
            }
        }
        invoicesList[_payeeID][_hashID].isInvoicePaid = true;
    }
    
    function getInvoicesByCompanyID (bytes32 _payeeID) public view returns (Invoice[] memory) {
        uint count = getInvoicesCountByCompanyID(_payeeID);
        require (
            count > 0,
            "Invoice not Found"
        );
        return allInvoicesByCompany[_payeeID];
    }
}