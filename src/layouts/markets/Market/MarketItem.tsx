import * as React from "react";
import Link from "next/link";
import { Skeleton, Table, Text } from "@/components";
import { formatCoin, formatUSD } from "@/utils";

import styles from "./Market.module.scss";
import { Currency } from "@/types";

type MarketItemProps = {
  isLoading: boolean;
  name: string;
  fullName: string;
  currency: Currency;
};

export const MarketItem: React.FC<MarketItemProps> = ({
  isLoading,
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
        isLoading={isLoading}
      />
      <Table.ItemAmount
        primaryValue={formatCoin(1.05)}
        secondaryValue={"$" + formatUSD(1539.9)}
        isLoading={isLoading}
        mobileTitle={"My Balance"}
      />
      <Table.ItemAmount
        primaryValue={formatCoin(1.05)}
        secondaryValue={"$" + formatUSD(1539.9)}
        isLoading={isLoading}
        mobileTitle={"Total Supply, $"}
      />
      <Table.Item mobileTitle={"Price, $"}>
        {isLoading ? (
          <Skeleton className={styles.skeleton} />
        ) : (
          <Text size={16} theme={500} className={styles.text}>
            1.32%
          </Text>
        )}
      </Table.Item>
      <Table.Item mobileTitle={"Borrow APY"}>
        {isLoading ? (
          <Skeleton className={styles.skeleton} />
        ) : (
          <Text size={16} theme={500} className={styles.text}>
            3.22%
          </Text>
        )}
      </Table.Item>
      <Table.ItemArrow className={styles.arrow} isLoading={isLoading} />
      <th className={styles.link}>
        <Link href={"/single-market"} className={styles.link} />
      </th>
    </Table.Row>
  );
};
