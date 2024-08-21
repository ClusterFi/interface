import * as React from "react";
import Link from "next/link";
import { Skeleton, Table, Text } from "@/components";

import styles from "./Market.module.scss";

type MarketItemProps = {
  isLoading: boolean;
};

export const MarketItem: React.FC<MarketItemProps> = ({ isLoading }) => {
  return (
    <Table.Row className={styles.row}>
      <Table.ItemAsset
        icon={"Ethereum"}
        primaryText={"Ethereum"}
        secondaryText={"ETH"}
        isLoading={isLoading}
      />
      <Table.ItemAmount
        primaryValue={"1,540.05"}
        secondaryValue={"$1,539.90"}
        isLoading={isLoading}
      />
      <Table.ItemAmount
        primaryValue={"1,540.05"}
        secondaryValue={"$1,539.90"}
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
      <Link href={"/"} className={styles.link} />
    </Table.Row>
  );
};
