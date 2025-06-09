import { http, createConfig, createStorage } from "wagmi";
import { base, mainnet, sepolia, optimism } from "wagmi/chains";
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";

const projectId =
  "982908a13b1908bdccd6d08d45ee2738";

export const config = createConfig({
  storage: typeof window !== "undefined" ? createStorage({  
    storage: window.localStorage,
    key: "wagmi-store",
  }) : undefined,
  chains: [mainnet, sepolia, base, optimism],
  connectors: [
    injected(),
    walletConnect({
      projectId,
    }),
    metaMask(),
    safe(),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [base.id]: http(),
    [optimism.id]: http(),
  },
});
