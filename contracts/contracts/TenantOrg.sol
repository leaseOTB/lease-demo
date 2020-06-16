// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

import "../node_modules/@openzeppelin/contracts/access/AccessControl.sol";
import "./Lease.sol";

contract TenantOrg is AccessControl {
  struct Lease {
    bool exists;
    uint32 status;
  }

  mapping (bytes32 => Lease) public leases;

  constructor(address _tenant) public {
    
  }
}