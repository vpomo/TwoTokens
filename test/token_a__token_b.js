var TokenA = artifacts.require("./TokenA.sol");
var TokenB = artifacts.require("./TokenB.sol");

contract('TokenA', (accounts) => {
    var contractA;
    var contractB;
    //var owner = "0xbA22878a8E5f411D9C0F42eE34aC4B1A3950763D";
    var owner = accounts[0];
    var maxTotalSupply = 1e27;
    var OneToken = 10**18;

    it('should deployed contract Token A', async ()  => {
        assert.equal(undefined, contractA);
        contractA = await TokenA.deployed();
        assert.notEqual(undefined, contractA);
    });

    it('get address contract Token A', async ()  => {
        assert.notEqual(undefined, contractA.address);
    });

    it('should deployed contract Token B', async ()  => {
        assert.equal(undefined, contractB);
        contractB = await TokenB.deployed();
        assert.notEqual(undefined, contractB);
    });

    it('get address contract Token B', async ()  => {
        assert.notEqual(undefined, contractB.address);
    });

});



