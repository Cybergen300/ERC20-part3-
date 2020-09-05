//Import React 
import React, { Component } from 'react'


//Call our Main  class as React component 
class Main extends Component{
	
	//State variable declaration
	constructor(props){
		super(props)
		this.state = {
			output: '0'
		}
	}

	render() {
		return(
		<div className = "card mb-10 ml-5">
            <div className = "card-body " style = {{width: '30rem'}}>
			
			{/*We connect our buy button  to our back end and use our state 
			variable as the amount for our buy function*/}
			<form className = "mb-3" onSubmit= {(event) => {
				event.preventDefault()
				let etherAmount
				etherAmount = this.input.value.toString()
				etherAmount = window.web3.utils.toWei(etherAmount, 'Ether')
				this.props.buyToken(etherAmount)
				console.log("purchasing tokens...")
				}}>

		{/*Creation of our first box for the Input amount (eth to spend) */}
			<div>
			<label className= " float-left"> <b> Input</b></label>
				<span className = "float-right text-muted">
					Balance: {window.web3.utils.fromWei(this.props.ethBalance, 'Ether')}
				</span>
			</div>
			<div className = "input-group mb-4">
					{/* Set our etherAmount state variable based on the input 
					value by the user*/}
				<input
					type= "text"
					onChange = {(event) => {
						console.log("changing..")
						const etherAmount = this.input.value.toString()
						this.setState({output: etherAmount})
					}}
					ref = {(input) => {this.input = input}}
					className = "form-control form-control-lg"
					placeholder = "0"
					required/>
			</div>

		{/*Creation of our second box for the Output amount (tokens to receive) */}
			<div>
				<label className = "float-left"><b>Output</b></label>
				<span className="float-right text-muted">
					Balance: {window.web3.utils.fromWei(this.props.tokenBalance, 'Ether')}
				</span>
			</div>
			<div className = "input-group mb-2">
				<input
					type= "text"
					className = "form-control from-control-lg"
					placeholder= "0"
					value = {this.state.output}
					disabled
				/>
			</div>

		{/*Creation of our third box for the exchange rate informations */}
			<div className="mb-5">
				<span className = "float-left text-muted">Exchange  Rate </span>
				<span className= "float-right text-muted"> 1 ETH = 1 sETH</span>
			</div>
		{/*Creation of a button allowing the user to effectively buy our token */}
			<button type = "submit" className= "btn btn-primary btn-block btn-lg"> BUY !</button>
			</form>
			</div>
		</div>
			);
	}

}

export default Main;





