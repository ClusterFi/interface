import type { Metadata } from "next";
import { SingularityPage } from "@/layouts";

export const metadata: Metadata = {
  title: "Singularity",
  description: "Page description",
};

export default function Page() {
  return <SingularityPage />;
}
