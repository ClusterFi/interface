import React from "react";
import styles from "./Stats.module.scss";
import { CurrencyIcon, Heading, Overview, Section, Text } from "@/components";
import { useMarketData } from "../../SingleMarket";
import { formatCurrency } from "@/utils/formatters";

export const Stats: React.FC = () => {
  const { marketData, isLoading } = useMarketData();

  // If no market data, show loading or default state
  if (isLoading) {
    return (
      <Section className={styles.base}>
        <Heading element="h4" className={styles.heading}>
          Market Stats
        </Heading>
        <div className={styles.list}>
          {Array.from({ length: 5 }, (_, index) => (
            <div className={styles.item} key={index}>
              <Text size={12} theme={400} className={styles.subtitle}>
                Loading...
              </Text>
              <Heading element="h4" className={styles.text}>
                —
              </Heading>
            </div>
          ))}
        </div>
      </Section>
    );
  }

  if (!marketData) {
    return (
      <Section className={styles.base}>
        <Heading element="h4" className={styles.heading}>
          Market Stats
        </Heading>
        <div className={styles.list}>
          <div className={styles.item}>
            <Text size={12} theme={400} className={styles.subtitle}>
              No Market Selected
            </Text>
            <Heading element="h4" className={styles.text}>
              —
            </Heading>
          </div>
        </div>
      </Section>
    );
  }

  // Calculate available liquidity (cash)
  const availableLiquidity = Number(marketData.cash) / 10 ** marketData.underlyingDecimals;
  
  // Calculate total reserves (this would need additional contract data, using 0 for now)
  const totalReserves = 0; // Would need reserves data from contract
  
  const content = [
    {
      text: formatCurrency(marketData.totalSupplyUSD),
      title: "Total Supply",
  },
  {
      text: formatCurrency(availableLiquidity),
      title: "Available Liquidity",
  },
  {
      text: formatCurrency(totalReserves),
    title: "Total Reserves",
  },
  {
      text: formatCurrency(marketData.totalSupplyUSD), // TVL = Total Supply for this market
    title: "TVL",
  },
  {
      text: formatCurrency(marketData.underlyingPriceUSD),
    title: "Oracle Price",
  },
];

  return (
    <Section className={styles.base}>
      <Heading element="h4" className={styles.heading}>
        Market Stats
      </Heading>
      <div className={styles.list}>
        {content.map((item, index) => (
          <div className={styles.item} key={index}>
            <Text size={12} theme={400} className={styles.subtitle}>
              {item.title}
            </Text>
            <Heading element="h4" className={styles.text}>
              {item.text}
            </Heading>
          </div>
        ))}
      </div>
    </Section>
  );
};
