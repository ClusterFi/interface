import * as React from "react";

import { Section, Table } from "@/components";
import {
  UnauthorizedState,
  ComponentState,
  EmptyState,
  Title,
} from "@/layouts/dashboard/common";
import { BorrowItem } from "./BorrowItem";
import styles from "./Borrows.module.scss";
import { Currency } from "@/types";

type TAsset = {
  id: string;
  name: string;
  currency: Currency;
};

const assets: TAsset[] = [
  {
    id: "0",
    name: "weETH",
    currency: "WrappedEETH",
  }
];

type BorrowsProps = {
  state: ComponentState;
};

export const Borrows: React.FC<BorrowsProps> = ({ state }) => {
  return (
    <Section className={styles.base}>
      <Title text={"Borrows"} />
      {(() => {
        switch (state) {
          case "empty":
            return <EmptyState text={"There is no borrows yet."} />;
          case "unauthorized":
            return <UnauthorizedState />;
          default:
            return (
              <Table className={styles.table}>
                <Table.Head>
                  <Table.Row>
                    <Table.Item>Asset</Table.Item>
                    <Table.Item>Borrows</Table.Item>
                    <Table.Item>APY</Table.Item>
                    <Table.Item></Table.Item>
                  </Table.Row>
                </Table.Head>
                <Table.Body className={styles.body}>
                  {
                    assets.map(asset => {
                      return (
                        <BorrowItem
                          isLoading={state === "loading"}
                          currency={asset.currency}
                          name={asset.name}
                          key={asset.id}
                        />
                      )
                    })
                  }
                </Table.Body>
              </Table>
            );
        }
      })()}
    </Section>
  );
};
