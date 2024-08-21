import * as React from "react";
import cx from "classnames";

import Link from "next/link";
import { Table, Switcher, Skeleton } from "@/components";

import styles from "./Deposits.module.scss";

type DepositItemProps = {
  isLoading: boolean;
};

export const DepositItem: React.FC<DepositItemProps> = ({ isLoading }) => {
  return (
    <Table.Row className={styles.row}>
      <Table.ItemAsset
        icon={"Ethereum"}
        primaryText={"ETH"}
        isLoading={isLoading}
      />
      <Table.ItemAmount
        primaryValue={"0.159"}
        secondaryValue={"$303.00"}
        isLoading={isLoading}
      />
      <Table.ItemAmount
        primaryValue={"0.54%"}
        secondaryValue={"10.32%"}
        isReward
        isLoading={isLoading}
      />
      <Table.Item>
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
      <Link href={"/"} className={styles.link} />
    </Table.Row>
  );
};
