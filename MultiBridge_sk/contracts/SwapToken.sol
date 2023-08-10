// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./WTETH.sol";

contract TokenSwapContract is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20 public specificToken; // The specific token users deposit
    WTETH public wteth; // The WTETH token

    constructor(address _specificTokenAddress) {
        specificToken = IERC20(_specificTokenAddress);
        wteth = new WTETH();
    }

    function depositToken(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be greater than 0");

        // Transfer specific token from user to this contract
        specificToken.safeTransferFrom(msg.sender, address(this), amount);

        // Mint the same amount of WTETH to the sender
        wteth.mint(msg.sender, amount);
    }

    function withdrawCcip(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be greater than 0");

        // Burn WTETH from the sender
        wteth.burn(msg.sender, amount);

        // Transfer specific token back to the user
        specificToken.safeTransfer(msg.sender, amount);
    }

    function getWTETHBalance(address account) external view returns (uint256) {
        return wteth.balanceOf(account);
    }

    function getSpecificTokenBalance(
        address account
    ) external view returns (uint256) {
        return specificToken.balanceOf(account);
    }
}
