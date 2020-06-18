// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

import "../node_modules/@openzeppelin/contracts/access/AccessControl.sol";
import "./Lease.sol";

contract TenantOrg is AccessControl {

  uint public minimumQuorum;
  uint public debatingPeriod;
  Lease public voter;
  address public founder;
  Proposal[] public proposals;
  uint public numProposals;

  event ProposalAdded(uint proposalID, address recipient, uint amount, bytes32 data, string description);
  event Voted(uint proposalID, int position, address voter);
  event ProposalTallied(uint proposalID, int result, uint quorum, bool active);

  struct Proposal {
      address recipient;
      uint amount;
      bytes32 data;
      string description;
      uint creationDate;
      bool active;
      Vote[] votes;
      mapping (address => bool) voted;
  }

  struct Vote {
      int position;
      address voter;
  }

  enum OrgState { Voting }
  mapping (bytes32 => Lease) public leases;

  constructor() public {
    
  }
}