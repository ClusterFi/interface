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

export type ConnectWalletProps = null;

type ConnectWallet = ModalProps & {
  props: ConnectWalletProps;
};

type WalletVariant = {
  icon: React.ReactNode;
  name: string;
  isDetected: boolean;
};

const common_list: WalletVariant[] = [
  {
    icon: (
      <Image src={"/metamask-and-more.png"} width={24} height={24} alt="icon" />
    ),
    name: "Metamask and more",
    isDetected: true,
  },
  {
    icon: <WalletIcon wallet={"Ledger"} width={24} height={24} />,
    name: "Ledger",
    isDetected: false,
  },
  {
    icon: <WalletIcon wallet={"WalletConnect"} width={24} height={24} />,
    name: "WalletConnect",
    isDetected: false,
  },
  {
    icon: <WalletIcon wallet={"Coinbase"} width={24} height={24} />,
    name: "Coinbase Wallet",
    isDetected: true,
  },
];

const solana_list: WalletVariant[] = [
  {
    icon: <WalletIcon wallet={"Phantom"} width={24} height={24} />,
    name: "Phantom",
    isDetected: true,
  },
  {
    icon: <WalletIcon wallet={"PontemWallet"} width={24} height={24} />,
    name: "Pontem Wallet",
    isDetected: false,
  },
  {
    icon: <WalletIcon wallet={"MetaMask"} width={24} height={24} />,
    name: "MetaMask",
    isDetected: true,
  },
  {
    icon: (
      <Image src={"/backpack-wallet.png"} width={24} height={24} alt="icon" />
    ),
    name: "Backpack",
    isDetected: false,
  },
  {
    icon: (
      <Image src={"/solflare-wallet.png"} width={24} height={24} alt="icon" />
    ),
    name: "Solflare",
    isDetected: false,
  },
  {
    icon: <Image src={"/brave-wallet.png"} width={24} height={24} alt="icon" />,
    name: "Brave",
    isDetected: false,
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
        {(solanaOpened ? solana_list : common_list).map((wallet, index) => (
          <Button
            key={wallet.name}
            variant={"custom"}
            size={"custom"}
            className={styles.button}
          >
            <Text
              size={16}
              theme={500}
              className={styles.wallet}
              style={{ animationDelay: index * 50 + "ms" }}
            >
              {wallet.icon}
              {wallet.name}
              <span
                className={cx(
                  styles.status,
                  wallet.isDetected && styles.highlight,
                )}
              >
                {wallet.isDetected ? "Connect" : "Not Detected"}
              </span>
            </Text>
          </Button>
        ))}
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
