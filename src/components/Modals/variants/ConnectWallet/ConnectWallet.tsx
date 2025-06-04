"use client";

import * as React from "react";
import cx from "classnames";
import { ModalLayout } from "@/components/Modals/ModalLayout/ModalLayout";
import { Connector, useConnect } from "wagmi";
import {
  ModalProps,
  WalletIcon,
  Heading,
  Button,
  Icon,
  Text,
  CurrencyIcon,
} from "@/components";
import Link from "next/link";
import styles from "./ConnectWallet.module.scss";
import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletReadyState } from "@solana/wallet-adapter-base";
import { SolanaWalletBtn } from "./SolanaWalletBtn";
import { EvmWalletBtn } from "./EvmWalletBtn";
import { useGlobalStore } from "@/utils/stores";
import { SOLANA_CHAIN_ID } from "@/constants";

export type ConnectWalletProps = null;

type ConnectWallet = ModalProps & {
  props: ConnectWalletProps;
};

export type WalletVariant = {
  icon: React.ReactNode;
  id?: string;
  name: string;
};

const EVM_WALLETS: WalletVariant[] = [
  {
    id: "metamask",
    icon: <WalletIcon wallet={"MetaMask"} width={24} height={24} />,
    name: "MetaMask",
  },
  {
    id: "coinbase",
    icon: <WalletIcon wallet={"Coinbase"} width={24} height={24} />,
    name: "Coinbase",
  },
  {
    id: "walletConnect",
    icon: <WalletIcon wallet={"WalletConnect"} width={24} height={24} />,
    name: "WalletConnect",
  },
  {
    id: "trust",
    icon: (
      <Image
        src={"/images/wallet-trust.svg"}
        width={24}
        height={24}
        alt="icon"
      />
    ),
    name: "Trust Wallet",
  },
  {
    id: "gate",
    icon: (
      <Image
        src={"/images/wallet-gate.png"}
        width={24}
        height={24}
        alt="icon"
      />
    ),
    name: "Gate Wallet",
  },
  {
    id: "ledger",
    icon: <WalletIcon wallet={"Ledger"} width={24} height={24} />,
    name: "Ledger",
  },
];

const SOL_WALLETS: WalletVariant[] = [
  {
    icon: <WalletIcon wallet={"Phantom"} width={24} height={24} />,
    name: "Phantom",
  },
  // {
  //   icon: <WalletIcon wallet={"PontemWallet"} width={24} height={24} />,
  //   name: "Pontem Wallet",
  // },
  {
    icon: <WalletIcon wallet={"MetaMask"} width={24} height={24} />,
    name: "MetaMask",
  },
  // {
  //   icon: (
  //     <Image src={"/images/wallet-backpack.png"} width={24} height={24} alt="icon" />
  //   ),
  //   name: "Backpack",
  // },
  {
    icon: (
      <Image
        src={"/images/wallet-solflare.png"}
        width={24}
        height={24}
        alt="icon"
      />
    ),
    name: "Solflare",
  },
  {
    icon: <WalletIcon wallet={"Ledger"} width={24} height={24} />,
    name: "Ledger",
  },
];

export const ConnectWallet: React.FC<ConnectWallet> = ({ props, ...rest }) => {
  const { chainId } = useGlobalStore();
  const { connectors, connect } = useConnect();

  return (
    <ModalLayout title={"Connect Wallet"} isSwipeable {...rest}>
      <div className={styles.content}>
        <React.Fragment>
          <Heading element="h3" as="div" className={styles.title}>
            Connect Wallet
          </Heading>
          <Text size={12} theme={400} className={styles.subtitle}>
            To start using Cluster
          </Text>
        </React.Fragment>
        <div className="flex flex-col items-center justify-center gap-5">
          {connectors.map((connector: Connector) => (
            <button
              key={connector.id}
              onClick={() => connect({ connector })}
              className="flex items-center justify-center w-full max-w-xs px-4 py-3 space-x-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {connector.icon && (
                <div className="w-6 h-6 flex items-center gap-2">
                  <img
                    src={connector.icon}
                    alt={`${connector.name} icon`}
                    width={24}
                    height={24}
                  />
                </div>
              )}
              <span className="text-sm font-medium">{connector.name}</span>
            </button>
          ))}
        </div>

        <Text size={12} theme={400} className={styles.note}>
          By connecting I accept Cluster’s{" "}
          <Link target={"_blank"} href="#">
            Terms of Service
          </Link>
        </Text>
      </div>
    </ModalLayout>
  );
};
