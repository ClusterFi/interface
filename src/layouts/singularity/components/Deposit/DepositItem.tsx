import * as React from "react";
import cx from "classnames";
import { Button, Skeleton, Table, Text } from "@/components";

import styles from "./Deposit.module.scss";

type DepositItemProps = {
  isLoading: boolean;
};

export const DepositItem: React.FC<DepositItemProps> = ({ isLoading }) => {
  return (
    <Table.Row className={styles.row}>
      <Table.ItemAsset
        currency={["Cluster", "Ethereum"]}
        primaryText={`CLR/ETH`}
        isLoading={isLoading}
      />
      <Table.ItemAsset
        variant={"small"}
        currency={"Ethereum"}
        primaryText={"Ethereum"}
        isLoading={isLoading}
      />
      <Table.Item>
        {isLoading ? (
          <Skeleton className={styles.skeleton} />
        ) : (
          <Text size={16} theme={500} className={styles.text}>
            $179K
          </Text>
        )}
      </Table.Item>
      <Table.Item>
        {isLoading ? (
          <Skeleton className={styles.skeleton} />
        ) : (
          <Text size={16} theme={500} className={styles.text}>
            ETH+aMTT
          </Text>
        )}
      </Table.Item>
      <Table.Item>
        {isLoading ? (
          <Skeleton className={styles.skeleton} />
        ) : (
          <Text size={16} theme={500} className={styles.text}>
            7.43%
          </Text>
        )}
      </Table.Item>
      <Table.Item>
        {isLoading ? (
          <Skeleton className={cx(styles.button, styles.skeleton)} />
        ) : (
          <Button className={styles.button} variant={"stroke"} size={"small"}>
            <Text size={12} theme={600}>
              Deposit
            </Text>
          </Button>
        )}
      </Table.Item>
    </Table.Row>
  );
};
