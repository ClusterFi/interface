import React from "react";
import cx from "classnames";
import styles from "./Details.module.scss";
import { Button, Heading, Icon, Section, Text } from "@/components";

const content: {
  title: string;
  content: string;
}[] = [
  {
    title: "Token contract",
    content: "0x453b63484b11bbF0b61fC7E",
  },
  {
    title: "Asset oracle",
    content: "0x3437aE65ae0C2b80437E55c",
  },
  {
    title: "Supply cap",
    content: "20,000 MBTC",
  },
  {
    title: "Supply cap reached",
    content: "99.95%",
  },
  {
    title: "Borrow cap",
    content: "25,000 MBTC",
  },
  {
    title: "Borrow cap reached",
    content: "20.86%",
  },
  {
    title: "Collateral factor",
    content: "75%",
  },
];
export const Details: React.FC = () => {
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
