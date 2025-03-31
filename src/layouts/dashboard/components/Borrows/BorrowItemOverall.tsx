import * as React from "react";
import Link from "next/link";
import { Button, Table, Text } from "@/components";

import styles from "./Borrows.module.scss";
import { formatCoin, formatUSD } from "@/utils";
import { Currency } from "@/types";

type BorrowItemOverallProps = {
  currency: Currency;
  name: string;
};

export const BorrowItemOverall: React.FC<BorrowItemOverallProps> = ({
  currency,
  name,
}) => {
  return (
    <Table.Row className={styles.row}>
      <Table.ItemAsset currency={currency} primaryText={name} />
      <Table.ItemAmount
        primaryValue={formatCoin(1540.05)}
        secondaryValue={"$" + formatUSD(1539.9)}
        mobileTitle={"Avaliable"}
      />
      <Table.Item mobileTitle="APY, borrow rate">5.83 - 8.33%</Table.Item>
      <Table.Item>
        <div className={styles.buttons}>
          <Button className={styles.button} size={"small"} variant={"purple"}>
            <Text size={12} theme={500}>
              Borrow
            </Text>
          </Button>
          <Button className={styles.button} size={"small"} variant={"stroke"}>
            <Text size={12} theme={500}>
              Details
            </Text>
          </Button>
        </div>
      </Table.Item>
    </Table.Row>
  );
};
