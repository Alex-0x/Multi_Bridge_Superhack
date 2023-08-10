// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WTETH is ERC20, Ownable {
    mapping(address => bool) public minters;

    constructor() ERC20("Wrapped Ether", "WTETH") {
        minters[msg.sender] = true;
    }

    modifier onlyMinter() {
        require(minters[msg.sender], "Only minter can call this");
        _;
    }

    function addMinter(address _minter) external onlyOwner {
        minters[_minter] = true;
    }

    function removeMinter(address _minter) external onlyOwner {
        minters[_minter] = false;
    }

    function mint(address account, uint256 amount) external onlyMinter {
        require(account != address(0), "Mint to the zero address");
        _mint(account, amount);
    }

    function burn(address account, uint256 amount) external onlyMinter {
        require(account != address(0), "Burn from the zero address");
        _burn(account, amount);
    }
}
