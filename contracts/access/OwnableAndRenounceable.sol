// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/// @title  This contract allows an account to have access to certain contract features. By default this owner will be
///         the same account that deploys this contract. And an owner can transfer to a new owner.
/// @dev    Subclassing notes:
///          - Use inheritance to gain functionality from `OwnableAndRenounceable`
///          - Modify your functions with `onlyOwner` to limit access to `Owner`
/// @author William Entriken
abstract contract OwnableAndRenounceable {
    address private _owner;

    /// @notice The contract owner was reassigned to a new account
    /// @param  previousOwner The account that used to be the owner
    /// @param  newOwner      The account that is now the owner
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /// @dev This throws unless called by the owner
    modifier onlyOwner() {
        require(owner() == msg.sender, "OwnableAndRenounceable: calling is function is restricted to the owner, and the caller is not the owner");
        _;
    }

    /// @dev The owner defaults to the account that deployed this contract.
    constructor() {
        _transferOwnership(msg.sender);
    }

    /// @notice Returns the address that is the owner
    /// @return The address of the owner account
    function owner() public view returns (address) {
        return _owner;
    }

    /// @notice Transfers ownership of the contract to `newOwner`. Transferring to the zero address is disallowed, if
    ///         you want to disown this contract, see `renounceOwnership`. Can only be called by the current owner. 
    /// @param  newOwner The account that will become the owner
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "OwnableAndRenounceable: transferring to the zero address is disallowed, if you want to disown the contract, see `renounceOwnership`");
        _transferOwnership(newOwner);
    }

    /// @notice Leaves the contract without an owner. Certain contract features no will permanently disabled. Can only
    ///         be called by the current owner.
    /// @dev    It will not be possible to call `onlyOwner` functions anymore.
    function renounceOwnership() public onlyOwner {
        _transferOwnership(address(0));
    }

    /// @dev   Transfers ownership of the contract to `newOwner`. This does not check any access restrictions.
    /// @param newOwner The account that will become the owner
    function _transferOwnership(address newOwner) internal {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}