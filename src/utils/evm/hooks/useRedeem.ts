import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { useState } from "react";
import { ABIS } from "../abi/abis";
import { parseUnits } from "viem";

export const useRedeem = (cTokenAddress: `0x${string}`) => {
  const [hash, setHash] = useState<`0x${string}` | undefined>();

  const { writeContractAsync, isPending } = useWriteContract();

  const redeem = async (amount: string, decimals: number) => {
    try {
      const parsedAmount = parseUnits(amount, decimals);
      const txHash = await writeContractAsync({
        abi: ABIS.CTokenABI,
        address: cTokenAddress,
        functionName: "redeemUnderlying",
        args: [parsedAmount],
      });
      setHash(txHash);
    } catch (err) {
      console.error("Redeem failed:", err);
    }
  };

  const { isLoading: isConfirming, status } = useWaitForTransactionReceipt({
    hash,
  });

  return {
    redeem,
    isPending,
    isConfirming,
    status,
    hash,
  };
};
