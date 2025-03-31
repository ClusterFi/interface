import React from "react";
import styles from "./Stats.module.scss";
import { CurrencyIcon, Heading, Overview, Section, Text } from "@/components";

const content: {
  title: string;
  text: string;
}[] = [
  {
    text: "$154.57M",
    title: "Total Earning",
  },
  {
    text: "$51.16M",
    title: "Avaliable Liquidity",
  },
  {
    text: "$69,807.38",
    title: "Total Reserves",
  },
  {
    text: "$510.61M",
    title: "TVL",
  },
  {
    text: "$3,263.00",
    title: "Oracle Price",
  },
];
export const Stats: React.FC = () => {
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
