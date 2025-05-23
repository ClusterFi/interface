import {Address, getContract, PublicClient} from 'viem';

import {ABIS} from '../abi/abis';

type AssetInfo = {
    cTokenAddress: Address;
    underlyingDecimals: number;
};

type networkStats = {
    networkName: string,
    netWorth: number,
    netApy: number,
    healtFactor: number,
    collateralValue: number,
    borrowValue: number,
    ltv: number,
    currentApyBase: number,
}

export async function getGlobalStats({
                                         userAddress,
                                         comptrollerAddress,
                                         asset,
                                         client,
                                     }: {
    userAddress: Address;
    comptrollerAddress: Address;
    asset: AssetInfo;
    client: PublicClient;
}): Promise<networkStats> {
    const supportedNetworks = [];

    const networksSummary: networkStats[] = [];

    for (let network of supportedNetworks) {
        try {
            const networkStats = await getNetworkStats({userAddress, comptrollerAddress, asset, client});

            networksSummary.push(networkStats);
        } catch (e) {
            console.error(`no network stats data, ${e}`);
        }
    }

    const globalStats: networkStats = {
        healthFactor: 0,
        netWorth: 0,
        netApy: 0,
        collateralValue: 0,
        borrowValue: 0,
        ltv: 0,
        currentApyBase: 0,
        networkName: 'multi',
    } as networkStats;

    for (let network of networksSummary) {
        globalStats.collateralValue = globalStats.collateralValue + network.collateralValue;
        globalStats.borrowValue = globalStats.borrowValue + network.borrowValue;
        globalStats.currentApyBase = globalStats.currentApyBase + network.currentApyBase;

    }

    globalStats.healtFactor = Number((globalStats.collateralValue * globalStats.ltv) / globalStats.borrowValue);
    globalStats.netWorth = globalStats.collateralValue - globalStats.borrowValue;
    globalStats.netApy = globalStats.currentApyBase / globalStats.netWorth;

    return globalStats;
}

async function getNetworkStats({
                                   userAddress,
                                   comptrollerAddress,
                                   asset,
                                   client,
                               }: {
    userAddress: Address;
    comptrollerAddress: Address;
    asset: AssetInfo;
    client: PublicClient;
}): Promise<networkStats> {
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

    const [, cTokenBalance, borrowBalance, exchangeRate] = await cToken.read.getAccountSnapshot([userAddress]);


    const blocksPerYear = 2102400;
    const borrowRatePerBlock = await cToken.read.borrowRatePerBlock();
    const borrowAPY = (Math.pow((borrowRatePerBlock / 1e18) * blocksPerYear + 1, 1) - 1) * 100;

    const supplyRatePerBlock = await cToken.read.supplyRatePerBlock();
    const supplyAPY = (Math.pow((supplyRatePerBlock / 1e18) * blocksPerYear + 1, 1) - 1) * 100;

    const collateralUnderlying = (BigInt(cTokenBalance) * BigInt(exchangeRate)) / 10n ** 18n;

    const market = await comptroller.read.markets([asset.cTokenAddress]);
    const collateralFactorMantissa = BigInt(market[1].collateralFactorMantissa);

    const oracleAddress = await comptroller.read.oracle() as Address;

    const oracle = getContract({
        address: oracleAddress,
        abi: ABIS.OracleABI,
        client,
    });

    const price = await oracle.read.getUnderlyingPrice([asset.cTokenAddress]) as BigInt;

    const collateralValue = (collateralUnderlying * BigInt(price) * collateralFactorMantissa) / 10n ** 36n;

    const borrowValue = (BigInt(borrowBalance) * BigInt(price)) / 10n ** 18n;

    const netWorth = Number(collateralValue - borrowValue);
    const currentApyBase = Number((collateralValue * supplyAPY) - (borrowValue * borrowAPY))

    return {
        healthFactor: Number(borrowValue) === 0 ? Infinity : Number(collateralValue) / Number(borrowValue),
        netWorth: Number(collateralValue - borrowValue),
        currentApyBase: currentApyBase,
        netApy: (currentApyBase) / netWorth,
        collateralValue: collateralValue,
        borrowValue: borrowValue,
        ltv: Number(collateralValue / borrowValue),
        networkName: '',
    } as networkStats;
}
