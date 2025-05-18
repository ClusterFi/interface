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
