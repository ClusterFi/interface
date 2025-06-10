import React from "react";
import styles from "./Token.module.scss";
import { CurrencyIcon, Heading, Overview, Section } from "@/components";
import { useMarketData } from "../../SingleMarket";
import { formatCurrency } from "@/utils/formatters";
import { getChainById } from "@/constants";

export const Token: React.FC = () => {
  const { marketData, isLoading, chainId } = useMarketData();
  const chainInfo = chainId ? getChainById(chainId) : null;

  if (isLoading) {
    return (
      <Section className={styles.base}>
        <Heading element="h2" className={styles.heading}>
          <div className={styles.icon}>
            <CurrencyIcon width={40} height={40} currency={"USDC"} />
            <CurrencyIcon width={18} height={18} currency={chainInfo?.currency || "Ethereum"} />
          </div>
          Loading...
          <span>{chainInfo?.name || "Loading..."}</span>
        </Heading>
        <Overview
          state={"default"}
          content={[
            {
              title: "Total Collateral",
              content: "Loading...",
              color: "purple",
            },
            {
              title: "Total Borrowing",
              content: "Loading...",
              color: "green",
            },
          ]}
        />
      </Section>
    );
  }

  if (!marketData) {
    return (
      <Section className={styles.base}>
        <Heading element="h2" className={styles.heading}>
          <div className={styles.icon}>
            <CurrencyIcon width={40} height={40} currency={"USDC"} />
            <CurrencyIcon width={18} height={18} currency={chainInfo?.currency || "Ethereum"} />
          </div>
          No Market Selected
          <span>{chainInfo?.name || "Unknown"}</span>
        </Heading>
      </Section>
    );
  }

  return (
    <Section className={styles.base}>
      <Heading element="h2" className={styles.heading}>
        <div className={styles.icon}>
          <CurrencyIcon width={40} height={40} currency={"USDC"} />
          <CurrencyIcon width={18} height={18} currency={chainInfo?.currency || "Ethereum"} />
        </div>
        {marketData.symbol}
        <span>{chainInfo?.name || "Unknown Chain"}</span>
      </Heading>
      <Overview
        state={"default"}
        content={[
          {
            title: "Total Collateral",
            content: formatCurrency(marketData.totalCollateralUSD),
            color: "purple",
          },
          {
            title: "Total Borrowing",
            content: formatCurrency(marketData.totalBorrowUSD),
            color: "green",
          },
        ]}
      />
    </Section>
  );
};
