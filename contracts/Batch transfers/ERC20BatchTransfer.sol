// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

interface ERC20Partial {
    function transferFrom(address from, address to, uint256 value) external;
}

contract ERC20BatchTransfer {
    /// @notice Tokens on the given ERC-20 contract are transferred from you to a recipient.
    ///         Don't forget to execute `approve` first to authorize this contract and the transfer amounts.
    ///         Make sure the addresses and values are ordered correctly.
    /// @param  tokenContract   An ERC-20 contract
    /// @param  recipients      A list of who gets tokens
    /// @param  values          A list of how much each recipient receives
    function batchTransfer(ERC20Partial tokenContract, address[] calldata recipients, uint256[] calldata values) external {
        require(recipients.length > 0 && values.length > 0, 'Must input at least one recipient and one value.');
        require(recipients.length == values.length, 'Length of recipients and values must be equal.');
        for (uint256 i; i < recipients.length; i++) {
            tokenContract.transferFrom(msg.sender, recipients[i], values[i]);
        }
    }
}