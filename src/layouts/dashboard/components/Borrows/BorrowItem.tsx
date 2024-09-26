import * as React from "react";
import Link from "next/link";
import { Currency, Table } from "@/components";

import styles from "./Borrows.module.scss";
import { formatCoin, formatUSD } from "@/utils";

type BorrowItemProps = {
  isLoading: boolean;
  currency: Currency;
  name: string;
};

export const BorrowItem: React.FC<BorrowItemProps> = ({ isLoading, currency, name }) => {
  return (
    <Table.Row className={styles.row}>
      <Table.ItemAsset
        currency={currency}
        primaryText={name}
        isLoading={isLoading}
      />
      <Table.ItemAmount
        primaryValue={formatCoin(1540.05)}
        secondaryValue={"$" + formatUSD(1539.9)}
        isLoading={isLoading}
        mobileTitle={"Borrows"}
      />
      <Table.ItemAmount
        primaryValue={"0.54%"}
        secondaryValue={"2.04 %"}
        isReward
        isLoading={isLoading}
        mobileTitle={"APY"}
      />
      <Table.ItemArrow isLoading={isLoading} />
      <th className={styles.link}>
        <Link href={"/"} className={styles.link} />
      </th>
    </Table.Row>
  );
};
