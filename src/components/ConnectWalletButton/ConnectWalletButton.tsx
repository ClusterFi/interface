"use client";

import * as React from "react";
import cx from "classnames";

import styles from "./ConnectWalletButton.module.scss";
import { AnimatedButton } from "@/components/shared";
import { useModalsStore } from "@/utils/stores";
import { useWallet } from "@solana/wallet-adapter-react";
import { shortenAddress } from "@/utils";
import { useAccount } from "wagmi";

type ConnectWalletButtonProps = {
  className?: string;
  isSolana: boolean;
} & React.HTMLAttributes<HTMLButtonElement>;

export const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
  className,
  isSolana,
  ...rest
}) => {
  const { openModal } = useModalsStore();

  const { publicKey } = useWallet();
  const { address } = useAccount();

  const btnTitle = React.useMemo(() => {
    if (isSolana) {
      if (publicKey) {
        return shortenAddress(publicKey.toBase58());
      }
    }
    else {
      if (address) {
        return shortenAddress(address);
      }
    }

    return "Connect Wallet";
  }, [
    isSolana,
    publicKey,
    address
  ])

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
