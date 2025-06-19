import { useReadContract, useAccount, useReadContracts } from "wagmi";
import { useMemo } from "react";
import { CONTRACT_ADDRESSES } from "../contracts";
import { ABIS } from "../abi/abis";
import { useUserData } from "./useUserData";
import { useGetAllMarkets } from "./useGetAllMarkets";
import { formatUnits } from "viem";
import type { Abi } from "viem";
import { ARBITRUM_CHAIN_ID, SEPOLIA_CHAIN_ID } from "@/constants";

type Address = `0x${string}`;

export interface AccountSummaryWithOracle {
  totalSupplyBalanceUSD: number;
  totalCollateralValueUSD: number;
  totalBorrowBalanceUSD: number;
  netAPY: number;
  accountLiquidity: number;
  accountShortfall: number;
  isLoading: boolean;
  error: Error | null;
}

export const useAccountSummaryWithOracle = (
  chainId: number = SEPOLIA_CHAIN_ID,
): AccountSummaryWithOracle => {
  const { address: userAddress } = useAccount();
  const {
    supplies,
    borrows,
    isPending: isUserDataPending,
  } = useUserData(chainId, userAddress);
  const { data: allMarkets } = useGetAllMarkets(chainId);

  const getComptrollerAddress = (chainId: number): Address => {
    if (chainId === SEPOLIA_CHAIN_ID) {
      return CONTRACT_ADDRESSES.sepolia.comptroller as Address;
    } else if (chainId === ARBITRUM_CHAIN_ID) {
      return CONTRACT_ADDRESSES.arbitrum_sepolia.comptroller as Address;
    }
    return CONTRACT_ADDRESSES.sepolia.comptroller as Address;
  };

  const comptrollerAddress = getComptrollerAddress(chainId);

  const {
    data: accountLiquidityData,
    isPending: isLiquidityPending,
    error: liquidityError,
  } = useReadContract({
    address: comptrollerAddress,
    abi: ABIS.ComptrollerABI as Abi,
    functionName: "getAccountLiquidity",
    args: userAddress ? [userAddress] : undefined,
    chainId: chainId,
    query: {
      enabled: !!userAddress,
    },
  });

  const { data: oracleAddress } = useReadContract({
    address: comptrollerAddress,
    abi: ABIS.ComptrollerABI as Abi,
    functionName: "oracle",
    chainId: chainId,
    query: {
      enabled: true,
    },
  });

  const marketContracts = useMemo(() => {
    if (!allMarkets || !Array.isArray(allMarkets)) return [];

    return (allMarkets as Address[]).flatMap((market) => [
      {
        address: market,
        abi: ABIS.CTokenABI as Abi,
        functionName: "supplyRatePerBlock" as const,
        chainId: chainId,
      },
      {
        address: market,
        abi: ABIS.CTokenABI as Abi,
        functionName: "borrowRatePerBlock" as const,
        chainId: chainId,
      },
      {
        address: market,
        abi: ABIS.CTokenABI as Abi,
        functionName: "exchangeRateStored" as const,
        chainId: chainId,
      },
      {
        address: market,
        abi: ABIS.CTokenABI as Abi,
        functionName: "decimals" as const,
        chainId: chainId,
      },
      {
        address: market,
        abi: ABIS.CTokenABI as Abi,
        functionName: "underlying" as const,
        chainId: chainId,
      },
    ]);
  }, [allMarkets, chainId]);

  const oracleContracts = useMemo(() => {
    if (!allMarkets || !Array.isArray(allMarkets) || !oracleAddress) return [];

    return (allMarkets as Address[]).map((market) => ({
      address: oracleAddress as Address,
      abi: ABIS.OracleABI as Abi,
      functionName: "getUnderlyingPrice" as const,
      args: [market],
      chainId: chainId,
    }));
  }, [allMarkets, oracleAddress, chainId]);

  const { data: marketData, isPending: isMarketDataPending } = useReadContracts(
    {
      contracts: marketContracts,
      query: {
        enabled: marketContracts.length > 0,
      },
    },
  );

  const { data: oracleData, isPending: isOraclePending } = useReadContracts({
    contracts: oracleContracts,
    query: {
      enabled: oracleContracts.length > 0,
    },
  });

  const summary = useMemo(() => {
    if (
      !supplies ||
      !borrows ||
      !allMarkets ||
      !marketData ||
      !oracleData ||
      isUserDataPending ||
      isMarketDataPending ||
      isOraclePending
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

    supplies.forEach((supply) => {
      if (supply.balance > BigInt(0)) {
        const marketIndex = (allMarkets as Address[]).findIndex(
          (m) => m === supply.cToken,
        );
        if (marketIndex >= 0) {
          const supplyRateData = marketData[marketIndex * 5];
          const exchangeRateData = marketData[marketIndex * 5 + 2];
          const cTokenDecimalsData = marketData[marketIndex * 5 + 3];
          const priceData = oracleData[marketIndex];

          if (
            supplyRateData?.status === "success" &&
            exchangeRateData?.status === "success" &&
            cTokenDecimalsData?.status === "success" &&
            priceData?.status === "success"
          ) {
            const supplyRate = Number(supplyRateData.result as bigint) / 1e18;
            const exchangeRate =
              Number(exchangeRateData.result as bigint) / 1e18;
            const cTokenDecimals = Number(cTokenDecimalsData.result as bigint);

            const oraclePrice = Number(priceData.result as bigint);
            const priceUSD = oraclePrice / 1e18;

            const cTokenBalance = Number(
              formatUnits(supply.balance, cTokenDecimals),
            );
            const underlyingBalance = cTokenBalance * exchangeRate;

            const balanceUSD = underlyingBalance * priceUSD;
            totalSupplyBalanceUSD += balanceUSD;

            const supplyAPY = (Math.pow(supplyRate * 2102400 + 1, 1) - 1) * 100;
            totalSupplyAPYWeighted += supplyAPY * balanceUSD;
            totalSupplyWeight += balanceUSD;

            console.log("Supply calculation:", {
              cTokenBalance,
              exchangeRate,
              underlyingBalance,
              oraclePrice,
              priceUSD,
              balanceUSD,
              cTokenDecimals,
            });
          }
        }
      }
    });

    // Process borrows
    borrows.forEach((borrow) => {
      if (borrow.currentBalance > BigInt(0)) {
        const marketIndex = (allMarkets as Address[]).findIndex(
          (m) => m === borrow.cToken,
        );
        if (marketIndex >= 0) {
          const borrowRateData = marketData[marketIndex * 5 + 1];
          const priceData = oracleData[marketIndex];

          if (
            borrowRateData?.status === "success" &&
            priceData?.status === "success"
          ) {
            const borrowRate = Number(borrowRateData.result as bigint) / 1e18;

            const oraclePrice = Number(priceData.result as bigint);
            const priceUSD = oraclePrice / 1e18; // Convert to USD per token

            // Calculate USD value using correct decimals (USDC has 6 decimals for borrow balance too)
            const borrowBalance = Number(formatUnits(borrow.currentBalance, 6)); // USDC has 6 decimals
            const balanceUSD = borrowBalance * priceUSD;
            totalBorrowBalanceUSD += balanceUSD;

            // Calculate APY
            const borrowAPY = (Math.pow(borrowRate * 2102400 + 1, 1) - 1) * 100;
            totalBorrowAPYWeighted += borrowAPY * balanceUSD;
            totalBorrowWeight += balanceUSD;
          }
        }
      }
    });

    // Calculate weighted average APY
    const avgSupplyAPY =
      totalSupplyWeight > 0 ? totalSupplyAPYWeighted / totalSupplyWeight : 0;
    const avgBorrowAPY =
      totalBorrowWeight > 0 ? totalBorrowAPYWeighted / totalBorrowWeight : 0;
    const netAPY = avgSupplyAPY - avgBorrowAPY;

    // Get account liquidity values (already in USD from the contract)
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

    console.log("Final calculation:", {
      totalSupplyBalanceUSD,
      totalBorrowBalanceUSD,
      netAPY,
      accountLiquidity,
      accountShortfall,
    });

    return {
      totalSupplyBalanceUSD,
      totalCollateralValueUSD: totalSupplyBalanceUSD, // Collateral is the supplied amount
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
    oracleData,
    accountLiquidityData,
    isUserDataPending,
    isMarketDataPending,
    isOraclePending,
    liquidityError,
  ]);

  return {
    ...summary,
    isLoading:
      isUserDataPending ||
      isLiquidityPending ||
      isMarketDataPending ||
      isOraclePending,
  };
};
