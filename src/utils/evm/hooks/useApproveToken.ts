import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { erc20Abi } from 'viem';

export function useApproveToken({
  token,
  spender,
  amount = BigInt(
    '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
  ), // max uint256
}: {
  token: `0x${string}`;
  spender: `0x${string}`;
  amount?: bigint;
}) {
  const {
    writeContract,
    data: hash,
    isPending: isWriting,
  } = useWriteContract();

  const write = () => {
    writeContract({
      abi: erc20Abi,
      address: token,
      functionName: 'approve',
      args: [spender, amount],
    });
  };

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  return {
    approve: write,
    isPending: isWriting,
    isConfirming,
    isSuccess,
  };
}
