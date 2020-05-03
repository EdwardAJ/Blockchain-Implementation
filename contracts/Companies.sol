pragma solidity 0.5.16;
pragma experimental ABIEncoderV2;

import "./Owner.sol";

contract Companies is Owner {
    Company[] private companiesList;
    struct Company {
        bytes32 _companyID;
        string _name;
        string _address;
        string _phoneNumber;
    }
    
    
    function addCompany(string memory __name, string memory __address, string memory __phoneNumber) public onlyOwner {
        bytes32 __companyID = keccak256(abi.encodePacked(__name, __address, __phoneNumber));
        require (
            bytes(__name).length > 0 && bytes(__address).length > 0 && bytes(__phoneNumber).length > 0 ,
            "Company attributes cannot be null"
        );
        companiesList.push(Company(__companyID, __name, __address, __phoneNumber));
    }
    
    function getAllCompanies () public view onlyOwner returns (Company[] memory) {
        return companiesList;
    }

    function getCompanyByID(bytes32 companyID) public view returns (string memory, string memory, string memory) {
        bool isFound = false;
        uint companyIdx = 0;
        uint numOfCompanies = getCompaniesCount();
        for (uint i = 0; i < numOfCompanies; i++) {
            if (companiesList[i]._companyID == companyID) {
                isFound = true;
                companyIdx = i;
                break;
            }
        }
        require (
            isFound,
            "Company is not found!"
        );
        return (companiesList[companyIdx]._name, companiesList[companyIdx]._address, companiesList[companyIdx]._phoneNumber);
    }
    
    function getCompaniesCount() public view returns (uint) {
        return companiesList.length;
    }
    
    
}