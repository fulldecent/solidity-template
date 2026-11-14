// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.38; // code below expects that integer overflows will revert
import "../Utilities/Withdrawable.sol";

contract WithdrawableMock is Withdrawable {
    /// @notice Accept Ether
    function sendValue() external payable {
    }

    /// @notice Increase the amount a beneficiary can withdraw
    /// @param beneficiary which beneficiary can withdraw
    /// @param amount amount (in Wei) that is pending withdrawal
    function increasePendingWithdrawal(address beneficiary, uint256 amount) external {
        _increasePendingWithdrawal(beneficiary, amount);
    }
}