import type { Metadata } from "next";
import { SingleMarketPage } from "@/layouts";

export const metadata: Metadata = {
  title: "Single market",
  description: "Page description",
};

type PageProps = {
  searchParams: {
    address?: string;
    chainId?: string;
  };
};

export default function Page({ searchParams }: PageProps) {
  const marketAddress = searchParams.address as `0x${string}` | undefined;
  const chainId = searchParams.chainId ? parseInt(searchParams.chainId) : undefined;
  
  return <SingleMarketPage marketAddress={marketAddress} chainId={chainId} />;
}
