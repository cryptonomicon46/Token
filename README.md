# Token. 
ENS: cryptosandman.eth

ERC20 Token implementation using OpenZeppelin's ERC20 contract instead of creating it from scratch.
Environment:  Truffle IDE + Ganache CLI, TestNets: Kovan,Ropsten

Some basic ERC20 tests were implemented to explore the concepts.
Contracts were then deployed successfully locally on Ganache and on testnets Kovan and Ropsten.

To deploy on testnets use the below setup:

  "dependencies": {
    "@openzeppelin/contracts": "^4.5.0",
    "@truffle/hdwallet-provider": "^2.0.3",
    "dotenv": "^16.0.0",
    "mnemonics": "^1.1.3"
  }
In the 'truffle-config.js' include the following lines on the top

const HDWalletProvider = require('@truffle/hdwallet-provider');
require("dotenv").config()

Create either a .env file and listed in .gitignore so it doesn't get committed to the Github.

Create an Infuria project ID at: https://infura.io and include it along with the private key in the .env file.

The .env file will look like this:
INFURA_API_KEY = "xxxxx"  //This is the Infuria project id
DEPLOYMENT_ACCOUNT_KEY = "xxxxx"  //This is your private key from a Metamask account


Links to get testnet ETH as shown below so you don't have to google them:

Ropsten Faucet: https://www.moonborrow.com/
Ropsten EtherScan: https://ropsten.etherscan.io/tx/0x01a532edd1e807df8bb1d4e8097ba7322e5c578ba41b390446d56ba3b76c0af4

Kovan Faucet: https://faucets.chain.link/rinkeby
Kovan Etherscan: https://kovan.etherscan.io/tx/0xca7cbe10e68a6be4e778676b45f359bb67f1d53fd95c6d9209c9ff1c6f24321c
