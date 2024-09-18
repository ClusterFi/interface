"use client";

import * as React from "react";
import cx from "classnames";

import { Text } from "@/components";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./Header.module.scss";

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

type NavProps = {
  onPageChange?: () => void;
};

export const Nav: React.FC<NavProps> = ({ onPageChange }) => {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      {navigation.map((link) => (
        <Link
          href={link.href}
          key={link.href}
          className={cx(styles.link, pathname === link.href && styles.isActive)}
          onClick={onPageChange?.() ?? undefined}
        >
          <Text size={14} theme={400}>
            {link.text}
          </Text>
        </Link>
      ))}
    </nav>
  );
};
