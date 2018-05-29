const TokenA = artifacts.require('./TokenA.sol');

module.exports = (deployer) => {
    //http://www.onlineconversion.com/unix_time.htm
    var owner = "0xbA22878a8E5f411D9C0F42eE34aC4B1A3950763D";
    deployer.deploy(TokenA, owner);
};
