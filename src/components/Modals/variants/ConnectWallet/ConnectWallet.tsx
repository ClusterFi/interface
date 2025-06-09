"use client";

import * as React from "react";
import cx from "classnames";
import { ModalLayout } from "@/components/Modals/ModalLayout/ModalLayout";
import { Connector, useConnect, useAccount, useConnectors } from "wagmi";
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
import { useGlobalStore, useModalsStore } from "@/utils/stores";
import { SOLANA_CHAIN_ID } from "@/constants";
import { metaMask, walletConnect, injected, safe, coinbaseWallet } from 'wagmi/connectors';
import { AppContext } from "@/contexts/AppContext";
import { shortenAddress } from "@/utils";


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
  const { wallets } = useWallet();
  const { account, isSolana } = React.useContext(AppContext);
  const solWallet = wallets.find(w => w.adapter.name === (isSolana ? wallets[0]?.adapter?.name : undefined));
  const { connector: activeConnector } = useAccount();
  const connectors = useConnectors();
  const { closeModal } = useModalsStore();

  // Find the icon for the connected EVM wallet
  let evmIcon: React.ReactElement = <WalletIcon wallet={"MetaMask"} width={24} height={24} />;
  if (activeConnector) {
    let found: WalletVariant | undefined = undefined;
    if (activeConnector.id === 'injected') {
      // Try to detect Trust Wallet by provider or connector name
      const isTrust = typeof window !== 'undefined' &&
        (window.ethereum?.isTrust || (activeConnector.name && activeConnector.name.toLowerCase().includes('trust')));
      if (isTrust) {
        found = EVM_WALLETS.find(w => w.id === 'trust');
      } else {
        found = EVM_WALLETS.find(w => w.id === 'metaMask');
      }
    } else {
      found = EVM_WALLETS.find(w => w.id === activeConnector.id);
    }
    if (found && React.isValidElement(found.icon)) {
      evmIcon = found.icon as React.ReactElement;
    }
  }
  // 
// 
  // Auto-close modal on new connect (only when account changes from falsy to truthy)
  const prevAccountRef = React.useRef(account);
  React.useEffect(() => {
    if (!prevAccountRef.current && account) {
      closeModal();
    }
    prevAccountRef.current = account;
  }, [account, closeModal]);

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
        <div className="flex flex-col items-center justify-center gap-2 w-full">
          {/* Connected wallet at the top (only if connected) */}
          {account && (
            <div className={cx(styles.button, styles.solana)} style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
              {isSolana ? (
                <>
                  <img
                    src={solWallet?.adapter.icon ?? ''}
                    alt={solWallet?.adapter.name ?? ''}
                    style={{ width: 24, height: 24, borderRadius: 4, marginRight: 8 }}
                  />
                  <span style={{ fontWeight: 500 }}>{shortenAddress(account)}</span>
                  <span className={styles.status} style={{ marginLeft: 'auto', color: 'var(--text-secondary)' }}>Connected</span>
                </>
              ) : (
                <>
                  {evmIcon}
                  <span style={{ fontWeight: 500, marginLeft: 8 }}>{shortenAddress(account)}</span>
                  <span className={styles.status} style={{ marginLeft: 'auto', color: 'var(--text-secondary)' }}>Connected</span>
                </>
              )}
            </div>
          )}
          {/* Divider (only if connected) */}
          {account && <div style={{ width: '100%', borderBottom: '1px solid var(--stroke-grey)', margin: '16px 0' }} />}
          {/* EVM wallets */}
          {EVM_WALLETS.map((wallet, idx) => (
            <EvmWalletBtn key={wallet.id} {...wallet} index={idx} />
          ))}
        </div>
        <Text size={12} theme={400} className={styles.note}>
          By connecting I accept Cluster's{" "}
          <Link target={"_blank"} href="#">
            Terms of Service
          </Link>
        </Text>
      </div>
    </ModalLayout>
  );
};
