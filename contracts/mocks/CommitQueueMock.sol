// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.14;
import "../Data structures/CommitQueue.sol";

contract CommitQueueMock {
    using CommitQueue for CommitQueue.Self;
    /// @dev the queue under test
    CommitQueue.Self private _commitQueue;

    /// @notice The first commitment was removed
    /// @param beneficiary an address associated with the commitment
    /// @param maturityBlock when this commitment matured
    event DequeueReturn(address beneficiary, uint64 maturityBlock);

    /// @notice Add a commitment to the queue
    /// @param beneficiary an address associated with the commitment
    /// @param quantity how many to enqueue
    function enqueue(address beneficiary, uint32 quantity) external {
        _commitQueue.enqueue(beneficiary, quantity);
    }

    /// @notice Remove the first commitment
    function dequeue() external {
        address beneficiary;
        uint64 maturityBlock;

        (beneficiary, maturityBlock) = _commitQueue.dequeue();
        emit DequeueReturn(beneficiary, maturityBlock);
    }

    /// @notice Whether the first commitment can be revealed
    /// @return true when the first commitment exists and is mature
    function isMature() external view returns (bool) {
        return _commitQueue.isMature();
    }

    /// @notice How many commitments remain
    /// @return how many items are in the queue
    function count() external view returns (uint256) {
        return _commitQueue.count();
    }
}