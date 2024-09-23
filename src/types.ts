import { Currency } from "./components";

export enum Network {
    Ethereum,
    Solana,
}

export type ChainProps = {
    name: string;
    chainId: number;
    currency: Currency;
    network: Network;
}