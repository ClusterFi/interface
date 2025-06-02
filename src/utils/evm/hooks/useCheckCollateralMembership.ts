import { useReadContract } from "wagmi";
import { ABIS } from "../abi/abis";

export const useCheckCollateralMembership = (
  comptrollerAddress: `0x${string}`,
  account: `0x${string}` | undefined,
  cTokenAddress: `0x${string}` | undefined,
  chainId?: number
) => {
  const { data, isLoading, refetch } = useReadContract({
    abi: ABIS.ComptrollerABI,
    address: comptrollerAddress,
    functionName: 'checkMembership',
    args: account && cTokenAddress ? [account, cTokenAddress] : undefined,
    chainId: chainId,
    query: {
      enabled: !!account && !!cTokenAddress,
    },
  });

  return {
    isMember: Boolean(data),
    isLoading,
    refetch,
  };
};
