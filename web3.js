function Web3(){
    const infura_link = "wss://ropsten.infura.io/ws/v3/bfd2419d8f3242d494de2fc399e01c34"
    const Web3 = require('web3');
    const web3 = new Web3(infura_link)
    
    return web3;
}