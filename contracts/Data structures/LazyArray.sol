// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.14; // code below expects that integer overflows will revert

/// @title  A data structure that supports random read and delete access and that efficiently initializes to a range of
///         [1, N]
/// @author William Entriken, for Area NFT
library LazyArray {
    struct Self {
        // This stores element values and cannot represent an underlying value of zero.
        //
        // A zero value at index i represents an element of (i+1). Any other value stored in the array represents an
        // element of that value. We employ this technique because all storage in Solidity starts at zero.
        //
        // e.g. the array [0, 135, 243, 0, 500] represents the values [1, 135, 243, 5, 500]. Then if we remove the 135
        // that becomes [0, 500, 243, 0] which represents the values [1, 500, 243, 5].
        mapping(uint256 => uint256) elements;

        // Adding to this value logically appends a sequence to the array ending in `length`. E.g. changing from 0 to 2
        // makes [1, 2].
        uint256 length;
    }

    /// @notice Access was attempted for a non-existent index
    /// @param  index The index that was attempted to be accessed
    error OutOfBounds(uint256 index);

    /// @notice Attempted to initialize non-empty instance
    error AlreadyInitialized();

    /// @notice Sets the logical contents to a range of [1, N]
    /// @param  self          the data structure
    /// @param  initialLength how big to make the range, limited to 2^128 to prevent a SLOAD security issue
    function initialize(Self storage self, uint128 initialLength) internal {
        if (self.length != 0) {
            revert AlreadyInitialized();
        }
        self.length = initialLength;
    }

    /// @notice Removes and returns the n-th logical element
    /// @param  self   the data structure
    /// @param  index  which element (zero indexed) to remove and return
    /// @return popped the specified element
    function popByIndex(Self storage self, uint256 index) internal returns (uint256 popped) {
        popped = getByIndex(self, index);
        uint256 lastIndex = self.length - 1; // will not underflow b/c prior get
        if (index < lastIndex) {
            uint256 lastElement = getByIndex(self, lastIndex);
            self.elements[index] = lastElement;
        }
        delete self.elements[lastIndex];
        self.length -= 1;
    }

    /// @notice Returns the n-th logical element
    /// @param  self    the data structure
    /// @param  index   which element (zero indexed) to get
    /// @return element the specified element
    function getByIndex(Self storage self, uint256 index) internal view returns (uint256 element) {
        if (index >= self.length) {
            revert OutOfBounds(index);
        }
        return self.elements[index] == 0
            ? index + 1 // revert on overflow
            : self.elements[index];
    }

    /// @notice Finds how many items remain
    /// @param  self   the data structure
    /// @return the number of remaining items
    function count(Self storage self) internal view returns (uint256) {
        return self.length;
    }
}