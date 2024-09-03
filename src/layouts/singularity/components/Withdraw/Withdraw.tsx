import * as React from "react";

import { Table } from "@/components";
import { WithdrawItem } from "./WithdrawItem";
import styles from "./Withdraw.module.scss";

type WithdrawProps = {
  isLoading: boolean;
};

export const Withdraw: React.FC<WithdrawProps> = ({ isLoading }) => {
  return (
    <Table className={styles.base}>
      <Table.Head>
        <Table.Row>
          <Table.Item>Staking Assets</Table.Item>
          <Table.Item>Network</Table.Item>
          <Table.Item>Total Deposit, $</Table.Item>
          <Table.Item>Earned</Table.Item>
          <Table.Item></Table.Item>
        </Table.Row>
      </Table.Head>
      <Table.Body className={styles.body}>
        {Array.from({ length: 2 }).map((_, index) => (
          <WithdrawItem isLoading={isLoading} key={index} />
        ))}
      </Table.Body>
    </Table>
  );
};
