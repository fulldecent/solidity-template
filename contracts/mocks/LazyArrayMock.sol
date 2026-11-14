// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.14;
import "../Data structures/LazyArray.sol";

contract LazyArrayMock {
    using LazyArray for LazyArray.Self;
    /// @dev the array under test
    LazyArray.Self private _lazyArray;

    /// @notice An element was removed
    /// @param popped the removed element
    event PopByIndexReturn(uint256 popped);

    /// @notice Set the logical contents to a range of [1, N]
    /// @param initialLength how big to make the range
    function initialize(uint128 initialLength) external {
        _lazyArray.initialize(initialLength);
    }

    /// @notice Remove and return the element at an index
    /// @param index which element (zero indexed) to remove
    function popByIndex(uint256 index) external {
        emit PopByIndexReturn(_lazyArray.popByIndex(index));
    }

    /// @notice Return the element at an index
    /// @param index which element (zero indexed) to get
    /// @return element the specified element
    function getByIndex(uint256 index) external view returns (uint256 element) {
        return _lazyArray.getByIndex(index);
    }

    /// @notice How many items remain
    /// @return the number of remaining items
    function count() external view returns (uint256) {
        return _lazyArray.count();
    }
}