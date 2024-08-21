import * as React from "react";
import cx from "classnames";

import styles from "./ConnectWalletButton.module.scss";
import { AnimatedButton } from "@/components/shared";

type ConnectWalletButtonProps = {
  className?: string;
} & React.HTMLAttributes<HTMLButtonElement>;

export const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
  className,
  ...rest
}) => {
  return (
    <AnimatedButton
      className={cx(styles.base, className)}
      size={"default"}
      {...rest}
    >
      Connect wallet
    </AnimatedButton>
  );
};
