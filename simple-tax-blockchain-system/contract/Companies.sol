pragma solidity 0.5.1;

contract Companies {
    Company[] public companiesList;
    struct Company {
        bytes32 _hashID;
        string _name;
        string _address;
        string _phoneNumber;
    }

    function addCompany(string memory __name, string memory __address, string memory __phoneNumber) public {
        bytes32 __hashID = keccak256(abi.encodePacked(__name, __address, __phoneNumber));
        require (
            bytes(__name).length > 0 && bytes(__address).length > 0 && bytes(__phoneNumber).length > 0,
            "Company attributes cannot be null"
        );
        companiesList.push(Company(__hashID, __name, __address, __phoneNumber));
    }

    function getCompanyByID(uint id) public view returns (bytes32, string memory, string memory, string memory) {
        require(
            id < getCompaniesCount(),
            "Company not found"
        );
        
        return (companiesList[id]._hashID, companiesList[id]._name, companiesList[id]._address, companiesList[id]._phoneNumber);
    }
    
    function getCompaniesCount() public view returns (uint) {
        return companiesList.length;
    }
}