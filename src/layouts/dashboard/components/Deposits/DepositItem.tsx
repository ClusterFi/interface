import * as React from "react";
import cx from "classnames";

import Link from "next/link";
import { Table, Switcher, Skeleton } from "@/components";

import styles from "./Deposits.module.scss";
import { formatCoin, formatUSD } from "@/utils";
import { Currency } from "@/types";

type DepositItemProps = {
  isLoading: boolean;
  currency: Currency;
  name: string;
};

export const DepositItem: React.FC<DepositItemProps> = ({
  isLoading, currency, name
}) => {
  return (
    <Table.Row className={styles.row}>
      <Table.ItemAsset
        currency={currency}
        primaryText={name}
        isLoading={isLoading}
      />
      <Table.ItemAmount
        primaryValue={formatCoin(0.159)}
        secondaryValue={"$" + formatUSD(303.0)}
        isLoading={isLoading}
        mobileTitle={"Deposits"}
      />
      <Table.ItemAmount
        primaryValue={"0.54%"}
        secondaryValue={"10.32%"}
        isReward
        isLoading={isLoading}
        mobileTitle={"APY"}
      />
      <Table.Item mobileTitle={"Collateral"}>
        {!isLoading ? (
          <Switcher
            className={styles.switcher}
            targetValue={true}
            onSwitch={(val) => console.log(val)}
          />
        ) : (
          <Skeleton className={cx(styles.skeleton, styles.switcher)} />
        )}
      </Table.Item>
      <Table.ItemArrow isLoading={isLoading} />
      <th className={styles.link}>
        <Link href={"/"} className={styles.link} />
      </th>
    </Table.Row>
  );
};
