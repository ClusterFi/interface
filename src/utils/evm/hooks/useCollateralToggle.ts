import { useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { useState } from 'react';
import { ABIS } from '../abi/abis';

export const useCollateralToggle = (
    comptrollerAddress: `0x${string}`,
    account: `0x${string}` | undefined,
    cTokenAddress: `0x${string}` | undefined
) => {
    const [hash, setHash] = useState<`0x${string}` | undefined>();

    const { data: isMember, refetch, isLoading: isChecking } = useReadContract({
        abi: ABIS.ComptrollerABI,
        address: comptrollerAddress,
        functionName: 'checkMembership',
        args: account && cTokenAddress ? [account, cTokenAddress] : undefined,
        query: {
            enabled: !!account && !!cTokenAddress,
        },
    });

    const { writeContractAsync, isPending } = useWriteContract();
    const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });


    const toggleCollateral = async (enable: boolean) => {
        if (!account || !cTokenAddress) return;

        if (!enable && !isMember) {
            console.warn('User is not in the market — skipping exitMarket');
            return;
        }

        try {
            const txHash = await writeContractAsync({
                abi: ABIS.ComptrollerABI,
                address: comptrollerAddress,
                functionName: enable ? 'enterMarkets' : 'exitMarket',
                args: enable ? [[cTokenAddress]] : [cTokenAddress],
            });

            setHash(txHash);
        } catch (err) {
            console.error('Toggle collateral failed:', err);
        }
    };

    return {
        isMember: Boolean(isMember),
        isChecking,
        isPending,
        isConfirming,
        toggleCollateral,
        refetch,
    };
};
