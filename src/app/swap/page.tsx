import type { Metadata } from "next";
import { SwapPage } from "@/layouts";

export const metadata: Metadata = {
	title: "Swap",
	description: "Page description",
};

export default function Page() {
	return <SwapPage />;
}
