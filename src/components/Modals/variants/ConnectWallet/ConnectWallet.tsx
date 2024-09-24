"use client";


import * as React from "react";
import cx from "classnames";
import { ModalLayout } from "@/components/Modals/ModalLayout/ModalLayout";
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
    id: "metaMask",
    icon: <WalletIcon wallet={"MetaMask"} width={24} height={24} />,
    name: "MetaMask",
  },
  {
    id: "phantom",
    icon: <WalletIcon wallet={"Phantom"} width={24} height={24} />,
    name: "Phantom",
  },
  {
    id: "walletConnect",
    icon: <WalletIcon wallet={"WalletConnect"} width={24} height={24} />,
    name: "WalletConnect",
  },
  {
    id: "coinbaseWalletSDK",
    icon: <WalletIcon wallet={"Coinbase"} width={24} height={24} />,
    name: "Coinbase Wallet",
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
  //     <Image src={"/backpack-wallet.png"} width={24} height={24} alt="icon" />
  //   ),
  //   name: "Backpack",
  // },
  {
    icon: (
      <Image src={"/solflare-wallet.png"} width={24} height={24} alt="icon" />
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

        {
          chainId == SOLANA_CHAIN_ID ? (
            SOL_WALLETS.map((wallet, index) =>
              <SolanaWalletBtn key={`solana-wallet-${wallet.name}`}
                index={index}
                {...wallet}
              />)
          )
            : (
              EVM_WALLETS.map((wallet, index) =>
                <EvmWalletBtn key={`evm-wallet-${wallet.name}`}
                  index={index}
                  {...wallet}
                />)
            )
        }

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
