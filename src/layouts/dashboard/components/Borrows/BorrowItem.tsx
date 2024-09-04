import * as React from "react";
import Link from "next/link";
import { Table } from "@/components";

import styles from "./Borrows.module.scss";
import { formatCoin, formatUSD } from "@/helpers";

type BorrowItemProps = {
  isLoading: boolean;
};

export const BorrowItem: React.FC<BorrowItemProps> = ({ isLoading }) => {
  return (
    <Table.Row className={styles.row}>
      <Table.ItemAsset
        currency={"USDCoin"}
        primaryText={"USDC"}
        isLoading={isLoading}
      />
      <Table.ItemAmount
        primaryValue={formatCoin(1540.05)}
        secondaryValue={"$" + formatUSD(1539.9)}
        isLoading={isLoading}
      />
      <Table.ItemAmount
        primaryValue={"0.54%"}
        secondaryValue={"2.04 %"}
        isReward
        isLoading={isLoading}
      />
      <Table.ItemArrow isLoading={isLoading} />
      <th className={styles.link}>
        <Link href={"/"} className={styles.link} />
      </th>
    </Table.Row>
  );
};
