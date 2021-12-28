const express = require('express');
const app = express();
const port = 3000;

const infura_socket = "wss://ropsten.infura.io/ws/v3/bfd2419d8f3242d494de2fc399e01c34";
const infura_link = "https://ropsten.infura.io/ws/v3/bfd2419d8f3242d494de2fc399e01c34";
const metamask_link = "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"; 
// const remix_contract_addr = "0xD43765DfF7aCa11e7c71978292C5fb8270734145"; 
const remix_contract_addr ="0xB3f4AF7539d3B42ed9cbda6d3DEcA4dD8C019F20"; 
const ropsten_test_acc_addr = "0x9E09e2F1efA701451963C63b9606dd0340e16368";
const remix_acc_addr = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";
const metamask_addr = "0xB48094CfC4F471918AFC54D5D1ADD9fd2Be2eA49";

function Web3(){
    const Web3 = require('web3');
    var web3 = new Web3(new Web3.providers.HttpProvider(metamask_link))

    return web3;
}

const web3 = Web3()
const privateKey = '145d2ec3ce9b5b3a9b808a2d3bc064ed40319f86fa3f3afda61ea8f34b631b68';
const account = web3.eth.accounts.privateKeyToAccount('0x' + privateKey)
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

const MaizeContract = require('./MaizeInsurance.json')
let contractSpec = new web3.eth.Contract(MaizeContract.abi, remix_contract_addr);

app.use(express.json());
app.get('/', (req, res) => {
    contractSpec.methods.get_policy().call().then(response => {
        console.log("Getting all policies")
        res.send({policies: {response}})
    })
})

app.get(`/policy/:id`, function(req, res){
    requested_policy = []
    contracts = contractSpec.methods.get_policy().call().then(response => {
        for (var i=0; i<response.length; i++) {
            if (response[i].policy_id == req.params.id){
                requested_policy = response[i]
            }
        }
        console.log("Requested policy: ", requested_policy)
        res.send({policy: requested_policy}) //format it later
    })    
})


app.post('/buyPolicy', function(req, res) {
    console.log("attempting to buy a new policy::", req.body)
    contractSpec.methods.add_policy(req.body.content)
        .send(
        {
            from: web3.eth.defaultAccount,
            gasPrice: "40000000000",
            gas: 1000000
        }
    ).then( receipt => {
        console.log("Add_policy Result :: ", receipt);
        res.send(receipt)
        contractSpec.methods.get_policy().call().then(res => {
            console.log("Res:: ", receipt)
        })
    })
})

//Validation body format
// Policy ID
// weekly_rain_avgs: [12], 
// monthly_rain_avgs: [3],
// weekly_temp_avgs: [12], 
// monthly_temp_avgs: [3]

app.post('/validate', function(req, res){
    policy_id = req.body.policy_id;
    console.log("Validating policy with policy ID :: ", policy_id)
    validation_data = 
    validation = contractSpec.methods.validate(
        [req.body.weekly_rain_avgs, 
         req.body.monthly_rain_avgs,
         req.body.weekly_temp_avgs,
         req.body.monthly_temp_avgs
        ]).send(
            {
                from: web3.eth.defaultAccount,
                gasPrice: "40000000000",
                gas: 1000000
            }
        ).then(response => {
            console.log("Valid Claim? ", req.body.policy_id, " :: ", response )
            res.send({policy_id: response})
    })
})

app.listen(3000, () => {
    console.log(`KS listening at localhost:${port}`)
})
