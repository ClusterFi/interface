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

      const [error, cTokenBalance, borrowBalance, exchangeRate] =
        snapshotRes.result as [bigint, bigint, bigint, bigint];
      
      if (error !== BigInt(0)) {
        continue;
      }
      const borrowRatePerBlock = borrowRateRes.result as bigint;
      const supplyRatePerBlock = supplyRateRes.result as bigint;
      const [, collateralFactorMantissa] = marketRes.result as [
        boolean,
        bigint,
        boolean
      ];
      const price = oracle.result as bigint;

      const blocksPerYear = marketInfo.chainId === 11155111 ? 2628000 : 126144000;
      const supplyApy = (Number(supplyRatePerBlock) / 1e18) * blocksPerYear * 100;
      const borrowApy = (Number(borrowRatePerBlock) / 1e18) * blocksPerYear * 100;
      
      console.log(`Chain ${chain.name} - Supply Rate Per Block: ${supplyRatePerBlock}, Borrow Rate Per Block: ${borrowRatePerBlock}`);
      console.log(`Chain ${chain.name} - Supply APY: ${supplyApy}%, Borrow APY: ${borrowApy}%`);

      const collateralUnderlying = (cTokenBalance * exchangeRate) / BigInt(1e18);
      
      console.log(`Chain ${chain.name} - Raw values:`);
      console.log(`  cTokenBalance: ${cTokenBalance}`);
      console.log(`  exchangeRate: ${exchangeRate}`);
      console.log(`  collateralUnderlying: ${collateralUnderlying}`);
      console.log(`  borrowBalance: ${borrowBalance}`);
      console.log(`  price: ${price}`);
      console.log(`  collateralFactorMantissa: ${collateralFactorMantissa}`);


      let oraclePriceDecimals: bigint;
      if (price >= BigInt(1e28)) {
        oraclePriceDecimals = BigInt(1e30); // Arbitrum format
      } else {
        oraclePriceDecimals = BigInt(1e18); // Ethereum format
      }

      const totalCollateralValue = (collateralUnderlying * price) / (BigInt(1e6) * oraclePriceDecimals);
      const collateralValue = (collateralUnderlying * price * collateralFactorMantissa) / (BigInt(1e6) * oraclePriceDecimals * BigInt(1e18));
      const borrowValue = (borrowBalance * price) / (BigInt(1e6) * oraclePriceDecimals);

      // Now these values are in actual USD (not scaled)
      const netWorth = Number(totalCollateralValue - borrowValue);
      const currentApyBase = Number(totalCollateralValue) * supplyApy - Number(borrowValue) * borrowApy;
      const collateral = Number(collateralValue);
      const totalCollateral = Number(totalCollateralValue);
      const borrow = Number(borrowValue);
      const netApy = netWorth === 0 ? 0 : currentApyBase / netWorth;
      
      console.log(`  totalCollateral USD: ${totalCollateral}`);
      console.log(`  borrow USD: ${borrow}`);
      console.log(`  netWorth USD: ${netWorth}`);

      let healthFactor = Infinity;
      let ltv = 0;
      if (borrow > 0) {
        healthFactor = collateral / borrow;
        ltv = totalCollateral > 0 ? borrow / totalCollateral : 0;
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

    const totalCollateralForNetWorth = statsPerChain.reduce(
      (sum, s) => sum + s.totalCollateralValue,
      0
    );
    const totalCollateralEligible = statsPerChain.reduce(
      (sum, s) => sum + s.collateralValue,
      0
    );
    const totalBorrow = statsPerChain.reduce((sum, s) => sum + s.borrowValue, 0);
    
    const netWorth = totalCollateralForNetWorth - totalBorrow;

    const totalSupplyValue = statsPerChain.reduce((sum, s) => sum + s.totalCollateralValue, 0);
    const totalBorrowValue = statsPerChain.reduce((sum, s) => sum + s.borrowValue, 0);
    
    const weightedSupplyApy = totalSupplyValue > 0 
      ? statsPerChain.reduce((sum, s) => sum + (s.totalCollateralValue * s.supplyApy), 0) / totalSupplyValue
      : 0;
    
    const weightedBorrowApy = totalBorrowValue > 0
      ? statsPerChain.reduce((sum, s) => sum + (s.borrowValue * s.borrowApy), 0) / totalBorrowValue
      : 0;

    // Net APY should be calculated based on the net worth
    const supplyEarnings = (totalSupplyValue * weightedSupplyApy) / 100;
    const borrowCosts = (totalBorrowValue * weightedBorrowApy) / 100;
    const netEarnings = supplyEarnings - borrowCosts;
    const netApy = netWorth > 0 ? (netEarnings / netWorth) * 100 : 0;
    
    console.log('Aggregate Stats:');
    console.log(`Total Supply Value: $${totalSupplyValue}, Weighted Supply APY: ${weightedSupplyApy}%`);
    console.log(`Total Borrow Value: $${totalBorrowValue}, Weighted Borrow APY: ${weightedBorrowApy}%`);
    console.log(`Net Worth: $${netWorth}, Net APY: ${netApy}%`);



    let healthFactor = Infinity;
    let ltv = 0;
    
    if (totalBorrow > 0) {
      healthFactor = totalCollateralEligible / totalBorrow;
      ltv = totalBorrow / totalCollateralForNetWorth;
    } else if (totalCollateralEligible > 0) {
      healthFactor = Infinity;
      ltv = 0;
    }





    return {
      netWorth,
      netApy,
      currentApyBase: netApy * netWorth, // Derived from netApy
      collateralValue: totalCollateralEligible,
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
