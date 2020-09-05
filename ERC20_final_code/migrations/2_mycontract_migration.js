const Token = artifacts.require("token.sol")
const Buy = artifacts.require("buy.sol")

module.exports = (deployer, network) => {
  // Local (development) 
  // token contract deployment 
  if (!network.startsWith('live')) {

	deployer.deploy(Token).then( token => {
    return  deployer.deploy(Buy, token.address).then(buy => {
      //we transfer all the tokens to the buy contract
      token.transfer(Buy.address, '1000000000000000000000000')
      })
    }) 
  } else {
    // Live development 
    // token contract deployment 
	deployer.deploy(Token).then(token => {
    return deployer.deploy(Buy, token.address).then(swap => {
      //we transfer all the tokens to the buy contract
      token.transfer(buy.address, '1000000000000000000000000')
      })
    })
  }
}
