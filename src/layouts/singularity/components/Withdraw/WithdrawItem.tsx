import * as React from "react";
import cx from "classnames";
import { Button, Skeleton, Table, Text } from "@/components";

import styles from "./Withdraw.module.scss";
import { useModalsStore } from "@/utils/stores";

type WithdrawItemProps = {
  isLoading: boolean;
};

export const WithdrawItem: React.FC<WithdrawItemProps> = ({ isLoading }) => {
  const { openModal } = useModalsStore();

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
      <Table.Item mobileTitle={"Total Deposit, $"}>
        {isLoading ? (
          <Skeleton className={styles.skeleton} />
        ) : (
          <Text size={16} theme={500} className={styles.text}>
            5,000.90
          </Text>
        )}
      </Table.Item>
      <Table.Item mobileTitle={"Earned"}>
        {isLoading ? (
          <Skeleton className={styles.skeleton} />
        ) : (
          <Text size={16} theme={500} className={styles.text}>
            0.03 ETH+400 aMTT
          </Text>
        )}
      </Table.Item>
      <Table.Item>
        {isLoading ? (
          <Skeleton className={cx(styles.button, styles.skeleton)} />
        ) : (
          <Button
            onClick={() =>
              openModal("StakingWithdraw", {
                token: "CLR-LP",
              })
            }
            className={styles.button}
            variant={"stroke"}
            size={"small"}
          >
            <Text size={12} theme={600}>
              Withdraw
            </Text>
            <Text size={12} theme={600} className={styles.countdown}>
              22:45
            </Text>
          </Button>
        )}
      </Table.Item>
    </Table.Row>
  );
};
