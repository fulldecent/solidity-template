// SPDX-License-Identifier: MIT
pragma solidity ^0.8.38;

/// @title  Three-party access control inspired by CryptoKitties. By default, the highest-privileged account will be the
///         same account that deploys this contract.
/// @dev    Keep the CEO wallet stored offline, I warned you.
///         Subclassing notes:
///          - Use inheritance to gain functionality from `ThreeChiefOfficers`.
///          - Modify your functionss with `onlyOperatingOfficer` to restrict access as needed.
/// @author William Entriken (https://phor.net) from Solidity-Template
abstract contract ThreeChiefOfficers {
    /// @dev the account that can only reassign officer accounts
    address private _executiveOfficer;

    /// @dev the account that can perform privileged actions
    address private _operatingOfficer;

    /// @dev the account that can collect Ether from this contract
    address payable private _financialOfficer;

    /// @notice Caller is not the executive officer
    error NotExecutiveOfficer();

    /// @notice Caller is not the operating officer
    error NotOperatingOfficer();

    /// @notice Caller is not the financial officer
    error NotFinancialOfficer();

    /// @notice Restrict the caller to the operating officer
    modifier onlyOperatingOfficer() {
        if (msg.sender != _operatingOfficer) {
            revert NotOperatingOfficer();
        }
        _;
    }

    constructor() {
        _executiveOfficer = msg.sender;
    }

    /// @notice Reassign the executive officer role
    /// @param  newExecutiveOfficer new officer address
    function setExecutiveOfficer(address newExecutiveOfficer) external {
        if (msg.sender != _executiveOfficer) {
            revert NotExecutiveOfficer();
        }
        _executiveOfficer = newExecutiveOfficer;
    }

    /// @notice Reassign the operating officer role
    /// @param  newOperatingOfficer new officer address
    function setOperatingOfficer(address payable newOperatingOfficer) external {
        if (msg.sender != _executiveOfficer) {
            revert NotExecutiveOfficer();
        }
        _operatingOfficer = newOperatingOfficer;
    }

    /// @notice Reassign the financial officer role
    /// @param  newFinancialOfficer new officer address
    function setFinancialOfficer(address payable newFinancialOfficer) external {
        if (msg.sender != _executiveOfficer) {
            revert NotExecutiveOfficer();
        }
        _financialOfficer = newFinancialOfficer;
    }

    /// @notice Collect Ether from this contract
    function withdrawBalance() external {
        if (msg.sender != _financialOfficer) {
            revert NotFinancialOfficer();
        }
        (bool success, ) = _financialOfficer.call{value: address(this).balance}("");
        require(success, "ThreeChiefOfficers: transfer failed");
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

    /// @notice Get the chief financial officer
    /// @return The chief financial officer account
    function financialOfficer() public view returns (address) {
        return _financialOfficer;
    }
}