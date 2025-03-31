import * as React from "react";
import { Table, Button, Text, Icon } from "@/components";
import styles from "./Deposits.module.scss";

export const DepositItemOverall: React.FC = () => {
  return (
    <Table.Row className={styles.row}>
      <Table.ItemAsset currency={"Ethereum"} primaryText={"ETH"} />
      <Table.Item mobileTitle={"Wallet balance"}>0.59998783</Table.Item>
      <Table.Item mobileTitle={"APY"}>1.97%</Table.Item>
      <Table.Item mobileTitle={"Can be collateral"}>
        <Icon glyph={"Check"} width={16} height={16} className={styles.check} />
      </Table.Item>
      <Table.Item>
        <Button className={styles.button} size={"small"} variant={"purple"}>
          <Text size={12} theme={500}>
            Supply
          </Text>
        </Button>
      </Table.Item>
    </Table.Row>
  );
};
