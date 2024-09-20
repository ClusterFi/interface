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
    icon: (
      <Image src={"/metamask-and-more.png"} width={24} height={24} alt="icon" />
    ),
    name: "Metamask and more",
  },
  {
    icon: <WalletIcon wallet={"Ledger"} width={24} height={24} />,
    name: "Ledger",
  },
  {
    icon: <WalletIcon wallet={"WalletConnect"} width={24} height={24} />,
    name: "WalletConnect",
  },
  {
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
  {
    icon: (
      <Image src={"/backpack-wallet.png"} width={24} height={24} alt="icon" />
    ),
    name: "Backpack",
  },
  {
    icon: (
      <Image src={"/solflare-wallet.png"} width={24} height={24} alt="icon" />
    ),
    name: "Solflare",
  },
  {
    icon: <Image src={"/brave-wallet.png"} width={24} height={24} alt="icon" />,
    name: "Brave",
  },
];

export const ConnectWallet: React.FC<ConnectWallet> = ({ props, ...rest }) => {
  const [solanaOpened, setSolanaOpened] = React.useState(false);

  return (
    <ModalLayout title={"Connect Wallet"} isSwipeable {...rest}>
      <div className={styles.content}>
        {solanaOpened ? (
          <Heading
            element="h3"
            as="div"
            className={cx(styles.title, styles.next)}
          >
            <Button
              onClick={() => setSolanaOpened(false)}
              size="custom"
              variant={"custom"}
              className={styles.back}
            >
              <Icon glyph={"Arrow"} width={24} height={24} />
            </Button>
            Solana wallet
          </Heading>
        ) : (
          <React.Fragment>
            <Heading element="h3" as="div" className={styles.title}>
              Connect Wallet
            </Heading>
            <Text size={12} theme={400} className={styles.subtitle}>
              To start using Cluster
            </Text>
            <Button
              onClick={() => setSolanaOpened(true)}
              variant={"custom"}
              size={"custom"}
              className={cx(styles.button, styles.solana)}
            >
              <Text size={16} theme={500} className={styles.wallet}>
                <CurrencyIcon currency={"Solana"} width={24} height={24} />
                Solana wallet
                <Icon
                  glyph={"Arrow"}
                  width={24}
                  height={24}
                  className={styles.arrow}
                />
              </Text>
            </Button>
          </React.Fragment>
        )}

        {
          solanaOpened ? (
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
