import type { Metadata } from "next";
import { SingleMarketPage } from "@/layouts";

export const metadata: Metadata = {
  title: "Single market",
  description: "Page description",
};

export default function Page() {
  return <SingleMarketPage />;
}
