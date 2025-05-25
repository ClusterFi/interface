import {
    useWriteContract,
    useReadContract,
    useWaitForTransactionReceipt,
} from 'wagmi';
import { useState } from 'react';
import { ABIS } from '../abi/abis';

export const useBorrow = (cTokenAddress: `0x${string}`) => {
    const [hash, setHash] = useState<`0x${string}` | undefined>();

    const { writeContractAsync, isPending } = useWriteContract();

    const { data: clgContractAddress } = useReadContract({
        abi: ABIS.CTokenABI,
        address: cTokenAddress,
        functionName: 'clgContract',
    });

    /**
     * Standard borrow
     */
    const borrow = async (amount: bigint) => {
        try {
            const txHash = await writeContractAsync({
                abi: ABIS.CTokenABI,
                address: cTokenAddress,
                functionName: 'borrow',
                args: [amount],
            });
            setHash(txHash);
        } catch (err) {
            console.error('Borrow failed:', err);
        }
    };

    /**
     * Cross-chain borrow
     */
    const borrowCrossChain = async (
        amount: bigint,
        dstEid: number,
        recipient: `0x${string}`,
        options: string,
        value: bigint
    ) => {
        if (!clgContractAddress) {
            console.error('No CLG address provided!');
            return;
        }

        try {
            const txHash = await writeContractAsync({
                abi: ABIS.CLG,
                address: clgContractAddress as `0x${string}`,
                functionName: 'borrowCrossChain',
                args: [dstEid, cTokenAddress, amount, recipient, options],
                value,
            });
            setHash(txHash);
        } catch (err) {
            console.error('Cross-chain borrow failed:', err);
        }
    };

    const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

    return {
        borrow,
        borrowCrossChain,
        isPending,
        isConfirming,
        hash,
    };
};
