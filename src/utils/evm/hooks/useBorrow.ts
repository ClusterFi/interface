import {
    useWriteContract,
    useReadContract,
    useWaitForTransactionReceipt,
} from 'wagmi';
import { useState } from 'react';
import { parseUnits } from 'viem';
import { ABIS } from '../abi/abis';

export const useBorrow = (cTokenAddress: `0x${string}`) => {
    const [hash, setHash] = useState<`0x${string}` | undefined>();

    const { writeContractAsync, isPending } = useWriteContract();

    const { data: clgContractAddress } = useReadContract({
        abi: ABIS.CTokenABI,
        address: cTokenAddress,
        functionName: 'clgContract',
    });

    const { data: decimals } = useReadContract({
        abi: ABIS.CTokenABI,
        address: cTokenAddress,
        functionName: 'decimals',
    });

    const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

    const borrow = async (amount: string) => {
        if (decimals == null) {
            console.error('Decimals not loaded yet');
            return;
        }

        const parsedAmount = parseUnits(amount, Number(decimals));
        try {
            const txHash = await writeContractAsync({
                abi: ABIS.CTokenABI,
                address: cTokenAddress,
                functionName: 'borrow',
                args: [parsedAmount],
            });
            setHash(txHash);
        } catch (err) {
            console.error('Borrow failed:', err);
        }
    };

    const borrowCrossChain = async (
        amount: string,
        dstEid: number,
        recipient: `0x${string}`,
        options: string,
        value: bigint,
    ) => {
        if (!clgContractAddress || !decimals) {
            console.error('Missing CLG address or decimals');
            return;
        }

        try {
            const parsedAmount = parseUnits(amount, Number(decimals));
            const txHash = await writeContractAsync({
                abi: ABIS.CLG,
                address: clgContractAddress as `0x${string}`,
                functionName: 'borrowCrossChain',
                args: [dstEid, cTokenAddress, parsedAmount, recipient, options],
                value,
            });
            setHash(txHash);
        } catch (err) {
            console.error('Cross-chain borrow failed:', err);
        }
    };

    return {
        borrow,
        borrowCrossChain,
        isPending,
        isConfirming,
        hash,
    };
};
