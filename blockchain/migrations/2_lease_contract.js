const Lease = artifacts.require('MintLease')

module.exports = function (deployer) {
  deployer.deploy(Lease)
}