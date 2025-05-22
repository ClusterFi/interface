import { useReadContract } from 'wagmi';
import { CONTRACT_ADDRESSES } from '../contracts';
import { ABIS } from '../abi/abis';

export const useGetAllMarkets = (chainId: number) => {
  const result = useReadContract({
    address: CONTRACT_ADDRESSES.sepolia.comptroller as `0x${string}`,
    abi: ABIS.ComptrollerABI,
    functionName: 'getAllMarkets',
    chainId: chainId,
  });

  return {
    ...result,
    chainId,
  };
};
