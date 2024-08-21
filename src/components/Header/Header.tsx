"use client";

import * as React from "react";
import cx from "classnames";

import {
  Logotype,
  Container,
  Text,
  Button,
  Icon,
  ConnectWalletButton,
  NetworkSelection,
} from "@/components";

import styles from "./Header.module.scss";
import { usePathname } from "next/navigation";
import Link from "next/link";

type HeaderProps = {
  className?: string;
};

const navigation: {
  text: string;
  href: string;
}[] = [
  {
    text: "Dashboard",
    href: "/",
  },
  {
    text: "Markets",
    href: "/markets",
  },
  {
    text: "Cross-Chain Loans",
    href: "/loans",
  },
  {
    text: "Singularity",
    href: "/singularity",
  },
  {
    text: "Get LSDs",
    href: "/get",
  },
];

const Header = ({ className }: HeaderProps) => {
  const [isAuthed, setIsAuthed] = React.useState(false);
  const pathname = usePathname();

  return (
    <header className={cx(styles.base, className)}>
      <Container className={styles.container}>
        <Logotype className={styles.logotype} />
        <nav className={styles.nav}>
          {navigation.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className={cx(
                styles.link,
                pathname === link.href && styles.isActive,
              )}
            >
              <Text size={14} theme={400}>
                {link.text}
              </Text>
            </Link>
          ))}
        </nav>
        <div className={styles.manage}>
          <NetworkSelection />
          {!isAuthed ? (
            <ConnectWalletButton onClick={() => setIsAuthed(true)} />
          ) : (
            <React.Fragment>
              <Button
                className={styles.balance}
                size={"medium"}
                variant={"gradient-dark"}
              >
                <Text size={12} theme={500}>
                  <Icon glyph={"Cluster"} width={30} height={30} />
                  134.34780
                </Text>
              </Button>
              <Button
                className={styles.wallet}
                size={"medium"}
                variant={"stroke"}
              >
                <Text size={14} theme={600}>
                  0x6fdfr...680a
                </Text>
              </Button>
            </React.Fragment>
          )}
        </div>
      </Container>
    </header>
  );
};

export { Header };
