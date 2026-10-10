// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.14;

/// @title  Mutex contract
/// @notice A lock that records whether it is held
/// @author William Entriken
contract Mutex {
    /// @notice The lock is already held
    error AlreadyLocked();

    /// @notice The lock is already released
    error AlreadyUnlocked();

    bool private _locked;

    /// @notice The lock was acquired
    event Locked();

    /// @notice The lock was released
    event Unlocked();

    /// @notice Acquire the lock
    function lock() external {
        if (_locked) {
            revert AlreadyLocked();
        }
        _locked = true;
        emit Locked();
    }

    /// @notice Release the lock
    function unlock() external {
        if (!_locked) {
            revert AlreadyUnlocked();
        }
        _locked = false;
        emit Unlocked();
    }

    /// @notice Whether the lock is held
    /// @return whether the lock is held
    function locked() external view returns (bool) {
        return _locked;
    }
}
