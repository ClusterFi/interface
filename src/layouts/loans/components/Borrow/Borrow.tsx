import * as React from "react";

import { Heading, Section, Text, Button, CurrencyIcon } from "@/components";
import styles from "./Borrow.module.scss";
import { formatCoin, formatUSD } from "@/helpers";

export const Borrow: React.FC = () => {
  return (
    <Section className={styles.base}>
      <Heading className={styles.title} element="h3" as="h2">
        Wallet for the loan
      </Heading>
      <Text size={12} theme={400} className={styles.subtitle}>
        Please review your transaction details to ensure their accuracy before
        submitting.
      </Text>
      <Text size={14} theme={400} className={styles.label}>
        Your borrow
      </Text>
      <div className={styles.amount}>
        <div className={styles.value}>
          <Heading element="h3" as="div" className={styles.coins}>
            {formatCoin(1.213)}
          </Heading>
          <Text size={12} theme={400} className={styles.usd}>
            ${formatUSD(3443.34)}
          </Text>
        </div>
        <Text size={16} theme={500} className={styles.coin}>
          <CurrencyIcon width={23} height={23} currency={"USDTether"} /> USDT
        </Text>
      </div>
      <div className={styles.rows}>
        <Text size={14} theme={500} className={styles.row}>
          Gas fee <span>{formatUSD(0.05)}$</span>
        </Text>
      </div>
      <div className={styles.buttons}>
        <Button className={styles.button} size={"large"} variant={"purple"}>
          Borrow
        </Button>
        <Button className={styles.button} size={"large"} variant={"stroke"}>
          Back
        </Button>
      </div>
      <div className={styles.rows}>
        <Heading element="h4" as="div" className={styles.heading}>
          Position Summary
        </Heading>
        <Text size={14} theme={500} className={styles.row}>
          Collateral Value <span>{formatCoin(1250)} USDT</span>
        </Text>
        <Text size={14} theme={500} className={styles.row}>
          Liquidation Point <span>{formatCoin(0.0)} USDT</span>
        </Text>
        <Text size={14} theme={500} className={styles.row}>
          Borrow Capacity <span>{formatCoin(1050.0432)} USDT</span>
        </Text>
        <Text size={14} theme={500} className={styles.row}>
          Available to Borrow <span>{formatCoin(1050.0432)} USDT</span>
        </Text>
      </div>
      <div className={styles.rows}>
        <Heading element="h4" as="div" className={styles.heading}>
          Details
        </Heading>
        <Text size={14} theme={500} className={styles.row}>
          Chain
          <span>
            <CurrencyIcon currency={"Ethereum"} width={18} height={18} />
            Ethereum mainnet
          </span>
        </Text>
        <Text size={14} theme={500} className={styles.row}>
          Wallet address <span>1A1zP1eP...ivfNa</span>
        </Text>
      </div>
    </Section>
  );
};
