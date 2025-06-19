import { useReadContract } from "wagmi";
import { CONTRACT_ADDRESSES } from "../contracts";
import { ABIS } from "../abi/abis";
import { ARBITRUM_CHAIN_ID, CHAINS, SEPOLIA_CHAIN_ID } from "@/constants";
import { Address } from "viem";

export type MarketWithChainId = {
  market: Address;
  chainId: number;
};

export const useGetAllMarkets = (chainId: number) => {
  const getComptrollerAddress = (chainId: number): Address | undefined => {
    if (chainId === SEPOLIA_CHAIN_ID) {
      return CONTRACT_ADDRESSES.sepolia.comptroller as Address;
    } else if (chainId === ARBITRUM_CHAIN_ID) {
      return CONTRACT_ADDRESSES.arbitrum_sepolia.comptroller as Address;
    }
    return undefined;
  };

  const comptrollerAddress = getComptrollerAddress(chainId);

  const result = useReadContract({
    address: comptrollerAddress,
    abi: ABIS.ComptrollerABI,
    functionName: "getAllMarkets",
    chainId: chainId,
    query: {
      enabled: !!comptrollerAddress,
    },
  });

  return {
    ...result,
    chainId,
  };
};

// Support only 2 chains for now, because there are no more deployments.
// Easy to extend, or perhaps there should be useReadContracts function (multi)
export const useGetAllMarketsForSupportedNetworks = () => {
  const ethereumChainId = CHAINS[0].chainId;
  const arbitrumChainId = CHAINS[1].chainId;

  const ethereumResult = useReadContract({
    address: CONTRACT_ADDRESSES.sepolia.comptroller as `0x${string}`,
    abi: ABIS.ComptrollerABI,
    functionName: "getAllMarkets",
    chainId: ethereumChainId,
  });

  const arbitrumResult = useReadContract({
    address: CONTRACT_ADDRESSES.arbitrum_sepolia.comptroller as `0x${string}`,
    abi: ABIS.ComptrollerABI,
    functionName: "getAllMarkets",
    chainId: arbitrumChainId,
  });

  const markets: MarketWithChainId[] = [];

  if (ethereumResult.data) {
    (ethereumResult.data as Address[]).forEach((market) => {
      markets.push({
        market,
        chainId: ethereumChainId,
      });
    });
  }

  if (arbitrumResult.data) {
    (arbitrumResult.data as Address[]).forEach((market) => {
      markets.push({
        market,
        chainId: arbitrumChainId,
      });
    });
  }

  return markets;
};
