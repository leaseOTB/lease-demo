const LeaseFactory = artifacts.require("LeaseFactory");


module.exports = function(deployer) {
  deployer.deploy(LeaseFactory);
};
