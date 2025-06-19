import { useReadContract, useAccount, useReadContracts } from "wagmi";
import { useMemo } from "react";
import { CONTRACT_ADDRESSES } from "../contracts";
import { ABIS } from "../abi/abis";
import { useUserData } from "./useUserData";
import { useGetAllMarkets } from "./useGetAllMarkets";
import { formatUnits } from "viem";
import type { Abi } from "viem";
import { SEPOLIA_CHAIN_ID } from "@/constants";

type Address = `0x${string}`;

export interface DetailedAccountSummary {
  totalSupplyBalanceUSD: number;
  totalCollateralValueUSD: number;
  totalBorrowBalanceUSD: number;
  netAPY: number;
  accountLiquidity: number;
  accountShortfall: number;
  isLoading: boolean;
  error: Error | null;
}

export const useAccountSummaryDetailed = (
  chainId: number = SEPOLIA_CHAIN_ID,
): DetailedAccountSummary => {
  const { address: userAddress } = useAccount();
  const {
    supplies,
    borrows,
    isPending: isUserDataPending,
  } = useUserData(chainId, userAddress);
  const { data: allMarkets } = useGetAllMarkets(chainId);

  // Get account liquidity from Comptroller
  const {
    data: accountLiquidityData,
    isPending: isLiquidityPending,
    error: liquidityError,
  } = useReadContract({
    address: CONTRACT_ADDRESSES.sepolia.comptroller as Address,
    abi: ABIS.ComptrollerABI as Abi,
    functionName: "getAccountLiquidity",
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: !!userAddress,
    },
  });

  // Get market data for all markets to calculate USD values and APY
  const marketContracts = useMemo(() => {
    if (!allMarkets || !Array.isArray(allMarkets)) return [];

    return (allMarkets as Address[]).flatMap((market) => [
      {
        address: market,
        abi: ABIS.CTokenABI as Abi,
        functionName: "supplyRatePerBlock" as const,
      },
      {
        address: market,
        abi: ABIS.CTokenABI as Abi,
        functionName: "borrowRatePerBlock" as const,
      },
      {
        address: market,
        abi: ABIS.CTokenABI as Abi,
        functionName: "exchangeRateStored" as const,
      },
      {
        address: market,
        abi: ABIS.CTokenABI as Abi,
        functionName: "underlying" as const,
      },
    ]);
  }, [allMarkets]);

  const { data: marketData, isPending: isMarketDataPending } = useReadContracts(
    {
      contracts: marketContracts,
      query: {
        enabled: marketContracts.length > 0,
      },
    },
  );

  const summary = useMemo(() => {
    if (
      !supplies ||
      !borrows ||
      !allMarkets ||
      isUserDataPending ||
      isMarketDataPending
    ) {
      return {
        totalSupplyBalanceUSD: 0,
        totalCollateralValueUSD: 0,
        totalBorrowBalanceUSD: 0,
        netAPY: 0,
        accountLiquidity: 0,
        accountShortfall: 0,
        isLoading: true,
        error: null,
      };
    }

    let totalSupplyBalanceUSD = 0;
    let totalBorrowBalanceUSD = 0;
    let totalSupplyAPYWeighted = 0;
    let totalBorrowAPYWeighted = 0;
    let totalSupplyWeight = 0;
    let totalBorrowWeight = 0;

    supplies.forEach((supply, index) => {
      if (supply.balance > BigInt(0) && marketData) {
        const marketIndex = (allMarkets as Address[]).findIndex(
          (m) => m === supply.cToken,
        );
        if (marketIndex >= 0) {
          const supplyRateData = marketData[marketIndex * 4];
          const exchangeRateData = marketData[marketIndex * 4 + 2];

          if (
            supplyRateData?.status === "success" &&
            exchangeRateData?.status === "success"
          ) {
            const supplyRate = Number(supplyRateData.result as bigint) / 1e18;
            const exchangeRate =
              Number(exchangeRateData.result as bigint) / 1e18;

            const underlyingBalance =
              Number(formatUnits(supply.balance, 8)) * exchangeRate;

            const balanceUSD = underlyingBalance;
            totalSupplyBalanceUSD += balanceUSD;

            const supplyAPY = (Math.pow(supplyRate * 2102400 + 1, 1) - 1) * 100;
            totalSupplyAPYWeighted += supplyAPY * balanceUSD;
            totalSupplyWeight += balanceUSD;
          }
        }
      }
    });

    borrows.forEach((borrow, index) => {
      if (borrow.currentBalance > BigInt(0) && marketData) {
        const marketIndex = (allMarkets as Address[]).findIndex(
          (m) => m === borrow.cToken,
        );
        if (marketIndex >= 0) {
          const borrowRateData = marketData[marketIndex * 4 + 1];

          if (borrowRateData?.status === "success") {
            const borrowRate = Number(borrowRateData.result as bigint) / 1e18;

            const balanceUSD = Number(formatUnits(borrow.currentBalance, 18));
            totalBorrowBalanceUSD += balanceUSD;

            const borrowAPY = (Math.pow(borrowRate * 2102400 + 1, 1) - 1) * 100;
            totalBorrowAPYWeighted += borrowAPY * balanceUSD;
            totalBorrowWeight += balanceUSD;
          }
        }
      }
    });

    const avgSupplyAPY =
      totalSupplyWeight > 0 ? totalSupplyAPYWeighted / totalSupplyWeight : 0;
    const avgBorrowAPY =
      totalBorrowWeight > 0 ? totalBorrowAPYWeighted / totalBorrowWeight : 0;
    const netAPY = avgSupplyAPY - avgBorrowAPY;

    const accountLiquidity = accountLiquidityData
      ? Number(
          formatUnits(
            (accountLiquidityData as [bigint, bigint, bigint])[1],
            18,
          ),
        )
      : 0;

    const accountShortfall = accountLiquidityData
      ? Number(
          formatUnits(
            (accountLiquidityData as [bigint, bigint, bigint])[2],
            18,
          ),
        )
      : 0;

    return {
      totalSupplyBalanceUSD,
      totalCollateralValueUSD: totalSupplyBalanceUSD,
      totalBorrowBalanceUSD,
      netAPY,
      accountLiquidity,
      accountShortfall,
      isLoading: false,
      error: liquidityError,
    };
  }, [
    supplies,
    borrows,
    allMarkets,
    marketData,
    accountLiquidityData,
    isUserDataPending,
    isMarketDataPending,
    liquidityError,
  ]);

  return {
    ...summary,
    isLoading: isUserDataPending || isLiquidityPending || isMarketDataPending,
  };
};
