import * as React from "react";
import cx from "classnames";
import { Skeleton, Table, Text, Button } from "@/components";
import { useModalsStore } from "@/utils/stores";

import styles from "./Network.module.scss";

type NetworkItemProps = {
  isLoading: boolean;
};

export const NetworkItem: React.FC<NetworkItemProps> = ({ isLoading }) => {
  const { openModal } = useModalsStore();

  return (
    <Table.Row className={styles.row}>
      <Table.ItemAsset
        currency={"Ethereum"}
        primaryText={"Ethereum"}
        secondaryText={"ETH"}
        isLoading={isLoading}
      />
      <Table.Item mobileTitle={"My Balance"}>
        {isLoading ? (
          <Skeleton className={styles.skeleton} />
        ) : (
          <Text size={16} theme={500} className={styles.text}>
            2.5413
          </Text>
        )}
      </Table.Item>
      <Table.Item mobileTitle={"Total Supply, $"}>
        {isLoading ? (
          <Skeleton className={styles.skeleton} />
        ) : (
          <Text size={16} theme={500} className={styles.text}>
            653.50K
          </Text>
        )}
      </Table.Item>
      <Table.Item mobileTitle={"Price, $"}>
        {isLoading ? (
          <Skeleton className={styles.skeleton} />
        ) : (
          <Text size={16} theme={500} className={styles.text}>
            3,594.79
          </Text>
        )}
      </Table.Item>
      <Table.Item>
        {isLoading ? (
          <Skeleton className={cx(styles.button, styles.skeleton)} />
        ) : (
          <Button
            onClick={() => openModal("Swap", null)}
            className={styles.button}
            variant={"stroke"}
            size={"small"}
          >
            <Text size={12} theme={600}>
              Get
            </Text>
          </Button>
        )}
      </Table.Item>
    </Table.Row>
  );
};
