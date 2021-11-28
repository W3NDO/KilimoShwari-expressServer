function Web3(){
    const infura_link = "wss://ropsten.infura.io/ws/v3/bfd2419d8f3242d494de2fc399e01c34"
    const Web3 = require('web3');
    const web3 = new Web3(infura_link)
    
    return web3;
}

abi = [
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "client_id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "policy_id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "maize_variety",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "start_date",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "end_date",
						"type": "uint256"
					}
				],
				"internalType": "struct MaizeInsurance.Policy",
				"name": "_policy",
				"type": "tuple"
			}
		],
		"name": "add_policy",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "client",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get_policy",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "client_id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "policy_id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "maize_variety",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "start_date",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "end_date",
						"type": "uint256"
					}
				],
				"internalType": "struct MaizeInsurance.Policy[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "insurer",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
