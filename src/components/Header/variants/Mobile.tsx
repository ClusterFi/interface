"use client";

import * as React from "react";
import cx from "classnames";

import {
  Container,
  NetworkSelection,
  Logotype,
  Button,
  Icon,
} from "@/components";
import { Nav } from "./Nav";

import styles from "./Header.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { useModalsStore } from "@/utils/stores";
import { usePathname } from "next/navigation";

type MobileProps = {
  className?: string;
  isAuthed: boolean;
};

export const Mobile: React.FC<MobileProps> = ({ className, isAuthed }) => {
  const [menuOpened, setMenuOpened] = React.useState(false);
  const { openModal } = useModalsStore();
  const pathname = usePathname();
  React.useEffect(() => {
    setMenuOpened(false);
  }, [pathname]);

  const onWalletClick = () => {
    if (isAuthed) {
      openModal("Wallet", null);
      return;
    }

    openModal("ConnectWallet", null);
  };

  const onBurgerClick = () => {
    setMenuOpened((prev) => !prev);
  };

  return (
    <React.Fragment>
      <header className={cx(styles.base, className)}>
        <Container className={styles.container}>
          <Logotype className={styles.logotype} />
          <div className={styles.manage}>
            <NetworkSelection />
            <Button
              className={styles.button}
              onClick={onWalletClick}
              size={"small"}
              variant={"gradient-dark"}
            >
              <Icon glyph={"Wallet"} width={16} height={16} />
              <span className={styles.notification} />
            </Button>
            <Button
              className={styles.button}
              onClick={onBurgerClick}
              size={"small"}
              variant={"gradient-dark"}
            >
              <Icon
                glyph={menuOpened ? "Cross" : "Burger"}
                width={16}
                height={16}
              />
            </Button>
          </div>
        </Container>
      </header>
      <AnimatePresence>
        {menuOpened && (
          <motion.div
            className={styles.menu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Container className={styles.menuContainer}>
              <Nav />
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </React.Fragment>
  );
};
