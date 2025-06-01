import { useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
import type { Address } from 'viem';

interface CrossChainBalanceResult {
  data?: {
    decimals: number;
    formatted: string;
    symbol: string;
    value: bigint;
  };
  isLoading: boolean;
  error: Error | null;
}

export const useCrossChainBalance = (
  userAddress?: Address,
  tokenAddress?: Address,
  chainId?: number
): CrossChainBalanceResult => {
  // Get token decimals
  const { data: decimals, isLoading: isDecimalsLoading } = useReadContract({
    address: tokenAddress,
    abi: [
      {
        name: 'decimals',
        type: 'function',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ type: 'uint8' }],
      },
    ] as const,
    functionName: 'decimals',
    chainId,
    query: {
      enabled: !!tokenAddress && !!chainId,
    },
  });

  // Get token symbol
  const { data: symbol, isLoading: isSymbolLoading } = useReadContract({
    address: tokenAddress,
    abi: [
      {
        name: 'symbol',
        type: 'function',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ type: 'string' }],
      },
    ] as const,
    functionName: 'symbol',
    chainId,
    query: {
      enabled: !!tokenAddress && !!chainId,
    },
  });

  // Get balance
  const { data: balance, isLoading: isBalanceLoading, error } = useReadContract({
    address: tokenAddress,
    abi: [
      {
        name: 'balanceOf',
        type: 'function',
        stateMutability: 'view',
        inputs: [{ type: 'address' }],
        outputs: [{ type: 'uint256' }],
      },
    ] as const,
    functionName: 'balanceOf',
    args: userAddress ? [userAddress] : undefined,
    chainId,
    query: {
      enabled: !!userAddress && !!tokenAddress && !!chainId,
    },
  });

  const isLoading = isDecimalsLoading || isSymbolLoading || isBalanceLoading;

  if (isLoading || !decimals || !symbol || balance === undefined) {
    return {
      isLoading,
      error: error as Error | null,
    };
  }

  const formattedBalance = formatUnits(balance as bigint, decimals as number);

  return {
    data: {
      decimals: decimals as number,
      formatted: formattedBalance,
      symbol: symbol as string,
      value: balance as bigint,
    },
    isLoading: false,
    error: error as Error | null,
  };
}; 