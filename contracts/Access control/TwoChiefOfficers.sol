// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

/// @title  Two-party access control inspired by CryptoKitties. By default, the highest-privileged account will be the
///         same account that deploys this contract.
/// @dev    Keep the CEO wallet stored offline, I warned you.
///         Subclassing notes:
///          - Use inheritance to gain functionality from `ThreeChiefOfficers`.
///          - Modify your functionss with `onlyOperatingOfficer` to restrict access as needed.
/// @author William Entriken (https://phor.net)
abstract contract TwoChiefOfficers {
    /// @notice The account that can only reassign officer accounts
    address private _executiveOfficer;

    /// @notice The account that can perform priviledged actions
    address private _operatingOfficer;

    /// @dev This throws unless called by the owner.
    modifier onlyOperatingOfficer() {
        require(msg.sender == _operatingOfficer, "TwoChiefOfficers: only the operating officer may do that");
        _;
    }

    constructor() {
        _executiveOfficer = msg.sender;
    }

    /// @notice Reassign the executive officer role
    /// @param  newExecutiveOfficer new officer address
    function setExecutiveOfficer(address newExecutiveOfficer) external {
        require(msg.sender == _executiveOfficer, "TwoChiefOfficers: only the executive officer may assign officers");
        _executiveOfficer = newExecutiveOfficer;
    }

    /// @notice Reassign the operating officer role
    /// @param  newOperatingOfficer new officer address
    function setOperatingOfficer(address payable newOperatingOfficer) external {
        require(msg.sender == _executiveOfficer, "TwoChiefOfficers: only the executive officer may assign officers");
        _operatingOfficer = newOperatingOfficer;
    }

    /// @notice Get the chief executive officer
    /// @return The chief executive officer account
    function executiveOfficer() public view returns (address) {
        return _executiveOfficer;
    }

    /// @notice Get the chief operating officer
    /// @return The chief operating officer account
    function operatingOfficer() public view returns (address) {
        return _operatingOfficer;
    }
}