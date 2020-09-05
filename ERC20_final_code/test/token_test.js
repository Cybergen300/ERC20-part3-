// smart contract testing 

//We call our token contract
const Token = artifacts.require('./token.sol')
const Buy = artifacts.require('./buy.sol')

//load the chai library enabling us to use its TDD assert style
require('chai')
	.use(require('chai-as-promised'))
	.should()

//function using web3 to  convert the value into a normal value without the 18 decimals
function decimals(n) {
	return web3.utils.toWei(n,'ether')
}

//Basic contract testing
//We deploy our token contract
contract('token contract testing', ([deployer, investor]) => {
	//varibale declaration
	let token, buy

	before(async() => {

		//Create a new instance of our token contract
		token = await Token.new()

		//Create a new instance of our buy contract
		buy = await Buy.new(token.address)

		//transfer all the tokens to the buy contract 
		await token.transfer(buy.address, decimals('1000000'))

	})

	describe('token contract', async() => {
		it('token contract specs verification', async() => {
			//name verification
			const tokenName = await token.name()
			assert.equal(tokenName, "ERC20 token")
			//symbol verification
			const tokenSymbol = await token.symbol()
			assert.equal(tokenSymbol, "ERC20")
			//total supply verification
			const tokenSupply = await token.totalSupply()
			//console.log(tokenSupply)
		})
	})

	describe ('buy contract', async() => {
		it('buy contract specs verification', async() => {
			//name verification
			const buyName = await buy.name()
			assert.equal(buyName, "Buy token contract")

			//verify that the tokens migration has indeed happened
			const buyBalance = await token.totalSupply()
			assert.equal(buyBalance, 1000000000000000000000000)
		})
	})

	describe('test of the buy function for our token', async() => {
		before(async() => {
			//Perform the dummy buy of 10 tokens
			result = await buy.buysETH({from: investor, value: decimals('10')})
		})

		it('Allows user to buy tokens from the buy contract for a fixed price', async() => {
			//Check investor token balance after purchase to see if it's indeed equal to 10 
			let investorBalance = await token.balanceOf(investor)
			assert.equal(investorBalance, decimals('10'))
		})
	})
})





