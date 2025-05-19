import { ReactNode, useMemo } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, createConfig, WagmiProvider } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import {
  walletConnectWallet,
  metaMaskWallet,
  ledgerWallet,
  rainbowWallet,
  coinbaseWallet,
  trustWallet,
  gateWallet,
} from '@rainbow-me/rainbowkit/wallets';

import {
  connectorsForWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';

const WALLET_CONNECT_PROJECT_ID = 'ed0885ee6fb5016929f14e4a8aeda0a2';

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [coinbaseWallet],
    },
    {
      groupName: 'Popular',
      wallets: [
        rainbowWallet,
        metaMaskWallet,
        trustWallet,
        gateWallet,
        ledgerWallet,
      ],
    },
    {
      groupName: 'Wallet Connect',
      wallets: [walletConnectWallet],
    },
  ],
  {
    appName: 'ClusterFi',
    projectId: WALLET_CONNECT_PROJECT_ID,
  }
);

export const config = createConfig({
  chains: [mainnet],
  connectors,
  transports: {
    [mainnet.id]: http(),
  },
});

export const sepoliaConfig = createConfig({
  chains: [sepolia],
  connectors,
  transports: {
    [sepolia.id]: http('https://ethereum-sepolia-rpc.publicnode.com'),
  },
});

const queryClient = new QueryClient();

export const EvmWalletProvider = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={sepoliaConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
