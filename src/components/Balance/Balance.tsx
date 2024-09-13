import * as React from "react";
import cx from "classnames";
import { Currency, CurrencyIcon, Section, Text } from "@/components/shared";
import { formatCoin } from "@/utils";
import styles from "./Balance.module.scss";

const tokens: {
  currency: Currency;
  name: string;
  balance: number;
}[] = [
  {
    currency: "Ethereum",
    name: "Ethereum",
    balance: 8100.3456,
  },
  {
    currency: "Solana",
    name: "Solana",
    balance: 2145.0,
  },
];

type BalanceProps = {
  className?: string;
};

export const Balance: React.FC<BalanceProps> = ({ className }) => {
  return (
    <Section className={cx(styles.base, className)}>
      <Text size={14} theme={500} className={cx(styles.token, styles.main)}>
        <CurrencyIcon currency={"Cluster"} width={20} height={20} />
        Total CLR
        <span>{formatCoin(10245.3456)}</span>
      </Text>
      <div className={styles.list}>
        {tokens.map((token) => (
          <Text size={12} theme={400} className={styles.token} key={token.name}>
            <CurrencyIcon currency={token.currency} width={20} height={20} />
            {token.name}
            <span>{formatCoin(token.balance)}</span>
          </Text>
        ))}
      </div>
    </Section>
  );
};
