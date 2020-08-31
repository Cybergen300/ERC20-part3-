const HDWalletProvider = require('@truffle/hdwallet-provider')
mnemonic = "INPUT  YOUR MNEMONIC HERE"
module.exports = {

  networks: {
    development: {
      host: "127.0.0.1", 
      port: "7545", 
      network_id: "*",// match any network id 

    },

    //development on the Ropsten  network
    live: {
      provider: () => {
        return new HDWalletProvider(mnemonic, "INPUT YOUR INFURA LINK HERE")
      },
      host: "127.0.0.1",
      port: 7545,
      network_id: '3',
      gasPrice: 29000000000,
    // Necessary due to https://github.com/trufflesuite/truffle/issues/1971
    // Should be fixed in Truffle 5.0.17
      skipDryRun: true,
      networkCheckTimeOut: "100000"
    },
  },
  compilers: {
    solc: {
      version: '0.6.7',
    },
  },
}
