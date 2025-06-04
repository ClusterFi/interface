import { createConfig, http, injected, createStorage } from "wagmi";
import { mainnet, sepolia, arbitrum, base } from "wagmi/chains";
import { metaMask, safe, walletConnect } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, sepolia, arbitrum, base],
  autoConnect: true,
  storage: createStorage({
    storage: typeof window !== "undefined" ? window.localStorage : undefined,
  }),
  syncConnectedChain: true,
  connectors: [
    injected({
      shimDisconnect: true,
    }),
    walletConnect({
      projectId:
        "d02ec143-2517-4548-8861-c380e5f59f04=3055a418198a59dcf00890e65d1636ecc7f07f67365c314e03f5b0fe1760b9fd",
      showQrModal: true,
      isNewChainsStale: true,
    }),
    metaMask(),
    safe(),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
  },
} as any);
