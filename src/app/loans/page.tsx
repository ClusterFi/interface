import type { Metadata } from "next";
import { LoansPage } from "@/layouts";

export const metadata: Metadata = {
  title: "Cross-Chain Loans",
  description: "Page description",
};

export default function Page() {
  return <LoansPage />;
}
