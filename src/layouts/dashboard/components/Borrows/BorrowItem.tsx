import * as React from "react";
import Link from "next/link";
import { Button, Table, Text } from "@/components";

import styles from "./Borrows.module.scss";
import { formatCoin, formatUSD } from "@/utils";
import { Currency } from "@/types";

type BorrowItemProps = {
  currency: Currency;
  name: string;
};

export const BorrowItem: React.FC<BorrowItemProps> = ({ currency, name }) => {
  return (
    <Table.Row className={styles.row}>
      <Table.ItemAsset currency={currency} primaryText={name} />
      <Table.ItemAmount
        primaryValue={formatCoin(1540.05)}
        secondaryValue={"$" + formatUSD(1539.9)}
        mobileTitle={"Borrows"}
      />
      <Table.ItemAmount
        primaryValue={"8.33%"}
        secondaryValue={"ARB RATE"}
        isSecondaryWrapped
        mobileTitle={"APY"}
      />
      <Table.Item>
        <div className={styles.buttons}>
          <Button className={styles.button} size={"small"} variant={"stroke"}>
            <Text size={12} theme={500}>
              Repay
            </Text>
          </Button>
        </div>
      </Table.Item>
    </Table.Row>
  );
};
