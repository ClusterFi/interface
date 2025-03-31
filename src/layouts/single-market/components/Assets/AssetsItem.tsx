import * as React from "react";
import Link from "next/link";
import { Skeleton, Table, Text } from "@/components";
import { formatCoin, formatUSD } from "@/utils";

import styles from "./Assets.module.scss";
import { Currency } from "@/types";

type AssetsItemProps = {
  name: string;
  fullName: string;
  currency: Currency;
};

export const AssetsItem: React.FC<AssetsItemProps> = ({
  name,
  fullName,
  currency,
}) => {
  return (
    <Table.Row className={styles.row}>
      <Table.ItemAsset
        currency={currency}
        primaryText={fullName}
        secondaryText={name}
      />
      <Table.Item>$11.00M</Table.Item>
      <Table.Item>$0.00</Table.Item>
      <Table.Item>$2.835.02</Table.Item>
      <Table.Item>88%</Table.Item>
      <Table.Item>$0.00</Table.Item>
    </Table.Row>
  );
};
