// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

import "../node_modules/@openzeppelin/contracts/access/AccessControl.sol";

abstract contract Aion{
    uint256 public serviceFee;
    function ScheduleCall (
      uint256 blocknumber, address to, uint256 value, uint256 gaslimit, uint256 gasprice, bytes memory data, bool schedType
    ) public virtual payable returns (uint);
}


contract Lease is AccessControl {
  // for frontend create a mapping object:
  // const statusEnum = {0: 'Sent', 1 : 'Failed', 2 : 'Active', 3 : 'Completed'}
  enum LeaseStatus { Sent, Failed, Active, Complete}
  LeaseStatus public leaseStatus;

  bytes32 public constant LANDLORD_ROLE = keccak256("LANDLORD_ROLE");
  bytes32 public constant TENANT_ROLE = keccak256("TENANT_ROLE");

  // ALL TIMES IN UNIX EPOCH TIMESTAMP
  uint public start;
  uint public constant year = 1517769000;
  uint public window; // window for tennant to respond to lease offer before contract expires
  uint public signTimestamp;
  string public streetAddress;

  // private/restricted balance for MVP or nah?
  uint256 public balance = 0;
  uint256 public rent;
  uint32 public paymentNum = 0;

  event LeasePayment(address indexed _from, uint _value);
  event LeaseStatusUpdate(LeaseStatus _current);

  Aion aion;

  constructor(address _sender, address _reciever, string memory _streetAddress) public {
    // _setupRole(LANDLORD_ROLE, _sender)
    _setupRole(LANDLORD_ROLE, _sender);
    _setupRole(TENANT_ROLE, _reciever);

    start = now;
    // NEEDS CONSTUCTOR -> current value 1 ETH
    rent = 1 ether;
    // NEEDS CONSTRUCTOR -> current value 6/25/2020 @ 4:35PM GMT
    window = 1593102912;
    
    // NEEDS PROPER CONSTRUCTOR -> IPFS metadata hash saved in contract
    streetAddress = _streetAddress;
    leaseStatus = LeaseStatus.Sent;
    emit LeaseStatusUpdate(leaseStatus);
  }


  // use of block.timestamp only bad when we require <900sec accuracy, 1 year lease will be fine
  function signLease(bool isSigned) public {
    require(hasRole(TENANT_ROLE, msg.sender), "Caller is not the tenant");
    require(leaseStatus == LeaseStatus.Sent, "Lease is not avaible");
    if (window <= start && isSigned) {
      signTimestamp = now;
      leaseStatus = LeaseStatus.Active;
      schedulePayments(12);
    } else {
      leaseStatus = LeaseStatus.Failed;
    }
    emit LeaseStatusUpdate(leaseStatus);
  }
  //Aion Scheduling System -- can schedule transactions/function calls with or without funds
    //IMPORTANT DESIGN NOTE: we are scheduling function calls to check the current balance, not scheduling fund transfers
    //TO-DO: create fee estimation model based off data from mainnet aion contract
    //S
  function schedulePayments(uint32 count) internal {
      aion = Aion(0xFcFB45679539667f7ed55FA59A15c8Cad73d9a4E);
      bytes memory data = abi.encodeWithSelector(bytes4(keccak256('checkBalance()')));
      uint callCost = 200000*1e9 + aion.serviceFee();
      for (uint x = 1; x<=count; x++){
        uint time = 30 days;
        aion.ScheduleCall.value(callCost)(now + time, address(this), 0, 200000, 1e9, data, true);
      }
  }

  function checkBalance() internal {
    if (balance < rent) {
      leaseStatus = LeaseStatus.Failed;
    } else {
      leaseStatus = LeaseStatus.Active;
      paymentNum++;
      if (paymentNum == 12) {
        leaseStatus = LeaseStatus.Complete;
      }
      balance = 0;
    }
    emit LeaseStatusUpdate(leaseStatus);

  }

  function payRent() public payable {
    require(hasRole(TENANT_ROLE, msg.sender), "Caller is not the tenant");
    //Only accepts a complete payment at this time, future iterations need to add value transferred to balance
    require(msg.value == rent, "Innsufficent Payment");
    //Removed reicever address due to duplication, events are already tracked at contract level
    emit LeasePayment(msg.sender, msg.value);
    balance += msg.value;
  }

  function withdrawRent(uint amount) public {
    require(hasRole(LANDLORD_ROLE, msg.sender), "Caller is not the landlord");

    msg.sender.transfer(amount);
  }


}