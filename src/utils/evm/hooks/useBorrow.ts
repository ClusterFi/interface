import {
  useWriteContract,
  useReadContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { useState } from "react";
import { parseUnits } from "viem";
import { ABIS } from "../abi/abis";

export const useBorrow = (cTokenAddress: `0x${string}`) => {
  const [hash, setHash] = useState<`0x${string}` | undefined>();

  const { writeContractAsync, isPending } = useWriteContract();

  const { data: clgContractAddress } = useReadContract({
    abi: ABIS.CTokenABI,
    address: cTokenAddress,
    functionName: "clgContract",
  });

  const { data: decimals } = useReadContract({
    abi: ABIS.CTokenABI,
    address: cTokenAddress,
    functionName: "decimals",
  });

  const { isLoading: isConfirming, status } = useWaitForTransactionReceipt({
    hash,
  });

  const borrow = async (amount: string) => {
    if (decimals == null) {
      console.error("Decimals not loaded yet");
      return;
    }

    const parsedAmount = parseUnits(amount, Number(decimals));
    try {
      const txHash = await writeContractAsync({
        abi: ABIS.CTokenABI,
        address: cTokenAddress,
        functionName: "borrow",
        args: [parsedAmount],
      });
      setHash(txHash);
    } catch (err) {
      console.error("Borrow failed:", err);
    }
  };

  const borrowCrossChain = async (
    amount: string,
    dstEid: number,
    recipient: `0x${string}`,
    options: string,
    value: bigint,
  ) => {
    if (!decimals) {
      console.error("Decimals not loaded yet");
      return;
    }

    try {
      const parsedAmount = parseUnits(amount, Number(decimals));
      const txHash = await writeContractAsync({
        abi: ABIS.CTokenABI,
        address: cTokenAddress,
        functionName: "borrowCrossChain",
        args: [parsedAmount, dstEid, recipient, options],
        value,
      });
      setHash(txHash);
    } catch (err) {
      console.error("Cross-chain borrow failed:", err);
    }
  };

  return {
    borrow,
    borrowCrossChain,
    isPending,
    isConfirming,
    hash,
    status,
  };
};
