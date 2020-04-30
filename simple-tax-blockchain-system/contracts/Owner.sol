pragma solidity 0.6.4;
contract Owner {
    address private owner;
    modifier onlyOwner () {
        require(msg.sender == owner, "Unauthorized");
        _;
    }
    constructor () public {
        owner = msg.sender;
    }
}