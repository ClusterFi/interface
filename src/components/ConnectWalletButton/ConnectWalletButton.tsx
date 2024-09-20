"use client";

import * as React from "react";
import cx from "classnames";

import styles from "./ConnectWalletButton.module.scss";
import { AnimatedButton } from "@/components/shared";
import { useModalsStore } from "@/utils/stores";
import { useWallet } from "@solana/wallet-adapter-react";
import { shortenAddress } from "@/utils";

type ConnectWalletButtonProps = {
  className?: string;
} & React.HTMLAttributes<HTMLButtonElement>;

export const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
  className,
  ...rest
}) => {
  const { openModal } = useModalsStore();

  const { publicKey } = useWallet();

  return (
    <AnimatedButton
      className={cx(styles.base, className)}
      size={"default"}
      onClick={() => openModal("ConnectWallet", null)}
      {...rest}
    >
      {
        publicKey ? shortenAddress(publicKey.toBase58()) : "Connect wallet"
      }
    </AnimatedButton>
  );
};
