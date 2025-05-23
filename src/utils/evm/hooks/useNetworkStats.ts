import { useMemo } from 'react';
import { useReadContracts } from 'wagmi';
import { ABIS } from '@/utils/evm/abi/abis';
import { type Address, type Abi } from 'viem';
import { type AssetInfo, type NetworkStats, type MarketData } from '@/types';

type Params = {
    userAddress?: Address;
    comptrollerAddress?: Address;
    asset?: AssetInfo;
};

export const useNetworkStats = ({ userAddress, comptrollerAddress, asset }: Params) => {
    const blocksPerYear = 2102400;

    const contracts = useMemo(() => {
        if (!userAddress || !comptrollerAddress || !asset) return [];

        return [
            {
                address: asset.cTokenAddress,
                abi: ABIS.CTokenABI as Abi,
                functionName: 'getAccountSnapshot',
                args: [userAddress],
            },
            {
                address: asset.cTokenAddress,
                abi: ABIS.CTokenABI as Abi,
                functionName: 'borrowRatePerBlock',
            },
            {
                address: asset.cTokenAddress,
                abi: ABIS.CTokenABI as Abi,
                functionName: 'supplyRatePerBlock',
            },
            {
                address: comptrollerAddress,
                abi: ABIS.ComptrollerABI as Abi,
                functionName: 'markets',
                args: [asset.cTokenAddress],
            },
            {
                address: comptrollerAddress,
                abi: ABIS.ComptrollerABI as Abi,
                functionName: 'oracle',
            },
        ];
    }, [userAddress, comptrollerAddress, asset]);

    const {
        data: contractResults,
        isPending,
        error,
    } = useReadContracts({
        contracts,
        query: { enabled: contracts.length > 0 },
    });

    const oracleAddress =
        contractResults?.[4]?.status === 'success'
            ? (contractResults[4].result as Address)
            : undefined;

    const {
        data: oracleResult,
        isPending: isOraclePending,
        error: oracleError,
    } = useReadContracts({
        contracts: oracleAddress
            ? [
                {
                    address: oracleAddress,
                    abi: ABIS.OracleABI as Abi,
                    functionName: 'getUnderlyingPrice',
                    args: [asset?.cTokenAddress ?? '0x0'],
                },
            ]
            : [],
        query: { enabled: !!oracleAddress && !!asset },
    });

    const stats: NetworkStats | null = useMemo(() => {
        if (
            !contractResults ||
            contractResults.some(res => res.status !== 'success') ||
            !oracleResult ||
            oracleResult.length === 0 ||
            oracleResult[0]?.status !== 'success'
        ) {
            return null;
        }

        const [error, cTokenBalance, borrowBalance, exchangeRate] =
            contractResults[0].result as [string, bigint, bigint, bigint];

        const borrowRatePerBlock = contractResults[1].result as bigint;
        const supplyRatePerBlock = contractResults[2].result as bigint;
        const [, collateralFactorMantissa] = contractResults[3].result as [boolean, bigint, boolean];
        const price = oracleResult[0].result as bigint;

        const borrowAPY = Math.pow((Number(borrowRatePerBlock) / 1e18) * blocksPerYear + 1, 1) - 1;
        const supplyAPY = Math.pow((Number(supplyRatePerBlock) / 1e18) * blocksPerYear + 1, 1) - 1;

        const collateralUnderlying = (cTokenBalance * exchangeRate) / BigInt(1e18);


        const collateralValue =
            (collateralUnderlying * price * collateralFactorMantissa) / BigInt(1e36);
        const borrowValue = (borrowBalance * price) / BigInt(1e18);

        const netWorth = Number(collateralValue - borrowValue);
        const currentApyBase =
            Number(collateralValue) * supplyAPY - Number(borrowValue) * borrowAPY;
        const collateral = Number(collateralValue);
        const borrow = Number(borrowValue);
        const netApy = netWorth === 0 ? 0 : currentApyBase / netWorth;

        let healthFactor = Infinity;
        let ltv = 0;
        if (borrow > 0) {
            healthFactor = collateral / borrow;
            ltv = collateral / borrow;
        }

        return {
            healthFactor,
            netWorth,
            currentApyBase,
            netApy,
            collateralValue: collateral,
            borrowValue: borrow,
            ltv,
            networkName: '',
        };
    }, [contractResults, oracleResult]);

    return {
        stats,
        isPending: isPending || isOraclePending,
        error: error || oracleError,
    };
};
