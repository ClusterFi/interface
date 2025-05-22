import { ChainProps, Network } from './types';

export const SOLANA_RPC = `https://mainnet.helius-rpc.com/?api-key=3698325c-bdb4-4436-a094-366bd1e18cc7`;

export const MAIN_CHAIN_ID = 1;
export const SEPOLIA_CHAIN_ID = 11155111;
export const SOLANA_CHAIN_ID = 99999;
export const Arbitrum_CHAIN_ID = 42161;

export const getChainById = (chainId: number): ChainProps | undefined => {
  return CHAINS.find((chain) => chain.chainId === chainId);
};

export const CHAINS: ChainProps[] = [
  {
    name: 'Ethereum',
    currency: 'Ethereum',
    network: Network.Ethereum,
    chainId: SEPOLIA_CHAIN_ID,
    eid: 30101,
  },
  {
    name: 'Arbitrum',
    currency: 'Arbitrum',
    network: Network.Arbitrum,
    chainId: Arbitrum_CHAIN_ID,
    eid: 30110,
  },
  {
    name: 'Base',
    currency: 'Base',
    network: Network.Base,
    chainId: 84531,
    eid: 30184,
  },
  {
    name: 'Linea',
    currency: 'Linea',
    network: Network.Linea,
    chainId: 59140,
    eid: 30183,
  },
];
