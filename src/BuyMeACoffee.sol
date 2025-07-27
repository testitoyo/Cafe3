// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract BuyMeACoffee {
    /// @notice Emitted when a coffee is bought
    event NewMemo(address indexed from, uint256 timestamp, string name, string message);

    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    Memo[] public memos;

    /// @notice Address of contract deployer (recipient of tips)
    address payable public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    /**
     * @notice Buy a coffee for the owner
     * @param _name Name of the sender
     * @param _message A personal message from the sender
     */
    function buyCoffee(string memory _name, string memory _message) public payable {
        require(msg.value > 0, "Can't buy coffee with 0 KAIA");

        memos.push(Memo(msg.sender, block.timestamp, _name, _message));

        emit NewMemo(msg.sender, block.timestamp, _name, _message);
    }

    /// @notice Withdraw all tips to the owner's address
    function withdrawTips() public {
        require(msg.sender == owner, "Only the owner can withdraw");
        uint256 balance = address(this).balance;
        require(balance > 0, "No tips to withdraw");

        (bool success,) = owner.call{value: balance}("");
        require(success, "Transfer failed");
    }

    /// @notice Returns all memos
    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }

    /// @notice Returns the owner's address
    function getOwner() public view returns (address) {
        return owner;
    }

    /// @notice Returns number of memos received
    function getMemosCount() public view returns (uint256) {
        return memos.length;
    }
}
