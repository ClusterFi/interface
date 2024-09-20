export * from "./hooks";
export * from "./media";

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
  return `${address?.slice(0, 4)}...${address?.slice(-4)}`;
};
