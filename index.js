const Blockchain = require('./src/blockchain');
const Transaction = require('./src/transaction');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// Your private key goes here
const myKey = ec.keyFromPrivate('456cd7c9744052967a70d0b3aedd9d06731239df54334c33911f50fd6c78e4e5');

// From that we can calculate your public key (which doubles as your wallet address)
const myWalletAddress = myKey.getPublic('hex');

// Create new instance of Blockchain class
const arjunaCoin = new Blockchain();

// Mine first block
arjunaCoin.minePendingTransactions(myWalletAddress);

// Create a transaction & sign it with your key
const tx1 = new Transaction(myWalletAddress, 'address2', 100);
tx1.signTransaction(myKey);
arjunaCoin.addTransaction(tx1);

// Mine block
arjunaCoin.minePendingTransactions(myWalletAddress);

// Create second transaction
const tx2 = new Transaction(myWalletAddress, 'address1', 50);
tx2.signTransaction(myKey);
arjunaCoin.addTransaction(tx2);

// Mine block
arjunaCoin.minePendingTransactions(myWalletAddress);

console.log();
console.log(`Balance of Arjun is ${arjunaCoin.getBalanceOfAddress(myWalletAddress)}`);

// Uncomment this line if you want to test tampering with the chain
// arjunaCoin.chain[1].transactions[0].amount = 10;

// Check if the chain is valid
console.log();
console.log('Blockchain valid?', arjunaCoin.isChainValid() ? 'Yes' : 'No');