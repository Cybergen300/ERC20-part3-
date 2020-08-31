pragma solidity ^0.6.7; 

import "./token.sol"; 

contract buy{ 

	//name of the contract
	string public name = "Buy token contract"; 

	//create a token variable
	token public syntETH;

	//Define the rate for the ETH/token pair
	uint public rateToken = 1;

	//Create event summarizing each purchase
	event  sETHPurchased(
		address account, 
		address token,
		uint amount, 
		uint rate
		);

	//Initialize syntETH as a state variable for our buy contract
	constructor (token _syntETH) public {
		syntETH = _syntETH;
	}

	//Create our buy function
	function buysETH() public payable {
		//Calculate the number of token to buy
		uint sETHAmount = msg.value * 1;
		//require that the swap contract has enough tokens 
		require(syntETH.balanceOf(address(this)) >= sETHAmount);
		//transfer tokens to user
		syntETH.transfer(msg.sender, sETHAmount);
		//emit the SUSDPurchased event 
		emit sETHPurchased(msg.sender, address(syntETH), sETHAmount, rateToken);
	}
}

