import * as React from "react";
import { ModalLayout } from "@/components/Modals/ModalLayout/ModalLayout";
import { Button, Text, ModalProps, Icon } from "@/components";
import styles from "./SwitchWallet.module.scss";

export type SwitchWalletProps = null;

type SwitchWallet = ModalProps & {
  props: SwitchWalletProps;
};

export const SwitchWallet: React.FC<SwitchWallet> = ({ props, ...rest }) => {
  return (
    <ModalLayout title={"Switch Wallet"} isSwipeable {...rest}>
      <div className={styles.content}>
        <Icon
          className={styles.icon}
          glyph={"SwitchWallet"}
          width={67}
          height={65}
        />
        <Text size={14} theme={400} className={styles.text}>
          You need to switch to the Solana <br /> network in your wallet to
          continue
        </Text>
        <Button size={"large"} variant={"purple"} className={styles.button}>
          Change network
        </Button>
      </div>
    </ModalLayout>
  );
};
