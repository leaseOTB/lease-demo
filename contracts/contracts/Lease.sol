// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

import "../node_modules/@openzeppelin/contracts/access/AccessControl.sol";
contract Aion {
    uint256 public serviceFee;
    function ScheduleCall(
      uint256 blocknumber, address to, uint256 value, uint256 gaslimit, uint256 gasprice, bytes data, bool schedType
    ) public payable returns (uint);
}


contract Lease is AccessControl {
  // for frontend create a mapping object:
  // const statusEnum = {0 : 'Failed', 1 : 'Active', 2 : 'Completed'}
  enum LeaseStatus { Sent, Failed, Active, Completed}
  LeaseStatus public leaseStatus;

  bytes32 public constant LANDLORD_ROLE = keccak256("LANDLORD_ROLE");
  bytes32 public constant TENANT_ROLE = keccak256("TENANT_ROLE");

  uint public start;
  uint public constant year = 1517769000;
  uint public window; // window for tennant to respond to lease offer before contract expires
  uint public signTimestamp;

  // private/restricted balance for MVP or nah?
  uint128 public balance;
  uint128 public rent = 500;
  uint32 public paymentNum;

  event LeasePayment(address indexed from, bytes32 indexed to, uint value);
  event LeaseStatusUpdate(LeaseStatus current);

  Aion aion;

  constructor(address _sender, address _reciever) public {
    _setupRole(LANDLORD_ROLE, _sender);
    _setupRole(TENANT_ROLE, _reciever);

    // set reciever address and rent to deployment variable
    start = now;
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
        aion.ScheduleCall.value(callCost)( block.timestamp + time, address(this), 0, 200000, 1e9, data, true);
      }
      paymentNum++;
  }

  function checkBalance() internal {

    emit LeaseStatusUpdate(leaseStatus);
  }

}