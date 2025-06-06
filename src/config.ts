import { http, createConfig, createStorage } from "wagmi";
import { base, mainnet, sepolia, optimism } from "wagmi/chains";
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";

const projectId =
  "982908a13b1908bdccd6d08d45ee2738";
  // "d02ec143-2517-4548-8861-c380e5f59f04=3055a418198a59dcf00890e65d1636ecc7f07f67365c314e03f5b0fe1760b9fd";

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
