import "normalize.css";
import "react-loading-skeleton/dist/skeleton.css";
import "@/styles/globals.scss";

import { fonts } from "@/fonts";
import { BaseLayout } from "@/components";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={Object.values(fonts)
          .map((font) => `${font.variable}`)
          .join(" ")}
      >
          <BaseLayout>{children}</BaseLayout>
      </body>
    </html>
  );
}
