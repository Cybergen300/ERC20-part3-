import React, { Component } from 'react'
import Web3 from 'web3'
import Navbar from './Navbar'
import Main from './Main'
import background_pic from './network.jpg'
import Token from '../abis/token.json'
import Buy from '../abis/buy.json' 


class App extends Component {

  //Allow us to run the Web3 and loadBlockchainData function each time we refresh the page
  //before performing any other action
  async componentWillMount()  {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  //import the right version of Web3 given our default browser
  async loadWeb3(){
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else{
      window.alert('Non-Ethereum browser detected.')
    }
  }

  //define our account and ethBalance state variable 
  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()

    //print the first Ganache account address in the console 
    console.log(accounts[0])

    //set the first Ganache account as our account state variable 
    this.setState({ account: accounts[0]})

    //set our first Ganache account ETH balance as our ethBalance state variable
    const ethBalance = await web3.eth.getBalance(this.state.account)
    this.setState({ethBalance: ethBalance})
    console.log(this.state.ethBalance)
  

    //load token contract 

    const networkId = await web3.eth.net.getId()
    const tokenData = Token.networks[networkId]
    if(tokenData) {
      //create a new instance of  our  Token contract
      const token = new web3.eth.Contract(Token.abi, tokenData.address)
      this.setState({token})
      let tokenBalance  = await token.methods.balanceOf(this.state.account).call()
      //set our tokenBalance state variable equals to our account token balance
      this.setState({tokenBalance: tokenBalance.toString()})
      console.log("tokenBalance : ",  tokenBalance.toString())
      //checking the name of the contract 
      let testName = await token.methods.name().call()
      console.log(testName)
    } else {
      window.alert('EthSwap contract not deployed to detected network.')
    }

    //load buy contract
    const buyData = Buy.networks[networkId]
    if (buyData) {
      //create a new instance of  our  buy contract
      const buy = new web3.eth.Contract(Buy.abi, buyData.address) 
      this.setState({buy})
      let buyName = await buy.methods.name().call()
      console.log(buyName)
      console.log("buy contract address :", buy.address)
      const priceToken = await buy.methods.rateToken.call()
      
      //set our priceToken state variable equals to our account token balance
      this.setState({priceToken : priceToken.toString()})
      console.log("price of Token : ", this.state.priceToken)

      //Check the token balance of our buy contract
      const buyTokenBalance = await this.state.token.methods.balanceOf(this.state.buy.address).call()
      console.log("buy contract token balance", buyTokenBalance.toString())
    }

  }

  //Create our buy token function based on our buy contract
  buyToken = (etherAmount) => {
      this.state.buy.methods.buysETH().send({value: etherAmount, from: this.state.account}).on('transactionHash', (hash) => {

      })
    }

	constructor(props) {
		super(props)
		this.state = {
			account: '',
      token:  {},
      tokenBalance : '0',
      ethBalance : '0',
      priceETH: '0'
		}
	}

  	render() {
  		let content
  		content = <Main
        ethBalance = {this.state.ethBalance}
        tokenBalance = {this.state.tokenBalance}
        buyToken= {this.buyToken}
        priceETH = {this.state.priceETH}
      />

      return(
      	<div style = {{padding: "70px" , backgroundImage: `url(${background_pic})`}}> 
        	<Navbar account= {this.state.account} />
        		<div className = "container-fluid mt-5">
         			<div className = "row">
            		<main role="main" className = "col-lg-12 d-flex text-center" style = {{maxwidth: '600px'}}>
            			<div className = "content mr-auto ml-auto" style = {{padding: "120px"}}>
            				{content}
            			</div>
            		</main>
          		</div>
        	</div>
      	</div>
      	
      	);
  }
}

export default App;




