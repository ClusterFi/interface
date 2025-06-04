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
    return chainId == SOLANA_CHAIN_ID;
  }, [chainId]);

  const btnTitle = React.useMemo(() => {
    if (isSolana) {
      if (publicKey) {
        return shortenAddress(publicKey.toBase58());
      }
    } else {
      if (address) {
        return shortenAddress(address);
      }
    }

    return "Connect Wallet";
  }, [isSolana, publicKey, address]);

  return (
    <AnimatedButton
      className={cx(styles.base, className)}
      size={"default"}
      onClick={() => openModal("ConnectWallet", null)}
      {...rest}
    >
      {btnTitle}
    </AnimatedButton>
  );
};
