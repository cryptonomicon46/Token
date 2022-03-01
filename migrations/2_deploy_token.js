const Token = artifacts.require("Token");

module.exports = function(_deployer) {

    // require("dotenv").config()


  // Use deployer to state migration tasks.
  _deployer.deploy(Token,10000);
};
