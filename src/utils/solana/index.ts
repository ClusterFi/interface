import { SOLANA_RPC } from "@/constants";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export const fetchSolBalance = async (pubkey: PublicKey) => {
  try {
    const connection = new Connection(SOLANA_RPC);
    const balance = await connection.getBalance(pubkey, "confirmed");
    return balance / LAMPORTS_PER_SOL;
  } catch (ex) {
    console.log(ex);
    return 0;
  }
};
