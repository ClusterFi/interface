import * as React from "react";
import cx from "classnames";

import {
  Container,
  Text,
  Button,
  NetworkSelection,
  ConnectWalletButton,
  CurrencyIcon,
  Balance,
  ConnectedWallet,
  Logotype,
} from "@/components";
import { formatCoin } from "@/utils";
import { Nav } from "./Nav";
import { Status } from "./Status";

import styles from "./Header.module.scss";
import { useOnClickOutside } from "usehooks-ts";

type DesktopProps = {
  className?: string;
};

export const Desktop: React.FC<DesktopProps> = ({ className }) => {
  const isAuthed = false;
  const balanceRef = React.useRef<HTMLDivElement>(null);
  const profileRef = React.useRef<HTMLDivElement>(null);
  const [balanceOpened, setBalanceOpened] = React.useState(false);
  const [profileOpened, setProfileOpened] = React.useState(false);

  useOnClickOutside(balanceRef, () => {
    setBalanceOpened(false);
  });

  useOnClickOutside(profileRef, () => {
    setProfileOpened(false);
  });

  return (
    <header className={cx(styles.base, className)}>
      <Container className={styles.container}>
        <Logotype className={styles.logotype} />
        <Nav />
        <div className={styles.manage}>
          <Status />
          <NetworkSelection />
          {!isAuthed ? (
            <ConnectWalletButton />
          ) : (
            <React.Fragment>
              <div ref={balanceRef} className={styles.balance}>
                <Button
                  className={styles.balanceButton}
                  size={"medium"}
                  variant={"gradient-dark"}
                  onClick={() => setBalanceOpened((prev) => !prev)}
                >
                  <Text size={12} theme={500}>
                    <CurrencyIcon currency={"Cluster"} width={30} height={30} />
                    {formatCoin(134.3478)}
                  </Text>
                </Button>
                <Balance
                  className={cx(
                    styles.balancePopup,
                    balanceOpened && styles.open
                  )}
                />
              </div>
              <div ref={profileRef} className={styles.wallet}>
                <Button
                  className={styles.walletButton}
                  size={"medium"}
                  variant={"stroke"}
                  onClick={() => setProfileOpened((prev) => !prev)}
                >
                  <Text size={14} theme={600}>
                    0x6fdfr...680a
                  </Text>
                </Button>
                <ConnectedWallet
                  className={cx(
                    styles.walletPopup,
                    profileOpened && styles.open
                  )}
                />
              </div>
            </React.Fragment>
          )}
        </div>
      </Container>
    </header>
  );
};
