import type { Metadata } from "next";
import { DashboardPage } from "@/layouts";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Omnichain lending & borrowing across EVM.(Testnet)",
  icons: {
    icon: "images/favicon.jpg",
  },
};

export default function Page() {
  return <DashboardPage />;
}
