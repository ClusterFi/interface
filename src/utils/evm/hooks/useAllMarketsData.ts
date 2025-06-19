import { useReadContracts, useChainId } from "wagmi";
import { useMemo } from "react";
import { CONTRACT_ADDRESSES } from "../contracts";
import { ABIS } from "../abi/abis";
import { useGetAllMarkets } from "./useGetAllMarkets";
import { formatUnits } from "viem";
import type { Abi, Address } from "viem";
import { ARBITRUM_CHAIN_ID, SEPOLIA_CHAIN_ID } from "@/constants";

export interface MarketData {
  address: Address;
  underlying: Address;
  name: string;
  symbol: string;
  decimals: number;
  cTokenDecimals: number;
  underlyingDecimals: number;

  // Market metrics
  utilization: number;
  supplyAPY: number;
  borrowAPY: number;
  totalSupplyUSD: number;
  totalBorrowUSD: number;
  totalCollateralUSD: number;

  // Raw values
  cash: bigint;
  totalSupply: bigint;
  totalBorrows: bigint;
  exchangeRate: bigint;
  supplyRatePerBlock: bigint;
  borrowRatePerBlock: bigint;
  collateralFactorMantissa: bigint;

  // Oracle price
  underlyingPriceUSD: number;
}

export const useAllMarketsData = (chainId?: number) => {
  const currentChainId = useChainId();
  const targetChainId = chainId || currentChainId;

  const { data: allMarkets, isPending: isMarketsPending } =
    useGetAllMarkets(targetChainId);

  const getAddresses = (chainId: number) => {
    if (chainId === SEPOLIA_CHAIN_ID) {
      return {
        comptroller: CONTRACT_ADDRESSES.sepolia.comptroller as Address,
        oracle: CONTRACT_ADDRESSES.sepolia.oracle as Address,
      };
    } else if (chainId === ARBITRUM_CHAIN_ID) {
      return {
        comptroller: CONTRACT_ADDRESSES.arbitrum_sepolia.comptroller as Address,
        oracle: CONTRACT_ADDRESSES.arbitrum_sepolia.oracle as Address,
      };
    }
    return {
      comptroller: CONTRACT_ADDRESSES.sepolia.comptroller as Address,
      oracle: CONTRACT_ADDRESSES.sepolia.oracle as Address,
    };
  };

  const { comptroller, oracle } = getAddresses(targetChainId);

  const marketContracts = useMemo(() => {
    if (!allMarkets || !Array.isArray(allMarkets)) return [];

    return (allMarkets as Address[]).flatMap((market) => [
      {
        address: market,
        abi: ABIS.CTokenABI as Abi,
        functionName: "underlying" as const,
        chainId: targetChainId,
      },
      {
        address: market,
        abi: ABIS.CTokenABI as Abi,
        functionName: "name" as const,
        chainId: targetChainId,
      },
      {
        address: market,
        abi: ABIS.CTokenABI as Abi,
        functionName: "symbol" as const,
        chainId: targetChainId,
      },
      {
        address: market,
        abi: ABIS.CTokenABI as Abi,
        functionName: "decimals" as const,
        chainId: targetChainId,
      },

      {
        address: market,
        abi: ABIS.CTokenABI as Abi,
        functionName: "getCash" as const,
        chainId: targetChainId,
      },
      {
        address: market,
        abi: ABIS.CTokenABI as Abi,
        functionName: "totalSupply" as const,
        chainId: targetChainId,
      },
      {
        address: market,
        abi: ABIS.CTokenABI as Abi,
        functionName: "totalBorrows" as const,
        chainId: targetChainId,
      },
      {
        address: market,
        abi: ABIS.CTokenABI as Abi,
        functionName: "exchangeRateStored" as const,
        chainId: targetChainId,
      },
      {
        address: market,
        abi: ABIS.CTokenABI as Abi,
        functionName: "supplyRatePerBlock" as const,
        chainId: targetChainId,
      },
      {
        address: market,
        abi: ABIS.CTokenABI as Abi,
        functionName: "borrowRatePerBlock" as const,
        chainId: targetChainId,
      },

      {
        address: comptroller,
        abi: ABIS.ComptrollerABI as Abi,
        functionName: "markets" as const,
        args: [market],
        chainId: targetChainId,
      },
    ]);
  }, [allMarkets, targetChainId, comptroller]);

  // Get underlying token info
  const underlyingContracts = useMemo(() => {
    if (!allMarkets || !Array.isArray(allMarkets)) return [];

    return (allMarkets as Address[]).flatMap((market, index) => [
      {
        address: market,
        abi: ABIS.CTokenABI as Abi,
        functionName: "underlying" as const,
        chainId: targetChainId,
      },
    ]);
  }, [allMarkets, targetChainId]);

  const oracleContracts = useMemo(() => {
    if (!allMarkets || !Array.isArray(allMarkets)) return [];

    return (allMarkets as Address[]).map((market) => ({
      address: oracle,
      abi: ABIS.OracleABI as Abi,
      functionName: "getUnderlyingPrice" as const,
      args: [market],
      chainId: targetChainId,
    }));
  }, [allMarkets, targetChainId, oracle]);

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

  const processedMarkets = useMemo(() => {
    if (
      !allMarkets ||
      !marketData ||
      !oracleData ||
      isMarketDataPending ||
      isOraclePending
    ) {
      return [];
    }

    const markets: MarketData[] = [];
    const marketsArray = allMarkets as Address[];

    marketsArray.forEach((marketAddress, index) => {
      const baseIndex = index * 11; // 11 calls per market

      const underlyingResult = marketData[baseIndex];
      const nameResult = marketData[baseIndex + 1];
      const symbolResult = marketData[baseIndex + 2];
      const decimalsResult = marketData[baseIndex + 3];
      const cashResult = marketData[baseIndex + 4];
      const totalSupplyResult = marketData[baseIndex + 5];
      const totalBorrowsResult = marketData[baseIndex + 6];
      const exchangeRateResult = marketData[baseIndex + 7];
      const supplyRateResult = marketData[baseIndex + 8];
      const borrowRateResult = marketData[baseIndex + 9];
      const marketInfoResult = marketData[baseIndex + 10];
      const priceResult = oracleData[index];

      if (
        underlyingResult?.status === "success" &&
        nameResult?.status === "success" &&
        symbolResult?.status === "success" &&
        decimalsResult?.status === "success" &&
        cashResult?.status === "success" &&
        totalSupplyResult?.status === "success" &&
        totalBorrowsResult?.status === "success" &&
        exchangeRateResult?.status === "success" &&
        supplyRateResult?.status === "success" &&
        borrowRateResult?.status === "success" &&
        marketInfoResult?.status === "success" &&
        priceResult?.status === "success"
      ) {
        const underlying = underlyingResult.result as Address;
        const name = nameResult.result as string;
        const symbol = symbolResult.result as string;
        const cTokenDecimals = Number(decimalsResult.result as bigint);
        const cash = cashResult.result as bigint;
        const totalSupply = totalSupplyResult.result as bigint;
        const totalBorrows = totalBorrowsResult.result as bigint;
        const exchangeRate = exchangeRateResult.result as bigint;
        const supplyRatePerBlock = supplyRateResult.result as bigint;
        const borrowRatePerBlock = borrowRateResult.result as bigint;
        const marketInfo = marketInfoResult.result as [
          boolean,
          bigint,
          boolean,
        ];
        const oraclePrice = Number(priceResult.result as bigint);

        const underlyingPriceUSD = oraclePrice / 1e24;
        const underlyingDecimals = 6;

        const blocksPerYear = 2102400;
        const supplyRate = Number(supplyRatePerBlock) / 1e18;
        const borrowRate = Number(borrowRatePerBlock) / 1e18;
        const supplyAPY =
          (Math.pow(supplyRate * blocksPerYear + 1, 1) - 1) * 100;
        const borrowAPY =
          (Math.pow(borrowRate * blocksPerYear + 1, 1) - 1) * 100;

        const totalCash = Number(formatUnits(cash, underlyingDecimals));
        const totalBorrowsFormatted = Number(
          formatUnits(totalBorrows, underlyingDecimals),
        );
        const utilization =
          totalCash + totalBorrowsFormatted > 0
            ? (totalBorrowsFormatted / (totalCash + totalBorrowsFormatted)) *
              100
            : 0;

        const totalSupplyUSD =
          (totalCash + totalBorrowsFormatted) * underlyingPriceUSD;
        const totalBorrowUSD = totalBorrowsFormatted * underlyingPriceUSD;

        const collateralFactorMantissa = marketInfo[1];
        const collateralFactor = Number(collateralFactorMantissa) / 1e18;
        const totalCollateralUSD = totalSupplyUSD * collateralFactor;

        markets.push({
          address: marketAddress,
          underlying,
          name,
          symbol,
          decimals: 18,
          cTokenDecimals,
          underlyingDecimals,

          utilization,
          supplyAPY,
          borrowAPY,
          totalSupplyUSD,
          totalBorrowUSD,
          totalCollateralUSD,

          cash,
          totalSupply,
          totalBorrows,
          exchangeRate,
          supplyRatePerBlock,
          borrowRatePerBlock,
          collateralFactorMantissa,

          underlyingPriceUSD,
        });
      }
    });

    return markets;
  }, [
    allMarkets,
    marketData,
    oracleData,
    isMarketDataPending,
    isOraclePending,
  ]);

  return {
    markets: processedMarkets,
    isPending: isMarketsPending || isMarketDataPending || isOraclePending,
    error: null,
  };
};
