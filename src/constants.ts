import { ChainProps, Network } from "./types";

export const SOLANA_RPC = `https://mainnet.helius-rpc.com/?api-key=54fa8b90-68f2-4374-b80d-3400475c1659`;

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