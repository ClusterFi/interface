import { useReadContract, useToken } from "wagmi";
import { CONTRACT_ADDRESSES } from "../contracts";
import { ABIS } from "../abi/abis";

type Address = `0x${string}`;

export type MarketInfo = {
  address: Address;
  underlying: Address;
  name: string;
  symbol: string;
  decimals: number;
  cTokenDecimals: number;
  underlyingDecimals: number;
  isListed: boolean;
  isComped: boolean;
  collateralFactorMantissa: bigint;
  cash: bigint;
  supplyAPY: number;
  borrowAPY: number;
};

export const useMarketInfo = (marketAddress: Address, chainId?: number) => {
  const getComptrollerAddress = (chainId?: number): Address | undefined => {
    if (chainId === 11155111) {
      return CONTRACT_ADDRESSES.sepolia.comptroller as Address;
    } else if (chainId === 421614) {
      return CONTRACT_ADDRESSES.arbitrum_sepolia.comptroller as Address;
    }
    return CONTRACT_ADDRESSES.sepolia.comptroller as Address;
  };

  const comptrollerAddress = getComptrollerAddress(chainId);

  const marketsDetails = useReadContract({
    address: comptrollerAddress,
    abi: ABIS.ComptrollerABI,
    functionName: "markets",
    args: [marketAddress],
    chainId: chainId,
  });

  const underlyingCall = useReadContract({
    address: marketAddress,
    abi: ABIS.CTokenABI,
    functionName: "underlying",
    chainId: chainId,
  });

  const tokenInfo = useToken({
    address: underlyingCall.data as Address | undefined,
    chainId: chainId,
    query: {
      enabled: !!underlyingCall.data,
    },
  });

  const underlyingCallDecimals = useReadContract({
    address: underlyingCall.data as `0x${string}` | undefined,
    abi: ABIS.ERC20ABI,
    functionName: "decimals",
    chainId: chainId,
  });

  const underlyingDecimals = underlyingCallDecimals.data ?? 6;

  const cTokenDecimalsCall = useReadContract({
    address: marketAddress,
    abi: ABIS.CTokenABI,
    functionName: "decimals",
    chainId: chainId,
  });

  const cashCall = useReadContract({
    address: marketAddress,
    abi: ABIS.CTokenABI,
    functionName: "getCash",
    chainId: chainId,
  });

  const supplyRateCall = useReadContract({
    address: marketAddress,
    abi: ABIS.CTokenABI,
    functionName: "supplyRatePerBlock",
    chainId: chainId,
  });

  const borrowRateCall = useReadContract({
    address: marketAddress,
    abi: ABIS.CTokenABI,
    functionName: "borrowRatePerBlock",
    chainId: chainId,
  });

  const isPending =
    marketsDetails.isPending ||
    underlyingCall.isPending ||
    tokenInfo.isPending ||
    cTokenDecimalsCall.isPending ||
    cashCall.isPending ||
    supplyRateCall.isPending ||
    borrowRateCall.isPending;

  const error =
    marketsDetails.error ||
    tokenInfo.error ||
    cTokenDecimalsCall.error ||
    cashCall.error ||
    supplyRateCall.error ||
    borrowRateCall.error;

  const hasAllData =
    marketsDetails.data !== undefined &&
    underlyingCall.data !== undefined &&
    tokenInfo.data !== undefined &&
    cTokenDecimalsCall.data !== undefined &&
    cashCall.data !== undefined &&
    supplyRateCall.data !== undefined &&
    borrowRateCall.data !== undefined;

  const blocksPerYear = 2102400;
  const supplyRate = hasAllData ? Number(supplyRateCall.data) / 1e18 : 0;
  const borrowRate = hasAllData ? Number(borrowRateCall.data) / 1e18 : 0;

  const supplyAPY = (Math.pow(supplyRate * blocksPerYear + 1, 1) - 1) * 100;
  const borrowAPY = (Math.pow(borrowRate * blocksPerYear + 1, 1) - 1) * 100;

  const data: MarketInfo | undefined = hasAllData
    ? {
        address: marketAddress,
        underlying: underlyingCall.data as Address,
        isListed: (marketsDetails.data as [boolean, bigint, boolean])[0],
        collateralFactorMantissa: (
          marketsDetails.data as [boolean, bigint, boolean]
        )[1],
        isComped: (marketsDetails.data as [boolean, bigint, boolean])[2],
        name: tokenInfo.data?.name ?? "",
        symbol: tokenInfo.data?.symbol ?? "",
        decimals: tokenInfo.data?.decimals ?? 18,
        cTokenDecimals: Number(cTokenDecimalsCall.data),
        underlyingDecimals: Number(underlyingDecimals),
        cash: cashCall.data as bigint,
        supplyAPY,
        borrowAPY,
      }
    : undefined;

  return {
    data,
    isPending,
    error,
  };
};
