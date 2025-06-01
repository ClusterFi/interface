import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { useState } from "react";
import { ABIS } from "../abi/abis";

export const useSupply = (cTokenAddress: `0x${string}`) => {
  const [hash, setHash] = useState<`0x${string}` | undefined>();

  const { writeContractAsync, isPending } = useWriteContract();

  const supply = async (amount: bigint) => {
    try {
      const txHash = await writeContractAsync({
        abi: ABIS.CTokenABI,
        address: cTokenAddress,
        functionName: "mint",
        args: [amount],
      });
      setHash(txHash);
    } catch (err) {
      console.error("Mint failed:", err);
    }
  };

  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  return {
    supply,
    isPending,
    isConfirming,
    hash,
  };
};
