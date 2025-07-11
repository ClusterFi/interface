"use client";

import * as React from "react";
import cx from "classnames";

import { Glyph, Icon, Text } from "@/components";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./Header.module.scss";

const navigation: {
  text: string;
  href: string;
  icon: Glyph;
  disabled?: boolean;
}[] = [
  {
    text: "Dashboard",
    href: "/",
    icon: "Dashboard",
  },
  {
    text: "Markets",
    href: "/markets",
    icon: "Markets",
  },
  {
    text: "Singularity (soon)",
    href: "/singularity",
    icon: "Singularity",
    disabled: true,
  },
  {
    text: "Swap (soon)",
    href: "/swap",
    icon: "Swap",
    disabled: true,
  },
  {
    text: "Docs",
    href: "https://cluster.gitbook.io/docs/overview/introducing-cluster",
    icon: "Search",
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
          className={cx(
            styles.link,
            pathname === link.href && styles.isActive,
            link.disabled && styles.disabled
          )}
          onClick={(e) => {
            if (link.disabled) {
              e.preventDefault();
              return;
            }
            onPageChange?.();
          }}
        >
          <Icon glyph={link.icon} width={16} height={16} />
          <Text size={14} theme={400}>
            {link.text}
          </Text>
        </Link>
      ))}
    </nav>
  );
};
