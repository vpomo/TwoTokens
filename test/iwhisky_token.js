var iWhiskyToken = artifacts.require("./TokenA.sol");
//import assertRevert from './helpers/assertRevert';

contract('iWhiskyToken', (accounts) => {
    var contract;
    //var owner = "0xbA22878a8E5f411D9C0F42eE34aC4B1A3950763D";
    var owner = accounts[0];
    var maxTotalSupply = 1e27;
    var OneToken = 10**18;

    it('should deployed contract', async ()  => {
        assert.equal(undefined, contract);
        contract = await iWhiskyToken.deployed();
        assert.notEqual(undefined, contract);
    });

    it('get address contract', async ()  => {
        assert.notEqual(undefined, contract.address);
    });

    it('verification balance contract', async ()  => {
        var totalSupplyTest = await contract.totalSupply.call();
        //console.log(JSON.stringify(totalSupplyTest));
        assert.equal(Number(totalSupplyTest), Number(maxTotalSupply));

        var balanceOwner = await contract.balanceOf(owner);
        //console.log("balanceOwner = " + balanceOwner);
        assert.equal(Number(totalSupplyTest), balanceOwner);
    });

    it('verification of transfer Token', async ()  => {
        var balanceAccountTwoBefore = await contract.balanceOf(accounts[2]);
        var balanceAccountOwnerBefore = await contract.balanceOf(accounts[0]);

        await contract.transfer(accounts[2], OneToken, {from:accounts[0]});
        var balanceAccountTwoAfter = await contract.balanceOf(accounts[2]);
        var balanceAccountOwnerAfter = await contract.balanceOf(accounts[0]);

        assert.isTrue(balanceAccountTwoBefore < balanceAccountTwoAfter);
        assert.isTrue(Number(balanceAccountOwnerBefore) > Number(balanceAccountOwnerAfter));
        assert.equal(0, balanceAccountTwoBefore);
        assert.equal(OneToken, balanceAccountTwoAfter);
    });
});



