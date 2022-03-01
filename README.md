# Token
ERC20 Token implementation using OpenZeppelin with tests in JS.
Using Truffle IDE + Ganache CLI 
Some basic ERC20 tests were run.
Contracts were then deployed successfully on Kovan and Ropsten.

Wallet setup:
Install the following dependencies:
  "dependencies": {
    "@openzeppelin/contracts": "^4.5.0",
    "@truffle/hdwallet-provider": "^2.0.3",
    "dotenv": "^16.0.0",
    "mnemonics": "^1.1.3"
  }
And in the 'truffle-config.js' include the following lines on the top

const HDWalletProvider = require('@truffle/hdwallet-provider');
require("dotenv").config()

Create either a .env or a secrets.json file. 
Ensure that they're listed in the .gitignore
Create an Infuria project ID at: https://infura.io

The .env file will look something like this:
INFURA_API_KEY = "xxxxx"  //This is the Infuria project id
DEPLOYMENT_ACCOUNT_KEY = "xxxxx"  //This is your private key from a Metamask account
MNEMONIC = "xxx xxxx" //This can be used instead of the private key.

You only need the INFURA_API_KEY & DEPLOYMENT_ACCOUNT_KEY OR
INFURA_API_KEY & MNEMONIC

No need for both. 


Ropsten Faucet: https://www.moonborrow.com/
Ropsten EtherScan: https://ropsten.etherscan.io/tx/0x01a532edd1e807df8bb1d4e8097ba7322e5c578ba41b390446d56ba3b76c0af4

Kovan Faucet: https://faucets.chain.link/rinkeby
Kovan Etherscan: https://kovan.etherscan.io/tx/0xca7cbe10e68a6be4e778676b45f359bb67f1d53fd95c6d9209c9ff1c6f24321c
