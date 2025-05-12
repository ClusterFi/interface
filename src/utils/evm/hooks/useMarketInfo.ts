import { useReadContract, useToken } from 'wagmi';
import { CONTRACT_ADDRESSES } from '../contracts';
import { ABIS } from '../abi/abis';

type Address = `0x${string}`;

export type MarketInfo = {
  address: Address;
  underlying: Address;
  name: string;
  symbol: string;
  decimals: number;
  isListed: boolean;
  isComped: boolean;
  collateralFactorMantissa: bigint;
  cash: bigint;
};

export const useMarketInfo = (marketAddress: Address) => {
  const marketsDetails = useReadContract({
    address: CONTRACT_ADDRESSES.sepolia.comptroller as Address,
    abi: ABIS.ComptrollerABI,
    functionName: 'markets',
    args: [marketAddress],
  });

  const underlyingCall = useReadContract({
    address: marketAddress,
    abi: ABIS.CTokenABI,
    functionName: 'underlying',
  });

  const tokenInfo = useToken({
    address: underlyingCall.data as Address | undefined,
    query: {
      enabled: !!underlyingCall.data,
    },
  });

  const cashCall = useReadContract({
    address: marketAddress,
    abi: ABIS.CTokenABI,
    functionName: 'getCash',
  });

  const isPending =
    marketsDetails.isPending ||
    underlyingCall.isPending ||
    tokenInfo.isPending ||
    cashCall.isPending;

  const error =
    marketsDetails.error ||
    underlyingCall.error ||
    tokenInfo.error ||
    cashCall.error;

  const hasAllData =
    marketsDetails.data !== undefined &&
    underlyingCall.data !== undefined &&
    tokenInfo.data !== undefined &&
    cashCall.data !== undefined;

  const data: MarketInfo | undefined = hasAllData
    ? {
        address: marketAddress,
        underlying: underlyingCall.data as Address,
        isListed: (marketsDetails.data as [boolean, bigint, boolean])[0],
        collateralFactorMantissa: (
          marketsDetails.data as [boolean, bigint, boolean]
        )[1],
        isComped: (marketsDetails.data as [boolean, bigint, boolean])[2],
        name: tokenInfo.data?.name ?? '',
        symbol: tokenInfo.data?.symbol ?? '',
        decimals: tokenInfo.data?.decimals ?? 18,
        cash: cashCall.data as bigint,
      }
    : undefined;

  return {
    data,
    isPending,
    error,
  };
};
