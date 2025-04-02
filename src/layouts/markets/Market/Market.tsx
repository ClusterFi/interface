import * as React from "react";

import { Heading, Section, Table, CurrencyIcon } from "@/components";
import { MarketItem } from "./MarketItem";
import styles from "./Market.module.scss";
import { Currency } from "@/types";
import { mediaBreaks, useMedia } from "@/utils";

type TMarket = {
  id: string;
  name: string;
  fullName: string;
  currency: Currency;
};

const mockedMarkets: TMarket[] = [
  {
    id: "0",
    name: "USDT",
    fullName: "Tether USDt",
    currency: "USDTether",
  },
  {
    id: "1",
    name: "weETH",
    fullName: "Wrapped eETH",
    currency: "WrappedEETH",
  },
  {
    id: "2",
    name: "USDT",
    fullName: "Tether USDt",
    currency: "USDTether",
  },
  {
    id: "3",
    name: "weETH",
    fullName: "Wrapped eETH",
    currency: "WrappedEETH",
  },
];

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
            <Table.Item>Market</Table.Item>
            <Table.Item>Utilization</Table.Item>
            <Table.Item>Net Earn APR</Table.Item>
            <Table.Item>Net Borrow APR</Table.Item>
            <Table.Item>Total Earning</Table.Item>
            <Table.Item>Total Borrowing</Table.Item>
            <Table.Item>Total Collateral</Table.Item>
            <Table.Item></Table.Item>
          </Table.Row>
        </Table.Head>
        <Table.Body className={styles.body}>
          {mockedMarkets.map((market) => {
            return (
              <MarketItem
                isLoading={isLoading}
                currency={market.currency}
                name={market.name}
                fullName={market.fullName}
                key={market.id}
              />
            );
          })}
        </Table.Body>
      </Table>
    </Section>
  );
};
