"use client";

import "normalize.css";
import "react-loading-skeleton/dist/skeleton.css";
import "@rainbow-me/rainbowkit/styles.css";
import "@/styles/globals.scss";

import { fonts } from "@/fonts";
import { BaseLayout } from "@/components";
import { EvmWalletProvider } from "@/contexts/EvmWalletProvider";
import { SolanaWalletProvider } from "@/contexts/SolanaWalletProvider";
import { AppContextProvider } from "@/contexts/AppContext";

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
        <EvmWalletProvider>
          <SolanaWalletProvider>
            <AppContextProvider>
              <BaseLayout>{children}</BaseLayout>
            </AppContextProvider>
          </SolanaWalletProvider>
        </EvmWalletProvider>
      </body>
    </html>
  );
}
