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
import { MAIN_CHAIN_ID } from "@/constants";
import { WalletButton } from "@rainbow-me/rainbowkit";

export type WalletBtnPros = {
  index: number;
} & WalletVariant;

export const EvmWalletBtn: React.FC<WalletBtnPros> = ({ id, name, icon, index }) => {

  const { connectors, connect } = useConnect();

  return (
    <WalletButton.Custom wallet={id}>
      {({ ready, connect }) => {
        return (
          <button
            type="button"
            disabled={!ready}
            onClick={connect}
          >
            Connect Rainbow
          </button>
        );
      }}
    </WalletButton.Custom>
  );
};
