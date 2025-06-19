import { useReadContract, useAccount } from "wagmi";
import { useMemo } from "react";
import { CONTRACT_ADDRESSES } from "../contracts";
import { ABIS } from "../abi/abis";
import { useUserData } from "./useUserData";
import { formatUnits } from "viem";
import { SEPOLIA_CHAIN_ID } from "@/constants";

type Address = `0x${string}`;

export interface AccountSummary {
  totalSupplyBalance: number;
  totalCollateralValue: number;
  totalBorrowBalance: number;
  netAPY: number;
  accountLiquidity: number;
  accountShortfall: number;
  isLoading: boolean;
  error: Error | null;
}

export const useAccountSummary = (
  chainId: number = SEPOLIA_CHAIN_ID,
): AccountSummary => {
  const { address: userAddress } = useAccount();
  const {
    supplies,
    borrows,
    isPending: isUserDataPending,
  } = useUserData(chainId, userAddress);

  // Get account liquidity from Comptroller
  const {
    data: accountLiquidityData,
    isPending: isLiquidityPending,
    error: liquidityError,
  } = useReadContract({
    address: CONTRACT_ADDRESSES.sepolia.comptroller as Address,
    abi: ABIS.ComptrollerABI,
    functionName: "getAccountLiquidity",
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: !!userAddress,
    },
  });

  // Calculate totals and APY
  const summary = useMemo(() => {
    if (!supplies || !borrows || isUserDataPending) {
      return {
        totalSupplyBalance: 0,
        totalCollateralValue: 0,
        totalBorrowBalance: 0,
        netAPY: 0,
        accountLiquidity: 0,
        accountShortfall: 0,
        isLoading: true,
        error: null,
      };
    }

    // Calculate total supply balance (this would need market info for each token)
    let totalSupplyBalance = 0;
    let totalCollateralValue = 0;
    let totalBorrowBalance = 0;
    let weightedSupplyAPY = 0;
    let weightedBorrowAPY = 0;

    // For now, we'll use the account liquidity data from the contract
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

    // Calculate net APY (simplified - would need more complex calculation with actual market data)
    const netAPY = weightedSupplyAPY - weightedBorrowAPY;

    return {
      totalSupplyBalance,
      totalCollateralValue: accountLiquidity + accountShortfall, // Total collateral is liquidity + shortfall
      totalBorrowBalance,
      netAPY,
      accountLiquidity,
      accountShortfall,
      isLoading: false,
      error: liquidityError,
    };
  }, [
    supplies,
    borrows,
    accountLiquidityData,
    isUserDataPending,
    liquidityError,
  ]);

  return {
    ...summary,
    isLoading: isUserDataPending || isLiquidityPending,
  };
};
