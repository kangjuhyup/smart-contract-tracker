// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract EventTester {

    uint256 number;

    event SetNumber(address indexed from, uint256 number);

    function store(uint256 num) public {
        number = num;
        emit SetNumber(msg.sender, num);
    }

    function retrieve() public view returns (uint256){
        return number;
    }
}