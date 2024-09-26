import * as React from "react";

import { Currency, Section, Table } from "@/components";
import {
  UnauthorizedState,
  EmptyState,
  ComponentState,
  Title,
} from "@/layouts/dashboard/common";
import { DepositItem } from "./DepositItem";

import styles from "./Deposits.module.scss";

type TAsset = {
  id: string;
  name: string;
  currency: Currency;
};

const assets: TAsset[] = [
  {
    id: "0",
    name: "rETH",
    currency: "RocketPoolETH",
  }
];

type DepositsProps = {
  state: ComponentState;
};

export const Deposits: React.FC<DepositsProps> = ({ state }) => {
  return (
    <Section className={styles.base}>
      <Title text={"Deposits"} />
      {(() => {
        switch (state) {
          case "empty":
            return <EmptyState text={"There is no deposits yet."} />;
          case "unauthorized":
            return <UnauthorizedState />;
          default:
            return (
              <Table className={styles.table}>
                <Table.Head>
                  <Table.Row>
                    <Table.Item>Asset</Table.Item>
                    <Table.Item>Deposits</Table.Item>
                    <Table.Item>APY</Table.Item>
                    <Table.Item>Collateral</Table.Item>
                    <Table.Item></Table.Item>
                  </Table.Row>
                </Table.Head>
                <Table.Body className={styles.body}>
                  {assets.map(asset => {
                    return (
                      <DepositItem
                        isLoading={state === "loading"}
                        currency={asset.currency}
                        name={asset.name}
                        key={asset.id}
                      />
                    )
                  })}
                </Table.Body>
              </Table>
            );
        }
      })()}
    </Section>
  );
};
