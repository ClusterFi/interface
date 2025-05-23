import {Address, PublicClient} from "viem";

export enum Network {
  Ethereum,
  Arbitrum,
  Base,
  Linea,
}

export type Currency =
  | 'Ethereum'
  | 'Solana'
  | 'RocketPoolETH'
  | 'WrappedEETH'
  | 'WrappedStakedETH'
  | 'USDC'
  | 'USDTether'
  | 'Cluster'
  | 'MarinadeStakedSOL'
  | 'JITOStakedSOL'
  | 'AnkrStakedETH'
  | 'Polygon'
  | 'Arbitrum'
  | 'Hyperliquid'
  | 'Base'
  | 'Linea';

export type CurrencyList = Partial<Record<Currency, number>>;

export type ChainProps = {
  name: string;
  chainId: number;
  currency: Currency;
  network: Network;
  eid: number;
};

export type AssetInfo = {
  cTokenAddress: Address;
  underlyingDecimals: number;
};

export type NetworkStats = {
  networkName: string;
  netWorth: number;
  netApy: number;
  healthFactor: number;
  collateralValue: number;
  borrowValue: number;
  ltv: number;
  currentApyBase: number;
};

export type HookParams = {
  userAddress: Address;
  comptrollerAddress: Address;
  asset: AssetInfo;
  client: PublicClient;
};

export type MarketData = {
  isListed: boolean;
  collateralFactorMantissa: bigint;
  isComped: boolean;
};