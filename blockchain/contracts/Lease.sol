pragma solidity >=0.4.21 <0.7.0;

contract Lease {
  address public owner;
  address public reciever;

  uint public last_completed_migration;

  constructor() public {
    owner = msg.sender;
  }

  modifier restricted() {
    if (msg.sender == owner) _;
  }

  modifier recieverOnly() {
    if (msg.sender == reciever) _;
  }

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }
}
