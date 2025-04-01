import * as React from "react";

import { Heading, Section, Table, CurrencyIcon } from "@/components";
import { Currency } from "@/types";
import { NetworkItem } from "./NetworkItem";
import styles from "./Network.module.scss";

type NetworkProps = {
  currency: Currency;
  name: string;
  isLoading: boolean;
};

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
          {Array.from({ length: 3 }).map((_, index) => (
            <NetworkItem isLoading={isLoading} key={index} />
          ))}
        </Table.Body>
      </Table>
    </Section>
  );
};
