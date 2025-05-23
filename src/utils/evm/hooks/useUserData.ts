import { useReadContracts } from 'wagmi';
import { type Abi } from 'viem';
import { ABIS } from '../abi/abis';
import { useGetAllMarkets } from './useGetAllMarkets';

type Address = `0x${string}`;

type SupplyInfo = {
  cToken: Address;
  balance: bigint;
};

export const useUserData = (chainId: number, userAddress?: Address) => {
  const { data: markets, isPending: isMarketsPending } = useGetAllMarkets(chainId);

  const cTokenAddresses = (markets ?? []) as Address[];
  const enabled = !!userAddress && cTokenAddresses.length > 0;

  const contracts = enabled
    ? cTokenAddresses.map((cToken) => ({
        address: cToken,
        abi: ABIS.CTokenABI as Abi,
        functionName: 'balanceOf' as const,
        args: [userAddress!],
      }))
    : [];

  const result = useReadContracts({
    contracts,
    query: {
      enabled,
    },
  });

  const supplies: SupplyInfo[] =
    enabled && result.data
      ? result.data.map((res, idx) => ({
          cToken: cTokenAddresses[idx],
          balance: res.status === 'success' ? (res.result as bigint) : BigInt(0),
        }))
      : [];

  return {
    supplies,
    isPending: isMarketsPending || result.isPending,
    error: result.error,
  };
};
