import React from "react";
import cx from "classnames";
import styles from "./Wallet.module.scss";
import { Button, Heading, Icon, Section, Text } from "@/components";

export const Wallet: React.FC = () => {
  return (
    <Section className={styles.base}>
      <div className={styles.balance}>
        <Text size={12} theme={500} className={styles.balanceTitle}>
          Wallet balance
        </Text>
        <Heading element="h3" className={styles.balanceText}>
          2.79304 <span>rETH</span>
        </Heading>
        <Section className={styles.balanceIcon}>
          <Icon glyph={"Wallet"} width={20} height={20} />
        </Section>
      </div>
      <div className={styles.info}>
        <Section className={styles.box}>
          <Text size={12} theme={500} className={styles.boxTitle}>
            Supplied
          </Text>
          <Heading element="h4" className={styles.boxText}>
            2.79304 <span>rETH</span>
          </Heading>
          <Text size={12} theme={400} className={styles.boxNote}>
            $5,764.03
          </Text>
        </Section>
        <Section className={styles.box}>
          <Text size={12} theme={500} className={styles.boxTitle}>
            Borrowed
          </Text>
          <Heading element="h4" className={styles.boxText}>
            0.00 <span>rETH</span>
          </Heading>
          <Text size={12} theme={400} className={styles.boxNote}>
            $0
          </Text>
        </Section>
      </div>
    </Section>
  );
};
