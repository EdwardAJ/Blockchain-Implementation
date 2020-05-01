pragma solidity 0.5.16;
contract Owner {
    address private owner;
    modifier onlyOwner () {
        require(msg.sender == owner, "Unauthorized");
        _;
    }
    constructor () public {
        owner = msg.sender;
    }
    
    function isCurrentOwner() public view onlyOwner returns (bool) {
        return true;
    }
}