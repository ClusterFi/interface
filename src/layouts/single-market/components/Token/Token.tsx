import React from "react";
import styles from "./Token.module.scss";
import { CurrencyIcon, Heading, Overview, Section } from "@/components";

export const Token: React.FC = () => {
  return (
    <Section className={styles.base}>
      <Heading element="h2" className={styles.heading}>
        <div className={styles.icon}>
          <CurrencyIcon width={40} height={40} currency={"RocketPoolETH"} />
          <CurrencyIcon width={18} height={18} currency={"Ethereum"} />
        </div>
        rETH
        <span>Ethereum</span>
      </Heading>
      <Overview
        state={"default"}
        content={[
          {
            title: "Total Collateral",
            content: "$356.04M",
            color: "purple",
          },
          {
            title: "Total Borrowing",
            content: "$133.75M",
            color: "green",
          },
        ]}
      />
    </Section>
  );
};
