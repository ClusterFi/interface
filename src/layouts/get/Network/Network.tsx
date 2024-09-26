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
import { NetworkItem } from "./NetworkItem";
import styles from "./Network.module.scss";

type NetworkProps = {
  currency: Currency;
  name: string;
  isLoading: boolean;
};

type TMarket = {
  id: string;
  name: string;
  fullName: string;
  currency: Currency;
};

const ethMarkets: TMarket[] = [
  {
    id: "0",
    name: "rETH",
    fullName: "Rocket Pool ETH",
    currency: "RocketPoolETH",
  },
  {
    id: "1",
    name: "weETH",
    fullName: "Wrapped eETH",
    currency: "WrappedEETH",
  }
];

const solMarkets: TMarket[] = [
  {
    id: "0",
    name: "JitoSOL",
    fullName: "Jito Staked SOL",
    currency: "JITOStakedSOL",
  },
  {
    id: "1",
    name: "mSOL",
    fullName: "Marinade staked SOL",
    currency: "MarinadeStakedSOL",
  }
];

export const Network: React.FC<NetworkProps> = ({
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
            <Table.Item>LSDs</Table.Item>
            <Table.Item>My Balance</Table.Item>
            <Table.Item>Total Supply, $</Table.Item>
            <Table.Item>Price, $</Table.Item>
            <Table.Item></Table.Item>
          </Table.Row>
        </Table.Head>
        <Table.Body className={styles.body}>
          {
            currency == "Ethereum" ?
            ethMarkets.map(market => {
              return (
                <NetworkItem
                  isLoading={isLoading}
                  currency={market.currency}
                  name={market.name}
                  fullName={market.fullName}
                  key={market.id}
                />
              )
            }) :
            solMarkets.map(market => {
              return (
                <NetworkItem
                  isLoading={isLoading}
                  currency={market.currency}
                  name={market.name}
                  fullName={market.fullName}
                  key={market.id}
                />
              )
            })
          }
        </Table.Body>
      </Table>
    </Section>
  );
};
