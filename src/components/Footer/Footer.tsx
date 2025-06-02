import * as React from "react";
import cx from "classnames";

import { Container, Text, Logotype } from "@/components/shared";

import styles from "./Footer.module.scss";
import Link from "next/link";

type FooterProps = {
  className?: string;
};

const links: {
  text: string;
  href: string;
}[] = [
  {
    text: "Privacy policy",
    href: "https://cluster.gitbook.io/docs/library/legal-disclaimer",
  },
  {
    text: "Term of Use",
    href: "https://cluster.gitbook.io/docs/library/legal-disclaimer",
  },
  {
    text: "Contact",
    href: "mailto:Clust3rlabs@gmail.com",
  },
];

const Footer = ({ className }: FooterProps) => {
  return (
    <footer className={cx(styles.base, className)}>
      <Container className={styles.container}>
        <Logotype className={styles.logotype} />
        <nav className={styles.nav}>
          {links.map((link) => (
            <Link href={link.href} key={link.text} className={styles.link}>
              <Text size={14} theme={400} className={styles.text}>
                {link.text}
              </Text>
            </Link>
          ))}
        </nav>
      </Container>
    </footer>
  );
};

export { Footer };
