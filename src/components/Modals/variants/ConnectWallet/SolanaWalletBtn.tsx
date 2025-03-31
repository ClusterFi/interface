"use client";

import * as React from "react";
import cx from "classnames";
import { Button, Text } from "@/components";
import styles from "./ConnectWallet.module.scss";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletReadyState } from "@solana/wallet-adapter-base";
import { WalletVariant } from "./ConnectWallet";

export type WalletBtnPros = {
  index: number;
} & WalletVariant;

export const SolanaWalletBtn: React.FC<WalletBtnPros> = ({
  name,
  icon,
  index,
}) => {
  const { connected, connecting, disconnect, select, wallets, wallet } =
    useWallet();

  const solWallet = React.useMemo(() => {
    const wallets_ = wallets.filter((t) => t.adapter.name == name);
    return wallets_[0];
  }, [name, wallets]);

  const walletState = React.useMemo(() => {
    if (solWallet) {
      return solWallet.readyState;
    }

    return WalletReadyState.Unsupported;
  }, [solWallet]);

  return (
    <Button
      variant={"custom"}
      size={"custom"}
      className={styles.button}
      onClick={() => {
        if (solWallet) {
          if (connected && name == wallet?.adapter.name) {
            disconnect();
          } else {
            if (solWallet.readyState == "NotDetected") {
              window.open(solWallet.adapter.url, "_blank");
            } else if (
              solWallet.readyState == "Installed" ||
              solWallet.readyState == "Loadable"
            ) {
              select(solWallet.adapter.name);
            }
          }
        }
      }}
    >
      <Text
        size={16}
        theme={500}
        className={styles.wallet}
        style={{ animationDelay: index * 50 + "ms" }}
      >
        {icon}
        {name}
        <span
          className={cx(
            styles.status,
            (walletState == "Installed" || walletState == "Loadable") &&
              styles.highlight,
          )}
        >
          {name == wallet?.adapter.name
            ? connected
              ? "Disconnect"
              : connecting
                ? "Connecting"
                : ""
            : walletState == "Installed" || walletState == "Loadable"
              ? "Connect"
              : walletState == "NotDetected"
                ? "Not detected"
                : "Unsupported"}
        </span>
      </Text>
    </Button>
  );
};
