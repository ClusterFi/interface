import { ReactNode, useMemo } from "react";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, createConfig, WagmiProvider } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { injected, metaMask, coinbaseWallet, walletConnect } from 'wagmi/connectors'

const projectId = "";

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    metaMask(),
    coinbaseWallet(),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})

const queryClient = new QueryClient();

export const EvmWalletProvider = ({ children }: { children: ReactNode }) => {

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
};
