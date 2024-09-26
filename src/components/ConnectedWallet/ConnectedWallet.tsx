import * as React from "react";
import cx from "classnames";
import { Button, Icon, Section, Text, WalletIcon } from "@/components/shared";
import Link from "next/link";
import styles from "./ConnectedWallet.module.scss";
import { useGlobalStore, useModalsStore } from "@/utils/stores";
import { useAccount, useConnect, useConnectors, useDisconnect } from "wagmi";
import { useWallet } from "@solana/wallet-adapter-react";
import { isSolanaChain, shortenAddress } from "@/utils";
import { AppContext } from "@/contexts/AppContext";
import Image from "next/image";

type ConnectedWalletProps = {
  className?: string;
  buttonsClassName?: string;
};

export const ConnectedWallet: React.FC<ConnectedWalletProps> = ({
  className,
  buttonsClassName,
}) => {
  const { openModal } = useModalsStore();
  const { account, isSolana } = React.useContext(AppContext);

  const { wallet: solWallet, disconnect: disconnectSol } = useWallet();
  const { connectors } = useConnect();
  const { disconnect: disconnectEvm } = useDisconnect();

  const handleToggleWallet = () => {
    openModal("ConnectWallet", null);
  }

  const handleDisconnect = () => {
    if (isSolana) {
      disconnectSol();
    }
    else {
      disconnectEvm();
    }
  }

  return (
    <Section className={cx(styles.base, className)}>
      <Text size={12} theme={500} className={styles.wallet}>
        Connected wallet
        <Link href={"/"} target={"_blank"} className={styles.link}>
          View in Explorer <Icon glyph={"Share"} width={12} height={12} />
        </Link>
      </Text>
      <Text size={14} theme={400} className={styles.row}>
        {
          isSolana ? <img src={solWallet?.adapter.icon ?? ""} alt={solWallet?.adapter.name} className={styles.walletBtn} />
            : <WalletIcon wallet={"MetaMask"} width={16} height={16} />
        }
        {shortenAddress(account)}
        <Button size={"custom"} variant={"custom"} className={styles.copy}>
          <Icon glyph={"Copy"} width={12} height={12} />
        </Button>
      </Text>
      <div className={cx(styles.buttons, buttonsClassName)}>
        <Button size={"small"} variant={"stroke"} className={styles.button}
          onClick={handleToggleWallet}>
          <Text size={12} theme={600}>
            Change Wallet
          </Text>
        </Button>
        <Button size={"small"} variant={"stroke"} className={styles.button}
          onClick={handleDisconnect}>
          <Text size={12} theme={600}>
            Disconnect Wallet
          </Text>
        </Button>
      </div>
    </Section>
  );
};
