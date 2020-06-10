pragma solidity >=0.4.21 <0.7.0;

contract Lease {
  address public owner;
  address public reciever;

  uint public start;

  // unix timestamp year
  uint constant year = 1517769000;

  // window for tennant to respond to lease offer before contract expires
  uint constant window = 0;

  bool public accepted;
  bool public completed;

  // private/restricted balance for MVP or nah?
  uint128 public balance;
  uint128 public rent;

  constructor() public {
    owner = msg.sender;
    // set reciever address and rent to deployment variable
    start = 0;
  }

  modifier restricted() {
    if (msg.sender == owner) _;
  }

  modifier recieverOnly() {
    if (msg.sender == reciever) _;
  }

  // use of block.timestamp only bad when we require <900sec accuracy, 1 year lease will be fine
  function signLease(bool isSigned) public recieverOnly {
    if (accepted || completed ) return;
    if (isSigned) {
      if (start == 0) {
        start = block.timestamp;
      }
    } else {
      completed = true;
      // change lease status to failed
    }
  }

  function checkEnd() public {
    if (start + year <= block.timestamp || completed) return;
    if (start + year >= block.timestamp && !completed) {
      completed = true;
      // change lease status to finished
    }
  }

}
