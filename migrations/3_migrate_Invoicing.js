var Invoicing = artifacts.require('./Invoicing.sol')
module.exports = function (deployer) {
    deployer.deploy(Invoicing);
}