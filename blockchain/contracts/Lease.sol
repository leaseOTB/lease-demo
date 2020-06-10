pragma solidity >=0.4.21 <0.7.0;

contract Lease {
  // for frontend create a mapping object:
  // const statusEnum = {0 : 'Failed', 1 : 'Active', 2 : 'Completed'}
  enum LeaseStatus { Failed, Active, Completed}
  address public owner;
  address public reciever;

  uint public start;

  // window for tennant to respond to lease offer before contract expires
  uint window = 365 days;

  LeaseStatus public leaseStatus;

  // private/restricted balance for MVP or nah?
  uint128 public balance;
  uint128 public rent;

  constructor(address _reciever) public {
    owner = msg.sender;
    reciever = _reciever;
    // set reciever address and rent to deployment variable
    start = now;
    leaseStatus = LeaseStatus.Active;
  }

  modifier restricted() {
    require(msg.sender == owner, "Sender not authorized");
    _;
  }

  modifier recieverOnly() {
    require(msg.sender == reciever, "Sender not authorized");
    _;
  }

  // use of block.timestamp only bad when we require <900sec accuracy, 1 year lease will be fine
  function signLease(bool isSigned) public recieverOnly {
    if (!checkEnd()) {
      if (isSigned) {
        leaseStatus = LeaseStatus.Completed;
      } else {
        leaseStatus = LeaseStatus.Failed;
      }
    }
  }

  function checkEnd() private view returns(bool) {
    return (leaseStatus != LeaseStatus.Active || start + window < now);
  }

}
