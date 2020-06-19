// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

import "../node_modules/@openzeppelin/contracts/access/AccessControl.sol";
import "./Lease.sol";

contract LeaseFactory is AccessControl {

  event LeaseCreated(address lease, address _to, address _from, string ipfs_hash);

  function sendLease (address tenant, string memory _ipfs) public {
    Lease _created = new Lease(msg.sender, tenant, _ipfs);
    emit LeaseCreated(address(_created), tenant, msg.sender, _ipfs);
  }
}