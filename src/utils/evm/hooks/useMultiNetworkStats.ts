import { useMemo } from "react";
import { useReadContracts } from "wagmi";
import { CHAINS } from "@/constants";
import { ABIS } from "@/utils/evm/abi/abis";
import { type Address, type Abi } from "viem";
import { type NetworkStats } from "@/types";
import { useGetAllMarketsForSupportedNetworks } from "./useGetAllMarkets";

type Params = {
  userAddress?: Address;
  comptrollerAddresses: Record<number, Address>; // chainId → comptrollerAddress
};

export const useMultiNetworkStats = ({
  userAddress,
  comptrollerAddresses,
}: Params) => {
  const blocksPerYear = 2102400;
  const markets = useGetAllMarketsForSupportedNetworks();

  const baseContracts = useMemo(() => {
    if (!userAddress || markets.length === 0) return [];

    return markets.flatMap((marketInfo) => {
      const { market: cTokenAddress, chainId } = marketInfo;
      const comptrollerAddress = comptrollerAddresses[chainId];
      if (!comptrollerAddress) return [];

      return [
        {
          address: cTokenAddress,
          abi: ABIS.CTokenABI as Abi,
          functionName: "getAccountSnapshot",
          args: [userAddress],
          chainId,
        },
        {
          address: cTokenAddress,
          abi: ABIS.CTokenABI as Abi,
          functionName: "borrowRatePerBlock",
          chainId,
        },
        {
          address: cTokenAddress,
          abi: ABIS.CTokenABI as Abi,
          functionName: "supplyRatePerBlock",
          chainId,
        },
        {
          address: comptrollerAddress,
          abi: ABIS.ComptrollerABI as Abi,
          functionName: "markets",
          args: [cTokenAddress],
          chainId,
        },
        {
          address: comptrollerAddress,
          abi: ABIS.ComptrollerABI as Abi,
          functionName: "oracle",
          chainId,
        },
      ];
    });
  }, [userAddress, markets, comptrollerAddresses]);

  const {
    data: baseResults,
    isPending: isBasePending,
    error: baseError,
  } = useReadContracts({
    contracts: baseContracts,
    query: { enabled: baseContracts.length > 0 },
  });

  const oracleContracts = useMemo(() => {
    if (!baseResults || baseResults.length === 0 || markets.length === 0)
      return [];

    return markets.flatMap((marketInfo, i) => {
      const { market: cTokenAddress, chainId } = marketInfo;
      const offset = i * 5;
      const oracleResult = baseResults[offset + 4];
      if (oracleResult?.status !== "success") return [];

      const oracleAddress = oracleResult.result as Address;

      return [
        {
          address: oracleAddress,
          abi: ABIS.OracleABI as Abi,
          functionName: "getUnderlyingPrice",
          args: [cTokenAddress],
          chainId,
        },
      ];
    });
  }, [baseResults, markets]);

  const {
    data: oracleResults,
    isPending: isOraclePending,
    error: oracleError,
  } = useReadContracts({
    contracts: oracleContracts,
    query: { enabled: oracleContracts.length > 0 },
  });

  const statsPerChain: NetworkStats[] = useMemo(() => {
    if (!baseResults || !oracleResults || markets.length === 0) return [];

    const stats: NetworkStats[] = [];

    for (let i = 0; i < markets.length; i++) {
      const marketInfo = markets[i];
      const chain = CHAINS.find((c) => c.chainId === marketInfo.chainId);
      if (!chain) continue;

      const offset = i * 5;
      const results = baseResults.slice(offset, offset + 5);
      const oracle = oracleResults[i];

      if (
        results.length !== 5 ||
        results.some((r) => r.status !== "success") ||
        !oracle ||
        oracle.status !== "success"
      ) {
        continue;
      }

      const [snapshotRes, borrowRateRes, supplyRateRes, marketRes] = results;

      const [_, cTokenBalance, borrowBalance, exchangeRate] =
        snapshotRes.result as [string, bigint, bigint, bigint];
      const borrowRatePerBlock = borrowRateRes.result as bigint;
      const supplyRatePerBlock = supplyRateRes.result as bigint;
      const [, collateralFactorMantissa] = marketRes.result as [
        boolean,
        bigint,
        boolean
      ];
      const price = oracle.result as bigint;

      const supplyApy =
        Math.pow((Number(supplyRatePerBlock) / 1e18) * blocksPerYear + 1, 1) -
        1;
      const borrowApy =
        Math.pow((Number(borrowRatePerBlock) / 1e18) * blocksPerYear + 1, 1) -
        1;

      const collateralUnderlying =
        (cTokenBalance * exchangeRate) / BigInt(1e18);
      const totalCollateralValue = (collateralUnderlying * price) / BigInt(1e18);
      const collateralValue =
        (collateralUnderlying * price * collateralFactorMantissa) /
        BigInt(1e36);
      const borrowValue = (borrowBalance * price) / BigInt(1e18);

      const netWorth = Number(collateralValue - borrowValue);
      const currentApyBase =
        Number(collateralValue) * supplyApy - Number(borrowValue) * borrowApy;
      const collateral = Number(collateralValue);
      const totalCollateral = Number(totalCollateralValue);
      const borrow = Number(borrowValue);
      const netApy = netWorth === 0 ? 0 : currentApyBase / netWorth;

      let healthFactor = Infinity;
      let ltv = 0;
      if (borrow > 0 && totalCollateral > 0) {
        healthFactor = totalCollateral / borrow;
        ltv = borrow / totalCollateral;
      }

      stats.push({
        healthFactor,
        netWorth,
        currentApyBase,
        netApy,
        collateralValue: collateral,
        borrowValue: borrow,
        ltv,
        networkName: chain.name,
        supplyApy,
        borrowApy,
        totalCollateralValue: totalCollateral,
      });
    }

    return stats;
  }, [baseResults, oracleResults, markets]);

  const aggregateStats = useMemo(() => {
    if (statsPerChain.length === 0) return null;

    const totalCollateral = statsPerChain.reduce(
      (sum, s) => sum + s.collateralValue,
      0
    );
    const totalCollateralForHealthFactor = statsPerChain.reduce(
      (sum, s) => sum + s.totalCollateralValue,
      0
    );
    const totalBorrow = statsPerChain.reduce((sum, s) => sum + s.borrowValue, 0);
    const netWorth = totalCollateral - totalBorrow;

    const currentApyBase = statsPerChain.reduce(
      (sum, s) =>
        sum + s.collateralValue * s.supplyApy - s.borrowValue * s.borrowApy,
      0
    );

    const netApy = netWorth === 0 ? 0 : currentApyBase / netWorth;

    let healthFactor = Infinity;
    let ltv = 0;
    if (totalBorrow > 0 && totalCollateralForHealthFactor > 0) {
      healthFactor = totalCollateralForHealthFactor / totalBorrow;
      ltv = totalBorrow / totalCollateralForHealthFactor;
    }

    return {
      netWorth,
      netApy,
      currentApyBase,
      collateralValue: totalCollateral,
      borrowValue: totalBorrow,
      ltv,
      healthFactor,
    };
  }, [statsPerChain]);

  return {
    stats: statsPerChain,
    aggregate: aggregateStats,
    isPending: isBasePending || isOraclePending,
    error: baseError || oracleError,
  };
};
