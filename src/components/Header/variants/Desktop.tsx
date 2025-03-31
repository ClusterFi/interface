import * as React from "react";
import cx from "classnames";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAccount } from "wagmi";

<<<<<<< Updated upstream
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
import { formatCoin, isSolanaChain, shortenAddress } from "@/utils";
import { useGlobalStore } from "@/utils/stores";
=======
import { Container, Text, Button, NetworkSelection, ConnectWalletButton, CurrencyIcon, Balance, ConnectedWallet, Logotype } from "@/components";
import { formatCoin } from "@/utils";
>>>>>>> Stashed changes
import { Nav } from "./Nav";
import { Status } from "./Status";

import styles from "./Header.module.scss";

type DesktopProps = {
<<<<<<< Updated upstream
  className?: string;
};

export const Desktop: React.FC<DesktopProps> = ({ className }) => {

  const { chainId } = useGlobalStore();
  const { publicKey: solAddr } = useWallet();
  const { address: ethAddr } = useAccount();

  const account = React.useMemo(() => {
    if (isSolanaChain(chainId)) {
      return solAddr?.toBase58();
    }
    else {
      return ethAddr;
    }
  }, [
    chainId,
    solAddr,
    ethAddr
  ])

  return (
    <header className={cx(styles.base, className)}>
      <Container className={styles.container}>
        <Logotype className={styles.logotype} />
        <Nav />
        <div className={styles.manage}>
          <NetworkSelection />
          {!account ? (
            <ConnectWalletButton />
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
                    {shortenAddress(account)}
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
=======
	className?: string;
	isAuthed: boolean;
};

export const Desktop: React.FC<DesktopProps> = ({ className, isAuthed }) => {
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
							<div className={styles.balance}>
								<Button className={styles.balanceButton} size={"medium"} variant={"gradient-dark"}>
									<Text size={12} theme={500}>
										<CurrencyIcon currency={"Cluster"} width={30} height={30} />
										{formatCoin(134.3478)}
									</Text>
								</Button>
								<Balance className={styles.balancePopup} />
							</div>
							<div className={styles.wallet}>
								<Button className={styles.walletButton} size={"medium"} variant={"stroke"}>
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
>>>>>>> Stashed changes
};
