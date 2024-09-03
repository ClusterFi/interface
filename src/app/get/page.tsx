import type { Metadata } from "next";
import { GetPage } from "@/layouts";

export const metadata: Metadata = {
  title: "Get LSDs",
  description: "Page description",
};

export default function Page() {
  return <GetPage />;
}
