"use client";

import * as React from "react";
import cx from "classnames";
import {
  Button,
  Text,
} from "@/components";
import styles from "./ConnectWallet.module.scss";
import { WalletVariant } from "./ConnectWallet";

export type WalletBtnPros = {
  index: number;
} & WalletVariant;

export const EvmWalletBtn: React.FC<WalletBtnPros> = ({ name, icon, index }) => {

  const isDetected = false;

  return (
    <Button
      variant={"custom"}
      size={"custom"}
      className={styles.button}
      onClick={() => {
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
            isDetected && styles.highlight,
          )}
        >
          {isDetected ? "Connect" : "Not Detected"}
        </span>
      </Text>
    </Button>
  );
};
