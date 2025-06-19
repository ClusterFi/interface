import { useMemo } from "react";
import { useAllMarketsData } from "./useAllMarketsData";
import { ARBITRUM_CHAIN_ID, SEPOLIA_CHAIN_ID } from "@/constants";

export interface ProtocolStats {
  totalValueLocked: number;
  totalDeposits: number;
  totalBorrowed: number;
  totalCollateral: number;
  isLoading: boolean;
  error: Error | null;
}

export const useProtocolStats = () => {
  // Get data for all supported chains
  const sepoliaData = useAllMarketsData(SEPOLIA_CHAIN_ID);
  const arbitrumData = useAllMarketsData(ARBITRUM_CHAIN_ID);

  const stats = useMemo(() => {
    const isLoading = sepoliaData.isPending || arbitrumData.isPending;

    if (isLoading) {
      return {
        totalValueLocked: 0,
        totalDeposits: 0,
        totalBorrowed: 0,
        totalCollateral: 0,
        isLoading: true,
        error: null,
      };
    }

    // Combine data from all chains
    const allMarkets = [...sepoliaData.markets, ...arbitrumData.markets];

    // Calculate totals
    const totalDeposits = allMarkets.reduce(
      (sum, market) => sum + market.totalSupplyUSD,
      0,
    );
    const totalBorrowed = allMarkets.reduce(
      (sum, market) => sum + market.totalBorrowUSD,
      0,
    );
    const totalCollateral = allMarkets.reduce(
      (sum, market) => sum + market.totalCollateralUSD,
      0,
    );

    // Total Value Locked = Total Deposits
    const totalValueLocked = totalDeposits;

    return {
      totalValueLocked,
      totalDeposits,
      totalBorrowed,
      totalCollateral,
      isLoading: false,
      error: sepoliaData.error || arbitrumData.error,
    };
  }, [sepoliaData, arbitrumData]);

  return stats;
};
