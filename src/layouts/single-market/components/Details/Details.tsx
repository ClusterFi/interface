import React from "react";
import cx from "classnames";
import styles from "./Details.module.scss";
import { Button, Heading, Icon, Section, Text } from "@/components";
import { useMarketData } from "../../SingleMarket";
import { formatTokenAmount } from "@/utils/formatters";

export const Details: React.FC = () => {
  const { marketData, isLoading, chainId } = useMarketData();

  if (isLoading || !marketData) {
    return (
      <Section className={styles.base}>
        <Heading element="h4" className={styles.title}>
          Market Details
        </Heading>
        <Text size={14} theme={500} className={styles.row}>
          <span>Loading...</span>
          <span>...</span>
        </Text>
      </Section>
    );
  }

  const collateralFactor = Number(marketData.collateralFactorMantissa) / 1e18;
  const utilization = marketData.utilization;
  
  // Calculate available liquidity
  const availableLiquidity = Number(marketData.cash) / 10 ** marketData.underlyingDecimals;
  
  const content: {
    title: string;
    content: string;
  }[] = [
    {
      title: "Token contract",
      content: `${marketData.address.slice(0, 8)}...${marketData.address.slice(-6)}`,
    },
    {
      title: "Asset oracle",  
      content: "Oracle Integrated", 
    },
    {
      title: "Available Liquidity",
      content: `${formatTokenAmount(availableLiquidity, marketData.symbol)} ${marketData.symbol}`,
    },
    {
      title: "Utilization Rate",
      content: `${utilization.toFixed(2)}%`,
    },
    {
      title: "Total Supply",
      content: `${formatTokenAmount(marketData.totalSupplyUSD / marketData.underlyingPriceUSD, marketData.symbol)} ${marketData.symbol}`,
    },
    {
      title: "Total Borrows", 
      content: `${formatTokenAmount(marketData.totalBorrowUSD / marketData.underlyingPriceUSD, marketData.symbol)} ${marketData.symbol}`,
    },
    {
      title: "Collateral factor",
      content: `${(collateralFactor * 100).toFixed(0)}%`,
    },
  ];

  return (
    <Section className={styles.base}>
      <Heading element="h4" className={styles.title}>
        Market Details
      </Heading>
      {content.map((item, index) => (
        <Text key={index} size={14} theme={500} className={styles.row}>
          <span>{item.title}</span>
          <span>{item.content}</span>
        </Text>
      ))}
    </Section>
  );
};
