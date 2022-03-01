const Token = artifacts.require("Token");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Token",  (accounts) => {
    const tokenName = "Token";
    const tokenSymbol = "TOK";
    const tokenDecimals = "18";
    const initialSupply = "10000";

  beforeEach(async () => {
    tok = await Token.new(10000,{from: accounts[0]});
    // Token = await Token.deployed()

  })
  it("Get Initial supply in the contract", async () => {
    let balance = await tok.balanceOf(accounts[0]);
    balance = web3.utils.fromWei(balance);
    console.log(balance.toString());

    assert.equal(balance,initialSupply,"Balance should be 100 Ether");
  })

  it("Token Information", async ()=> {
    const name = await tok.name.call();
    assert.strictEqual(name.toString(),tokenName,"Symbol should be ZAZL");

    const decimals = await tok.decimals.call();
    console.log(decimals.toNumber())
    assert.strictEqual(decimals.toString(),tokenDecimals,"Decimals should be 18");


    const symbol = await tok.symbol.call();
    assert.strictEqual(symbol.toString(),tokenSymbol,"Symbol should be ZAZL");


  }
  
  )
  it("Normal transfer without approval", async () => {
      let amount = web3.utils.toWei("10","ether")
      var balanceBefore = await tok.balanceOf(accounts[0])
      assert.strictEqual(web3.utils.fromWei(balanceBefore,"ether"),initialSupply,"Initial Supply should be 10000")

      await tok.transfer(accounts[1],amount,{from: accounts[0]})
      let balanceAfter = await tok.balanceOf(accounts[1])
    //   balanceAfter = web3.utils.fromWei(balance,"ether")
    //   console.log(balance)
      assert.equal(Number(balanceAfter),amount,"Transfer of amount failed!")
  })


  it("Set Allowance of 100 on accounts1", async () => {
    let amount = web3.utils.toWei("100","ether");
    await tok.approve(accounts[1],amount, {from:accounts[0]})
    let allowance = await tok.allowance(accounts[0],accounts[1])
    // console.log("Allowance=" + Number(allowance))
    assert.equal(Number(allowance),amount,"Allowance not set!")
    // assert.equal(allowance,ammount,"Allowance not set to 5 Eth!")

    })

    it("Transfer 10000 tokens to acounts1", async ()=>{

        var balanceBefore = await tok.balanceOf(accounts[0])
        assert.strictEqual(web3.utils.fromWei(balanceBefore,"ether"),initialSupply,"Initial Supply should be 10000")
  
        var balanceBefore1= await tok.balanceOf(accounts[1])
        assert.strictEqual(web3.utils.fromWei(balanceBefore1,"ether"),"0","Initial balance accounts1 should be 0")
        
        await tok.transfer(accounts[1],10000,{from: accounts[0]})
        let balanceAfter1 = await tok.balanceOf(accounts[1])
        // balance = web3.utils.fromWei(balance,"ether")
        // console.log("Balance:" + balance.toString())
        assert.equal(Number(balanceAfter1),10000)
        

    })


    it("Transfer 10001 acounts1 should fail", async ()=>{
        let threw = false
        var balanceBefore = await tok.balanceOf(accounts[0])
        assert.strictEqual(web3.utils.fromWei(balanceBefore,"ether"),initialSupply,"Initial Supply should be 10000")
  
        var balanceBefore1= await tok.balanceOf(accounts[1])
        assert.strictEqual(web3.utils.fromWei(balanceBefore1,"ether"),"0","Initial balance accounts1 should be 0")
        try {
            await tok.transfer(accounts[1],web3.utils.toWei(10001),{from:accounts[0]})
            var balAfter1= await tok.balanceOf(accounts[1])
            console.log(web3.utils.fromWei(balAfter1),"ether")
   
        }catch(e){
            threw = true
        }
        assert.equal(threw,true,"Cannot transfer more than initial supply")


    })


    it("Accounts0 approves accounts1 to 100 and withdraws 10 once", async () => {
        
        var bal0 = await tok.balanceOf(accounts[0])
        assert.strictEqual(web3.utils.fromWei(bal0,"ether"),initialSupply,"Initial Supply should be 10000")
  
        let bal2 = await tok.balanceOf(accounts[2])
        assert.strictEqual(web3.utils.fromWei(bal2,"ether"),"0")   
        let amount = web3.utils.toWei("100")
        await tok.approve(accounts[1],amount, {from:accounts[0]})

        await tok.transferFrom(accounts[0],accounts[2],web3.utils.toWei("20"),{from: accounts[1]})
        bal2 = await tok.balanceOf(accounts[2])
        assert.strictEqual(web3.utils.fromWei(bal2,"ether"),"20")   

        let allow1 = await tok.allowance(accounts[0],accounts[1])
        assert.strictEqual(web3.utils.fromWei(allow1),"80")

        bal0 = await tok.balanceOf(accounts[0])
        console.log(web3.utils.fromWei(bal0))
        assert.equal(web3.utils.fromWei(bal0),9980,"Balanace account0 should be 9980")


        await tok.transferFrom(accounts[0],accounts[2],web3.utils.toWei("20"),{from: accounts[1]})
        bal2 = await tok.balanceOf(accounts[2])
        assert.strictEqual(web3.utils.fromWei(bal2,"ether"),"40")  


   
    })


    it("Approve accounts1 to 100 and then transfer 50 and 60", async ()=> {
        var bal0 = await tok.balanceOf(accounts[0])
        assert.strictEqual(web3.utils.fromWei(bal0,"ether"),initialSupply)

        let amount1 = web3.utils.toWei("100","ether");
        let amount2 = web3.utils.toWei("50","ether");
        let amount3 = web3.utils.toWei("60","ether")
        await tok.approve(accounts[1],amount1, {from:accounts[0]})

        var bal2 = await tok.balanceOf(accounts[2])
        assert.strictEqual(web3.utils.fromWei(bal2,"ether"),"0")

        await tok.transferFrom(accounts[0],accounts[2],amount2,{from:accounts[1]})
        bal2 = await tok.balanceOf(accounts[2])
        // bal2 = web3.utils.fromWei(bal2,"ether")
        assert.strictEqual(web3.utils.fromWei(bal2,"ether"),"50")


        let allow1 = await tok.allowance(accounts[0],accounts[1])
        assert.strictEqual(web3.utils.fromWei(allow1,"ether"),"50")

        var threw2 = false
        try{
            await tok.transferFrom(accounts[0],accounts[2],amount3,{from:accounts[1]})

        }
        catch(e) {
            threw2 = true
            console.log("Not enough allowance:",threw2)
        }
        assert.equal(threw2,true)
        

        // await Token.transferFrom(accounts[0],accounts[2],amount2,{from:accounts[1]})
        // bal2 = await Token.balanceOf(accounts[2])
        // // bal2 = web3.utils.fromWei(bal2,"ether")
        // assert.strictEqual(web3.utils.fromWei(bal2,"ether"),"50")
    })
    // it("Creation should create 2^256 -1 max tokens", async () => {
    //     let z = await Token.new('11579',{from: accounts[0]})
    //     let totalSupply = await z.balanceOf(accounts[0]);
    //     totalSupply = web3.utils.fromWei(totalSupply,"ether")
    //     console.log(totalSupply.toString())
    //     // assert.strictEqual(totalSupply,'115792089237316195423570985008687907853269984665640564039457584007913129639935')
    
    //  })

})
