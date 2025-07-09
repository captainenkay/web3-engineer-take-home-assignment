// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Counter {
    /// @notice The current value of the counter.
    uint256 public count;

    /// @notice Emitted when the count is changed.
    /// @param newCount The new value of the count after the change.
    event CountChanged(uint256 newCount);

    /**
     * @notice Increments the counter by 1.
     * @dev Emits the {CountChanged} event.
     */
    function increment() public {
        count += 1;
        emit CountChanged(count);
    }

    /**
     * @notice Decrements the counter by 1.
     * @dev Reverts if the count is already 0.
     * @dev Emits the {CountChanged} event.
     */
    function decrement() public {
        require(count > 0, "Count cannot be negative");
        count -= 1;
        emit CountChanged(count);
    }
}
