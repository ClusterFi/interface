"use client";

import * as React from "react";
import cx from "classnames";
import {
  Button,
  Text,
} from "@/components";
import styles from "./ConnectWallet.module.scss";
import { WalletVariant } from "./ConnectWallet";
import { useAccount, useConnect } from "wagmi";
import { MAIN_CHAIN_ID } from "@/constants";
import { WalletButton } from "@rainbow-me/rainbowkit";

export type WalletBtnPros = {
  index: number;
} & WalletVariant;

export const EvmWalletBtn: React.FC<WalletBtnPros> = ({ id, name, icon, index }) => {

  return (

    <WalletButton.Custom wallet={id}>
      {({ ready, mounted, connected, loading, connect, connector }) => {
        return (
          <Button
            variant={"custom"}
            size={"custom"}
            className={styles.button}
            disabled={!mounted}
            onClick={() => {
              if(connected) {
                connector.disconnect();
              }
              else {
                connect();
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
                  ready && styles.highlight,
                )}
              >
                {connected ? "Disconnect" : (
                  loading ? "Connecting..." : (
                    mounted ? "Connect" : "Not detected"
                  ))}
              </span>
            </Text>
          </Button>
        );
      }}
    </WalletButton.Custom>
  );
};
