const Web3 = require('web3');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const infuraApiKey = 'd1e99ba8522349089318d629edfb3f99';
const web3 = new Web3(`https://sepolia.infura.io/v3/${infuraApiKey}`, { timeout: 60000 });


const contractAddress = '0x0d7F31503853e87B0aF939847447d4192F306Ae5';

// Read ABI from JSON file
const abiFilePath = 'ABI.json';
const abiRawData = fs.readFileSync(abiFilePath);
const abi = JSON.parse(abiRawData);

const contract = new web3.eth.Contract(abi, contractAddress);

const userAddress = '0x9817fd31b76c47709C58CE2D82FceD2A053921B3';
const privateKey = '6099aa23e8f46c94f41a2f0042b52a6b22dc735575e2472a9057cf99dfddd770'; 

//Check balance of the user
try {
    const balance = await contract.methods.balanceOf(userAddress).call();
    console.log(`Balance of ${userAddress}: ${balance} tokens`);
} catch (error) {
    console.error('Error checking balance:', error);
}



// async function transferTokens(senderPrivateKey, toAddress, amount) {
//     try {
//       const accounts = await web3.eth.getAccounts();
//       const senderAddress = web3.eth.accounts.privateKeyToAccount(senderPrivateKey).address;
  
//       // Get the current gas price
//       const gasPrice = await web3.eth.getGasPrice();
  
//       // Estimate gas required for the transaction
//       const gasEstimate = await contract.methods.transfer(toAddress, amount).estimateGas({ from: senderAddress });
  
//       // Build the transaction object
//       const transactionObject = {
//         from: senderAddress,
//         to: contractAddress,
//         gas: gasEstimate,
//         gasPrice: gasPrice,
//         data: contract.methods.transfer(toAddress, amount).encodeABI(),
//       };
  
//       // Sign the transaction
//       const signedTransaction = await web3.eth.accounts.signTransaction(transactionObject, senderPrivateKey);
  
//       // Send the signed transaction
//       const result = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
  
//       console.log(`Tokens transferred successfully. Transaction hash: ${result.transactionHash}`);
//     } catch (error) {
//       console.error('Error transferring tokens:', error);
//     }
//   }
  
//   // Example usage
//   const toAddress = '0x2e90483f54951bAda772224e39DeF32b82D5d2CE'; // address of the wallet where to send
//   const amount = '1000'; // amount of tokens to transfer
  
//   transferTokens(privateKey, toAddress, amount);

  