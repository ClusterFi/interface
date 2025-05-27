import { useReadContract } from 'wagmi';
import { erc20Abi } from 'viem';

export function useAllowance({
                               token,
                               owner,
                               spender,
                             }: {
  token: `0x${string}`;
  owner?: `0x${string}`;
  spender: `0x${string}`;
}) {
  const shouldFetch = Boolean(token && owner && spender);

  const result = useReadContract({
    abi: erc20Abi,
    address: token,
    functionName: 'allowance',
    args: shouldFetch ? [owner!, spender] : undefined,
    query: {
      enabled: shouldFetch,
    },
  });

  return {
    allowance: result.data ?? BigInt(0),
    isLoading: result.status === 'pending',
    isError: result.status === 'error',
    refetch: result.refetch,
  };
}
