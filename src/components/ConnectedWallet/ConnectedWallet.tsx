import * as React from "react";
import cx from "classnames";
import { Button, Icon, Section, Text, WalletIcon } from "@/components/shared";
import Link from "next/link";
import styles from "./ConnectedWallet.module.scss";

type ConnectedWalletProps = {
  className?: string;
  buttonsClassName?: string;
};

export const ConnectedWallet: React.FC<ConnectedWalletProps> = ({
  className,
  buttonsClassName,
}) => {
  return (
    <Section className={cx(styles.base, className)}>
      <Text size={12} theme={500} className={styles.wallet}>
        Connected wallet
        <Link href={"/"} target={"_blank"} className={styles.link}>
          View in Explorer <Icon glyph={"Share"} width={12} height={12} />
        </Link>
      </Text>
      <Text size={14} theme={400} className={styles.row}>
        <WalletIcon wallet={"MetaMask"} width={16} height={16} />
        0x6fdfr...680a
        <Button size={"custom"} variant={"custom"} className={styles.copy}>
          <Icon glyph={"Copy"} width={12} height={12} />
        </Button>
      </Text>
      <div className={cx(styles.buttons, buttonsClassName)}>
        <Button size={"small"} variant={"stroke"} className={styles.button}>
          <Text size={12} theme={600}>
            Change Wallet
          </Text>
        </Button>
        <Button size={"small"} variant={"stroke"} className={styles.button}>
          <Text size={12} theme={600}>
            Disconnect Wallet
          </Text>
        </Button>
      </div>
    </Section>
  );
};
