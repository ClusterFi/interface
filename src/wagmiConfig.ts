import { createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import { injected } from "wagmi";

export const wagmiConfig = createConfig({
  connectors: [
    injected({
      shimDisconnect: true,
    }),
  ],
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});
