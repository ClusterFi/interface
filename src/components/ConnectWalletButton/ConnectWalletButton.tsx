"use client";

import * as React from "react";
import cx from "classnames";

import styles from "./ConnectWalletButton.module.scss";
import { AnimatedButton } from "@/components/shared";
import { useGlobalStore, useModalsStore } from "@/utils/stores";
import { useWallet } from "@solana/wallet-adapter-react";
import { shortenAddress } from "@/utils";
import { useAccount } from "wagmi";
import { SOLANA_CHAIN_ID } from "@/constants";
import { ConnectButton } from "@rainbow-me/rainbowkit";

type ConnectWalletButtonProps = {
  className?: string;
} & React.HTMLAttributes<HTMLButtonElement>;

export const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
  className,
  ...rest
}) => {
  const { chainId } = useGlobalStore();
  const { openModal } = useModalsStore();

  const { publicKey } = useWallet();
  const { address } = useAccount();

  const isSolana = React.useMemo(() => {
    return chainId === SOLANA_CHAIN_ID;
  }, [chainId]);

  const btnTitle = React.useMemo(() => {
    if (isSolana && publicKey) {
      return shortenAddress(publicKey.toBase58());
    }
    if (!isSolana && address) {
      return shortenAddress(address);
    }
    return "Connect Wallet";
  }, [isSolana, publicKey, address]);

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const connected = mounted && account && chain;

        return (
          <AnimatedButton
            className={cx(styles.base, className)}
            style={{ paddingInline: "3px" }}
            size="default"
            onClick={!connected ? openConnectModal : openAccountModal}
            {...rest}
          >
            {btnTitle}
          </AnimatedButton>
        );
      }}
    </ConnectButton.Custom>
  );
};
