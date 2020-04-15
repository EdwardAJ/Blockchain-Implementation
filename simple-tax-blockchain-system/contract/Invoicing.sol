pragma solidity 0.5.1;

contract Invoicing {
    
    address private owner;
    bytes32 hashID;
    struct Invoice {
        address payerID;
        address payeeID;
        uint256 amountToPay;
        bool isInvoicePaid;
        bool exists;
    }
    
    mapping (bytes32 => Invoice) invoicesList;
    
    modifier onlyOwner () {
        require(msg.sender == owner, "Unauthorized");
        _;
    }
    
    
    constructor () public {
        owner = msg.sender;
    }
    // for authority to add invoice
    function addInvoice(address _payeeID, uint256 _amountToPay) public onlyOwner {
        // Create new random hash
        hashID = keccak256(abi.encodePacked(_payeeID, _amountToPay));
        invoicesList[hashID] = Invoice(msg.sender, _payeeID, _amountToPay, false, true);
        getHashID();
    }
    
    function getHashID () private view onlyOwner returns (bytes32) {
        return hashID;
    }
    
    // for companies
    function getInvoiceStatus(bytes32 _hashID, address _payeeID) public view returns (uint256, bool){
        // Validate invoice first
        require (
            invoicesList[_hashID].exists && invoicesList[_hashID].payeeID == _payeeID,
            "Invoice not Found"
        );
        
        return (invoicesList[_hashID].amountToPay, invoicesList[_hashID].isInvoicePaid);
    }
    
    // for companies
    function payInvoice(bytes32 _hashID, address _payeeID) public payable {
        // Validate invoice first
        // If invoices with hashID = _hashID exist
        require (
            invoicesList[_hashID].exists && invoicesList[_hashID].payeeID == _payeeID && msg.value >= invoicesList[_hashID].amountToPay,
            "Invoice not Found"
        );
        invoicesList[_hashID].isInvoicePaid = true;
    }
    
}