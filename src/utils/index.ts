import { SOLANA_CHAIN_ID } from "@/constants";

export * from "./hooks";
export * from "./media";

export function isSolanaChain(chainId: number): boolean {
  return chainId == SOLANA_CHAIN_ID;
}

export function formatUSD(value: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatCoin(value: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 20,
  });
}

export const shortenAddress = (address: string | undefined) => {

  if (!address) return '';

  if (address.startsWith('0x')) return `${address.slice(0, 5)}...${address?.slice(-3)}`;

  return `${address?.slice(0, 4)}...${address?.slice(-4)}`;
};
