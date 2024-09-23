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

import styles from "./Header.module.scss";

type DesktopProps = {
  className?: string;
  isAuthed: boolean;
};

export const Desktop: React.FC<DesktopProps> = ({ className, isAuthed }) => {

  const [network, setNetwork] = React.useState("Ethereum");

  const handleSelectNetwork = (network: string) => {
    setNetwork(network);
  }

  return (
    <header className={cx(styles.base, className)}>
      <Container className={styles.container}>
        <Logotype className={styles.logotype} />
        <Nav />
        <div className={styles.manage}>
          <NetworkSelection
            onSelect={handleSelectNetwork} />
          {!isAuthed ? (
            <ConnectWalletButton isSolana={network == "Solana"} />
          ) : (
            <React.Fragment>
              <div className={styles.balance}>
                <Button
                  className={styles.balanceButton}
                  size={"medium"}
                  variant={"gradient-dark"}
                >
                  <Text size={12} theme={500}>
                    <CurrencyIcon currency={"Cluster"} width={30} height={30} />
                    {formatCoin(134.3478)}
                  </Text>
                </Button>
                <Balance className={styles.balancePopup} />
              </div>
              <div className={styles.wallet}>
                <Button
                  className={styles.walletButton}
                  size={"medium"}
                  variant={"stroke"}
                >
                  <Text size={14} theme={600}>
                    0x6fdfr...680a
                  </Text>
                </Button>
                <ConnectedWallet className={styles.walletPopup} />
              </div>
            </React.Fragment>
          )}
        </div>
      </Container>
    </header>
  );
};
