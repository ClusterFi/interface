import * as React from "react";
import Link from "next/link";
import { Table } from "@/components";

import styles from "./Borrows.module.scss";

type BorrowItemProps = {
  isLoading: boolean;
};

export const BorrowItem: React.FC<BorrowItemProps> = ({ isLoading }) => {
  return (
    <Table.Row className={styles.row}>
      <Table.ItemAsset
        icon={"USDC"}
        primaryText={"USDC"}
        isLoading={isLoading}
      />
      <Table.ItemAmount
        primaryValue={"1,540.05"}
        secondaryValue={"$1,539.90"}
        isLoading={isLoading}
      />
      <Table.ItemAmount
        primaryValue={"0.54%"}
        secondaryValue={"2.04 %"}
        isReward
        isLoading={isLoading}
      />
      <Table.ItemArrow isLoading={isLoading} />
      <Link href={"/"} className={styles.link} />
    </Table.Row>
  );
};
