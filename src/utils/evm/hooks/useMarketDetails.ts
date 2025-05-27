import { useReadContract } from 'wagmi';
import { CONTRACT_ADDRESSES } from '../contracts';
import { ABIS } from '../abi/abis';

export const useMarketDetails = (marketAddress: `0x${string}`) => {
  return useReadContract({
    address: CONTRACT_ADDRESSES.sepolia.comptroller as `0x${string}`,
    abi: ABIS.ComptrollerABI,
    functionName: 'markets',
    args: [marketAddress],
  });
};
