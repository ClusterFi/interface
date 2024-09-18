"use client";

import * as React from "react";
import { ModalLayout } from "@/components/Modals/ModalLayout/ModalLayout";
import { ModalProps, ConnectedWallet, Balance } from "@/components";

import styles from "./Wallet.module.scss";
import { mediaBreaks, useMedia } from "@/utils";

export type WalletProps = null;

type Wallet = ModalProps & {
  props: WalletProps;
};

export const Wallet: React.FC<Wallet> = ({ props, ...rest }) => {
  const isMobile = useMedia(mediaBreaks.max.tablet);

  return (
    <ModalLayout
      title={"Wallet"}
      isSwipeable
      isTitleVisible={!isMobile}
      {...rest}
    >
      <div className={styles.content}>
        <ConnectedWallet
          className={styles.wallet}
          buttonsClassName={styles.buttons}
        />
        <Balance className={styles.balance} />
      </div>
    </ModalLayout>
  );
};
