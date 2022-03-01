// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {

    constructor(uint256 _supply) ERC20("Token", "TOK") {
        _mint(msg.sender, _supply*10**decimals());
    }
}