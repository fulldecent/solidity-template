// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.14;

import "../Access control/ThreeChiefOfficers.sol";

contract ThreeChiefOfficersMock is ThreeChiefOfficers {
    function somethingOnlyOperatingOfficerCanDo() onlyOperatingOfficer external {
        // A thing was done
    }

    function donate() external payable {}
}