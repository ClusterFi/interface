import { ChainProps, Network } from "./types";

export const SOLANA_RPC = `https://mainnet.helius-rpc.com/?api-key=3698325c-bdb4-4436-a094-366bd1e18cc7`;

export const MAIN_CHAIN_ID = 1;
export const SOLANA_CHAIN_ID = 99999;

export const CHAINS: ChainProps[] = [
  {
    name: "Ethereum",
    currency: "Ethereum",
    network: Network.Ethereum,
    chainId: MAIN_CHAIN_ID,
  },
  {
    name: "Solana",
    currency: "Solana",
    network: Network.Solana,
    chainId: SOLANA_CHAIN_ID,
  },
];
