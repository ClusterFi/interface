import * as React from "react";
import Link from "next/link";
import { Skeleton, Table, Text } from "@/components";
import { formatCoin, formatUSD } from "@/helpers";

import styles from "./Market.module.scss";

type MarketItemProps = {
  isLoading: boolean;
};

export const MarketItem: React.FC<MarketItemProps> = ({ isLoading }) => {
  return (
    <Table.Row className={styles.row}>
      <Table.ItemAsset
        currency={"Ethereum"}
        primaryText={"Ethereum"}
        secondaryText={"ETH"}
        isLoading={isLoading}
      />
      <Table.ItemAmount
        primaryValue={formatCoin(1.05)}
        secondaryValue={"$" + formatUSD(1539.9)}
        isLoading={isLoading}
      />
      <Table.ItemAmount
        primaryValue={formatCoin(1.05)}
        secondaryValue={"$" + formatUSD(1539.9)}
        isLoading={isLoading}
      />
      <Table.Item>
        {isLoading ? (
          <Skeleton className={styles.skeleton} />
        ) : (
          <Text size={16} theme={500} className={styles.text}>
            1.32%
          </Text>
        )}
      </Table.Item>
      <Table.Item>
        {isLoading ? (
          <Skeleton className={styles.skeleton} />
        ) : (
          <Text size={16} theme={500} className={styles.text}>
            3.22%
          </Text>
        )}
      </Table.Item>
      <Table.ItemArrow isLoading={isLoading} />
      <th className={styles.link}>
        <Link href={"/"} className={styles.link} />
      </th>
    </Table.Row>
  );
};
