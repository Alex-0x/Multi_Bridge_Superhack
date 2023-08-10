// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DepositContract is Ownable, ReentrancyGuard {
    mapping(address => uint256) public etherDeposits;
    mapping(address => mapping(address => uint256)) public erc20Deposits;
    mapping(address => bool) public hasDepositedSpecificToken;

    event EtherDeposited(address indexed user, uint256 amount);
    event ERC20Deposited(
        address indexed user,
        address indexed token,
        uint256 amount
    );
    event EtherWithdrawn(address indexed user, uint256 amount);
    event ERC20Withdrawn(
        address indexed user,
        address indexed token,
        uint256 amount
    );

    // Set the address of the specific token here
    address public specificTokenAddress;

    constructor(address _specificTokenAddress) {
        specificTokenAddress = _specificTokenAddress;
    }

    function depositEther() external payable {
        require(msg.value > 0, "Amount must be greater than 0");
        require(
            etherDeposits[msg.sender] == 0,
            "You can deposit Ether only once"
        );

        etherDeposits[msg.sender] = msg.value;
        emit EtherDeposited(msg.sender, msg.value);
    }

    function depositERC20(address tokenAddress, uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(
            ERC20(tokenAddress).transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );

        erc20Deposits[tokenAddress][msg.sender] += amount;

        if (
            tokenAddress == specificTokenAddress &&
            amount == etherDeposits[msg.sender]
        ) {
            hasDepositedSpecificToken[msg.sender] = true;
        }

        emit ERC20Deposited(msg.sender, tokenAddress, amount);
    }

    function withdrawEther() external nonReentrant {
        require(etherDeposits[msg.sender] > 0, "You must deposit Ether first");
        require(
            hasDepositedSpecificToken[msg.sender],
            "You must deposit the same amount of specific token"
        );

        uint256 amountToWithdraw = etherDeposits[msg.sender];
        etherDeposits[msg.sender] = 0;
        payable(msg.sender).transfer(amountToWithdraw);
        emit EtherWithdrawn(msg.sender, amountToWithdraw);
    }

    function withdrawERC20(address tokenAddress) external nonReentrant {
        require(
            hasDepositedSpecificToken[msg.sender],
            "You must deposit the same amount of specific token"
        );

        uint256 amountToWithdraw = erc20Deposits[tokenAddress][msg.sender];
        erc20Deposits[tokenAddress][msg.sender] = 0;
        require(
            ERC20(tokenAddress).transfer(msg.sender, amountToWithdraw),
            "Transfer failed"
        );
        emit ERC20Withdrawn(msg.sender, tokenAddress, amountToWithdraw);
    }

    function getEtherBalance() external view returns (uint256) {
        return etherDeposits[msg.sender];
    }

    function getERC20Balance(
        address tokenAddress
    ) external view returns (uint256) {
        return erc20Deposits[tokenAddress][msg.sender];
    }
}
