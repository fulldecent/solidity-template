// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.14;

import "../Access control/ThreeChiefOfficers.sol";

contract ThreeChiefOfficersMock is ThreeChiefOfficers {
    /// @notice Do something only the operating officer can do
    function somethingOnlyOperatingOfficerCanDo() onlyOperatingOfficer external {
        // A thing was done
    }

    /// @notice Accept Ether
    function donate() external payable {}
}