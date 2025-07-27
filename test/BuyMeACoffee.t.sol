// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "forge-std/Test.sol";
import "../src/BuyMeACoffee.sol";

contract BuyMeACoffeeTest is Test {
    BuyMeACoffee coffee;
    address owner;
    address user1;
    address user2;

    function setUp() public {
        owner = address(this); // msg.sender
        user1 = vm.addr(1);
        user2 = vm.addr(2);

        vm.deal(user1, 1 ether);
        vm.deal(user2, 1 ether);

        coffee = new BuyMeACoffee();
    }

    function testInitialOwner() public view {
        assertEq(coffee.getOwner(), owner);
    }

    function testBuyCoffeeStoresMemo() public {
        vm.prank(user1);
        coffee.buyCoffee{value: 0.01 ether}("Bob", "Thanks for the content!");

        BuyMeACoffee.Memo[] memory memos = coffee.getMemos();
        assertEq(memos.length, 1);
        assertEq(memos[0].from, user1);
        assertEq(memos[0].name, "Bob");
        assertEq(memos[0].message, "Thanks for the content!");
    }

    function testBuyCoffeeEmitsEvent() public {
        uint256 fixedTimestamp = 1_700_000_000; // any fixed timestamp
        vm.warp(fixedTimestamp);

        vm.expectEmit(true, false, false, true);
        emit BuyMeACoffee.NewMemo(user1, block.timestamp, "Bob", "Thanks for the content!");

        vm.prank(user1);
        coffee.buyCoffee{value: 0.01 ether}("Bob", "Thanks for the content!");
    }

    function testCannotBuyCoffeeWithZeroValue() public {
        vm.prank(user1);
        vm.expectRevert("Can't buy coffee with 0 KAIA");
        coffee.buyCoffee("Test", "No ETH sent");
    }

    function testWithdrawTipsOnlyOwner() public {
        // Buy a coffee
        vm.prank(user1);
        coffee.buyCoffee{value: 0.01 ether}("Anonymous", "Enjoy!");

        // Try from non-owner
        vm.prank(user2);
        vm.expectRevert("Only the owner can withdraw");
        coffee.withdrawTips();

        uint256 initialBalance = owner.balance; // Check owner's balance
        coffee.withdrawTips();

        uint256 afterBalance = owner.balance;
        assertGt(afterBalance, initialBalance);
    }

    function testCannotWithdrawWithZeroBalance() public {
        vm.expectRevert("No tips to withdraw");
        coffee.withdrawTips();
    }

    function testMemosCountIncreases() public {
        vm.prank(user1);
        coffee.buyCoffee{value: 0.01 ether}("A", "msg 1");

        vm.prank(user2);
        coffee.buyCoffee{value: 0.01 ether}("B", "msg 2");

        assertEq(coffee.getMemosCount(), 2);
    }

    receive() external payable {} // Allow receiving ETH
}
