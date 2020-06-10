const Lease = artifacts.require('Lease')

module.exports = function (deployer) {
  deployer.deploy(Lease)
}