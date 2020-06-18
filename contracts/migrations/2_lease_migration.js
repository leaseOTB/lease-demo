const Lease = artifacts.require("Lease");

let tenantAdd = '0x70e5E479c7F1cc16185b6b9a9d6740d554a14801';
let streetAdd = '311 Redwan Road';

module.exports = function(deployer) {
  deployer.deploy(Lease, tenantAdd, streetAdd);
};
