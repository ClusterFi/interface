"use client";

import * as React from "react";
import cx from "classnames";
import {
  Button,
  Text,
} from "@/components";
import styles from "./ConnectWallet.module.scss";
import { WalletVariant } from "./ConnectWallet";
import { useConnect } from "wagmi";
import { EVM_CHAIN_ID } from "@/constants";

export type WalletBtnPros = {
  index: number;
} & WalletVariant;

export const EvmWalletBtn: React.FC<WalletBtnPros> = ({ name, icon, index }) => {

  const { connectors, connect } = useConnect();

  const connector = React.useMemo(() => {
    return connectors.filter(t => t.name == name)[0];
  }, [
    connectors,
    name,
  ])

  const isDetected = React.useMemo(() => {
    return !!connector;
  }, [
    connector
  ]);

  return (
    <Button
      variant={"custom"}
      size={"custom"}
      className={styles.button}
      onClick={() => {
        if (connector) {
          connect({
            chainId: EVM_CHAIN_ID,
            connector
          })
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
            isDetected && styles.highlight,
          )}
        >
          {isDetected ? "Connect" : "Not Detected"}
        </span>
      </Text>
    </Button>
  );
};
