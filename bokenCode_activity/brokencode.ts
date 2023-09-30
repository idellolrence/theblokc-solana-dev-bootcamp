import "dotenv/config"
import base58 from "bs58"
import * as Web3 from '@solana/web3.js'

//Establish connection
const url = Web3.clusterApiUrl("devnet");
const connection = new Web3.Connection(url);
const PublicKey = "6PjvhDLKk777of3h1HizBxqnnWYG4Rj9Rm7CgRNgW1Vq";
const PrivateKey = "5i3SpYj2ZbU96s8a2SQLTymUAHffy2TzxN7w1vUF1hrxJLqVgabqVssHB5cpKJnZecAJP6bNYhKpsDaU1A8nDwYs"
const ProgramId = "9bhtQwV6qUfbcjKNUM7QreePN34N8zLPsqb3hogXK729"

async function main() {
    const privateKeyIntArray = base58.decode(PrivateKey);
    const signer = Web3.Keypair.fromSecretKey(privateKeyIntArray);
    const instruction = new Web3.TransactionInstruction({
        keys: [
            {
                pubkey: new Web3.PublicKey(PublicKey),
                isSigner: true,
                isWritable: false,
            }
        ],
        data: Buffer.alloc(20),
        programId: new Web3.PublicKey(ProgramId)
    });

    //Transaction
    const transaction = new Web3.Transaction();
    const signature = await Web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [signer]
    )

    console.log('SIGNATURE', signature)
}

main()
.then(() => process.exit(0))
.catch(err => {
    console.error(err)
});