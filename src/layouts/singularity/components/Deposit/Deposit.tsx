import * as React from "react";

import { Table } from "@/components";
import { DepositItem } from "./DepositItem";
import styles from "./Deposit.module.scss";

type DepositProps = {
  isLoading: boolean;
};

export const Deposit: React.FC<DepositProps> = ({ isLoading }) => {
  return (
    <Table className={styles.base}>
      <Table.Head>
        <Table.Row>
          <Table.Item>Staking Assets</Table.Item>
          <Table.Item>Network</Table.Item>
          <Table.Item>TVL</Table.Item>
          <Table.Item>Earn</Table.Item>
          <Table.Item>APR</Table.Item>
          <Table.Item></Table.Item>
        </Table.Row>
      </Table.Head>
      <Table.Body className={styles.body}>
        {Array.from({ length: 2 }).map((_, index) => (
          <DepositItem isLoading={isLoading} key={index} />
        ))}
      </Table.Body>
    </Table>
  );
};
