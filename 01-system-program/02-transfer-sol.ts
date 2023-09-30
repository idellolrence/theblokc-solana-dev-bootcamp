import * as Web3 from '@solana/web3.js'
import base58 from 'bs58' //npm i --save bs58 is a package for converting string private key to int array
const connection = new Web3.Connection(Web3.clusterApiUrl('devnet')) // Shorthand method to get the devnet connection
const PRIVATE_KEY = '5i3SpYj2ZbU96s8a2SQLTymUAHffy2TzxN7w1vUF1hrxJLqVgabqVssHB5cpKJnZecAJP6bNYhKpsDaU1A8nDwYs'

async function main() {
    const privateKeyIntArray = base58.decode(PRIVATE_KEY);
    const signer = Web3.Keypair.fromSecretKey(privateKeyIntArray);

    //Transaction
    const transaction = new Web3.Transaction();

    //Instruction for transferring Sol
    const sendSolTransaction = Web3.SystemProgram.transfer( {
        fromPubkey: new Web3.PublicKey('6PjvhDLKk777of3h1HizBxqnnWYG4Rj9Rm7CgRNgW1Vq'),
        toPubkey: new Web3.PublicKey('qFUogCutdYtUXhHzEmBPxbSsLG1kEaph7tKtRN3y7gw'), 
        lamports: 0.1 * Web3.LAMPORTS_PER_SOL,
    });

    transaction.add(sendSolTransaction);
    const txHash = await Web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [signer]
    );

    console.log('txHash / txSignature', txHash);
}

main();