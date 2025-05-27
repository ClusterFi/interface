import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { ABIS } from '../abi/abis';

export const useRepayLoanCrossChain = (
    clgAddress: `0x${string}`,
    dstChainId: number,
    token: `0x${string}`,
    borrower: `0x${string}`
) => {
    const [hash, setHash] = useState<`0x${string}` | undefined>();
    const { writeContractAsync, isPending } = useWriteContract();
    const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

    const repay = async (amount: bigint) => {
        try {
            const txHash = await writeContractAsync({
                abi: ABIS.CLG,
                address: clgAddress,
                functionName: 'repayLoanCrossChain',
                args: [dstChainId, token, borrower, amount],
                value: BigInt(0),
            });
            setHash(txHash);
        } catch (err) {
            console.error('Repay failed:', err);
        }
    };

    return {
        repay,
        isPending,
        isConfirming,
        hash,
    };
};
