import * as Web3 from '@solana/web3.js'

async function main() {
    const publicKey = '6PjvhDLKk777of3h1HizBxqnnWYG4Rj9Rm7CgRNgW1Vq'

    /* Get the devnet wallet connection */
    const URL = Web3.clusterApiUrl('devnet');
    const connection = new Web3.Connection(URL);

    // Get Balance
    const balance = await connection.getBalance(new Web3.PublicKey(publicKey));
    const solBalance = balance / Web3.LAMPORTS_PER_SOL

    // Print Balance
    console.log('balance', solBalance);
}

main();