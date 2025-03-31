"use client";

import * as React from "react";

import {
  Button,
  CurrencySelection,
  Heading,
  Section,
  Text,
  CustomInput,
} from "@/components";
import styles from "./Loans.module.scss";
import { formatCoin, formatUSD } from "@/utils";

export const Loans: React.FC = () => {
  const [value, setValue] = React.useState("");

  return (
    <Section className={styles.base}>
      <Heading className={styles.title} element="h3" as="h2">
        Borrow amount
      </Heading>
      <CustomInput
        className={styles.input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        values={{
          usd: Number(value) ? formatUSD(Number(value) * 1.2) : undefined,
          balance: 2.5413,
        }}
        title={"Total Amount"}
        fastOptions
        token={{
          icon: "WrappedStakedETH",
          name: "wstETH",
        }}
      />
      <Heading className={styles.subtitle} element="h3">
        Select chain
      </Heading>
      <Text size={14} theme={400} className={styles.text}>
        Pick what chain you want to takeout the loan on
      </Text>
      <CurrencySelection className={styles.select} variant={"default"} />
      <Button className={styles.submit} size={"large"} variant={"purple"}>
        <Text size={16} theme={500}>
          Approve and continue
        </Text>
      </Button>
      <div className={styles.rows}>
        <Text size={14} theme={500} className={styles.row}>
          Health Factor <span>1.2</span>
        </Text>
        <Text size={14} theme={500} className={styles.row}>
          Collateral Price <span>${formatUSD(2200)}</span>
        </Text>
        <Text size={14} theme={500} className={styles.row}>
          Liquidation Price <span>${formatUSD(1900)}</span>
        </Text>
        <Text size={14} theme={500} className={styles.row}>
          Available to Borrow <span>{formatCoin(1530)} wstETH</span>
        </Text>
      </div>
    </Section>
  );
};
