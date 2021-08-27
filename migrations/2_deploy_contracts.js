const Dvault = artifacts.require("Dvault");

module.exports = function(deployer) {
    deployer.deploy(Dvault);
}