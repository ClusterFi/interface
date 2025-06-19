import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { useState } from "react";
import { ABIS } from "../abi/abis";

export const useRepayBorrow = (cTokenAddress: `0x${string}`) => {
  const [hash, setHash] = useState<`0x${string}` | undefined>();

  const { writeContractAsync, isPending } = useWriteContract();

  const repay = async (amount: bigint) => {
    try {
      const txHash = await writeContractAsync({
        abi: ABIS.CTokenABI,
        address: cTokenAddress,
        functionName: "repayBorrow",
        args: [amount],
      });
      setHash(txHash);
    } catch (err) {
      console.error("Repay failed:", err);
    }
  };

  const { isLoading: isConfirming, status } = useWaitForTransactionReceipt({
    hash,
  });

  return {
    repay,
    isPending,
    isConfirming,
    status,
    hash,
  };
};
