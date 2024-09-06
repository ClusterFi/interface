import * as React from "react";

import {
  Glyph,
  Heading,
  Section,
  Table,
  Icon,
  Currency,
  CurrencyIcon,
} from "@/components";
import { MarketItem } from "./MarketItem";
import styles from "./Market.module.scss";

type MarketProps = {
  currency: Currency;
  name: string;
  isLoading: boolean;
};

export const Market: React.FC<MarketProps> = ({
  currency,
  name,
  isLoading,
}) => {
  return (
    <Section className={styles.base}>
      <Heading element="h4" as={"h2"} className={styles.title}>
        <CurrencyIcon currency={currency} width={20} height={20} />
        {name}
      </Heading>
      <Table className={styles.table}>
        <Table.Head>
          <Table.Row>
            <Table.Item>Markets</Table.Item>
            <Table.Item>Total Supply</Table.Item>
            <Table.Item>Total Borrow</Table.Item>
            <Table.Item>Supply APY</Table.Item>
            <Table.Item>Borrow APY</Table.Item>
            <Table.Item></Table.Item>
          </Table.Row>
        </Table.Head>
        <Table.Body className={styles.body}>
          {Array.from({ length: 3 }).map((_, index) => (
            <MarketItem isLoading={isLoading} key={index} />
          ))}
        </Table.Body>
      </Table>
    </Section>
  );
};
