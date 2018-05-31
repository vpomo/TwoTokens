var TokenA = artifacts.require("./TokenA.sol");
var TokenB = artifacts.require("./TokenB.sol");

var contractA;
var contractB;
//var owner = "0xbA22878a8E5f411D9C0F42eE34aC4B1A3950763D";
var maxTotalSupply = 1e27;
var OneToken = 121;

contract('TokenA', (accounts) => {
    var owner = accounts[0];

    it('should deployed contract Token A', async ()  => {
        assert.equal(undefined, contractA);
        contractA = await TokenA.deployed();
        assert.notEqual(undefined, contractA);
    });

    it('get address contract Token A', async ()  => {
        assert.notEqual(undefined, contractA.address);
    });
});

contract('TokenB', (accounts) => {
    var owner = accounts[0];

    it('should deployed contract Token B', async ()  => {
        assert.equal(undefined, contractB);
        contractB = await TokenB.deployed();
        assert.notEqual(undefined, contractB);
    });

    it('get address contract Token B', async ()  => {
        assert.notEqual(undefined, contractB.address);
    });

    it('init contracts Token A & Token B', async ()  => {
        await contractB.setContractUser(contractA.address, true);
        await contractA.initContractTokenB(contractB.address);
    });

    it('verification balance contracts', async ()  => {
        var totalSupplyA = await contractA.totalSupply.call();
        //console.log(JSON.stringify(totalSupplyTest));
        assert.equal( 1e12, Number(totalSupplyA));

        var balanceOwnerA = await contractA.balanceOf(owner);
        //console.log("balanceOwnerA = " + balanceOwnerA);
        assert.equal(Number(totalSupplyA), balanceOwnerA);

        var totalSupplyB = await contractB.totalSupply.call();
        assert.equal( 0, Number(totalSupplyB));

        var balanceOwnerB = await contractB.balanceOf(owner);
        assert.equal(Number(totalSupplyB), balanceOwnerB);

    });

    it('verification burning a token A', async ()  => {
        var balanceAccountTwoBefore = await contractA.balanceOf(accounts[2]);
        var result = await contractA.transfer(accounts[2], OneToken*4, {from:owner});
        //console.log(JSON.stringify(result));
        var balanceAccountTwoAfter = await contractA.balanceOf(accounts[2]);
        assert.isTrue(balanceAccountTwoBefore < balanceAccountTwoAfter);
        assert.equal(0, balanceAccountTwoBefore);
        assert.equal(OneToken*4, balanceAccountTwoAfter);

        balanceAccountTwoBeforeContractB = await contractB.balanceOf(accounts[2]);
        assert.equal(0, balanceAccountTwoBeforeContractB);

        await contractA.burn(OneToken*2, {from:accounts[2]});
        balanceAccountTwoAfter = await contractA.balanceOf(accounts[2]);
        assert.equal(OneToken*2, balanceAccountTwoAfter);

        balanceAccountTwoAfterContractB = await contractB.balanceOf(accounts[2]);
        assert.equal(OneToken*2, balanceAccountTwoAfterContractB);
    });

    it('verification burning a token B', async ()  => {
        var totalSupplyB = await contractB.totalSupply.call();
        assert.equal(OneToken*2, totalSupplyB);
        //console.log(JSON.stringify(totalSupplyB));

        var arrayAddresses = [accounts[3], accounts[4], accounts[5]];
        var balanceAccountTwoBefore = await contractB.balanceOf(accounts[2]);
        //console.log("balanceAccountTwoBefore = " + balanceAccountTwoBefore);
        var result = await contractB.burn.call(OneToken*2, arrayAddresses, {from:accounts[2]});
        //console.log("result = " + result);
        await contractB.burn(OneToken*2, arrayAddresses, {from:accounts[2]});
        var balanceAccountTwoAfter = await contractB.balanceOf(accounts[2]);
        //console.log("balanceAccountTwoAfter = " + balanceAccountTwoAfter);
        assert.isTrue(balanceAccountTwoBefore > balanceAccountTwoAfter);

        var remain = OneToken*2 % 3;
        assert.equal(remain, balanceAccountTwoAfter);
        assert.equal(OneToken*2, balanceAccountTwoBefore);

        var balanceAccountThreeAfter = await contractB.balanceOf(accounts[3]);
        //console.log("balanceAccountThreeAfter = " + balanceAccountThreeAfter);
        var withoutRemain = Number((OneToken*2 - remain)/3);
        //console.log("withoutRemain = " + withoutRemain);
        assert.equal(withoutRemain, balanceAccountThreeAfter);
});


});



