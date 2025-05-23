import {ABIS} from "@/utils/evm/abi/abis";
import { Address, getContract, PublicClient } from 'viem';
import {NetworkStats, AssetInfo, MarketData} from '@/types';

type Params = {
    userAddress: Address;
    comptrollerAddress: Address;
    asset: AssetInfo;
    client: PublicClient;
};

export async function getNetworkStats({
                                          userAddress,
                                          comptrollerAddress,
                                          asset,
                                          client,
                                      }: Params): Promise<NetworkStats> {
    const cToken = getContract({
        address: asset.cTokenAddress,
        abi: ABIS.CTokenABI,
        client,
    });

    const comptroller = getContract({
        address: comptrollerAddress,
        abi: ABIS.ComptrollerABI,
        client,
    });

    const [error, cTokenBalance, borrowBalance, exchangeRate] = await cToken.read.getAccountSnapshot([userAddress]) as [
        string,
        bigint,
        bigint,
        bigint
    ];

    const blocksPerYear = 2102400;

    const borrowRatePerBlock = await cToken.read.borrowRatePerBlock();
    const borrowAPY = Math.pow((Number(borrowRatePerBlock) / 1e18) * blocksPerYear + 1, 1) - 1;

    const supplyRatePerBlock = await cToken.read.supplyRatePerBlock();
    const supplyAPY = Math.pow((Number(supplyRatePerBlock) / 1e18) * blocksPerYear + 1, 1) - 1;

    const collateralUnderlying = (BigInt(cTokenBalance) * BigInt(exchangeRate)) / BigInt(Math.pow(10, 18).toString());

    const market = await comptroller.read.markets([asset.cTokenAddress]) as [boolean, MarketData];
    const collateralFactorMantissa = BigInt(market[1].collateralFactorMantissa);

    const oracleAddress = await comptroller.read.oracle() as Address;

    const oracle = getContract({
        address: oracleAddress,
        abi: ABIS.OracleABI,
        client,
    });

    const price = await oracle.read.getUnderlyingPrice([asset.cTokenAddress]) as bigint;

    const collateralValue = (collateralUnderlying * price * collateralFactorMantissa) / BigInt(Math.pow(10, 36).toString());
    const borrowValue = (BigInt(borrowBalance) * price) / BigInt(Math.pow(10, 18).toString());

    const netWorth = Number(collateralValue - borrowValue);
    const currentApyBase = Number(collateralValue) * supplyAPY - Number(borrowValue) * borrowAPY;

    const collateral = Number(collateralValue);
    const borrow = Number(borrowValue);
    const netApy = netWorth === 0 ? 0 : currentApyBase / netWorth;

    // No debt means no risk of liquidation
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
}
