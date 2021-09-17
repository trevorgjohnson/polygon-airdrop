import Web3 from 'web3';
import {INFURA_ADDRESS, ADDRESS, ABI} from "./config.js";
import fs from 'fs';

/*--------------------SMART CONTRACT STUFF--------------------*/
const provider = new Web3.providers.HttpProvider(INFURA_ADDRESS)
const web3infura = new Web3(provider);
const lambContract = new web3infura.eth.Contract(ABI, ADDRESS)


console.log('fetching data...')
// Step 1 - Get the total population
const totalSupply = await lambContract.methods.totalSupply().call();

// Step 2 - Iterate over live tokens and log owners
let holder = {};
for(let i = 0; i < 10; i++){
  const ownerAddress = await lambContract.methods.ownerOf(i).call();
  const ownerTokens = await lambContract.methods.balanceOf(ownerAddress).call();
  
  if(!holder[ownerAddress]){ 
    //console.log(holder[ownerAddress]);
    holder[ownerAddress] = ownerTokens; 
    
  } else {
    holder[ownerAddress]++;
    console.log(holder[ownerAddress]);
  }

  /*if (holder[ownerAddress]){
    Array.push(ownerAddress){
      key: ownerTokens;
    }
  } else {
    
  }*/
}

// Step 3 - Saving the snapshot
fs.writeFile('holders.json', JSON.stringify(holder, null, 2),{ flag: 'w' },function (err) {
    if (err) return console.log(err);
    console.log("file has been saved"); 
})