"use client";

import * as React from "react";
import { Button, CurrencyIcon, Icon, Text, CustomInput } from "@/components";
import { formatCoin, formatUSD } from "@/utils";
import { useModalsStore } from "@/utils/stores";
import styles from "../Swap.module.scss";

export const Form: React.FC = () => {
  const [value1, setValue1] = React.useState("");
  const [value2, setValue2] = React.useState("");
  const { openModal } = useModalsStore();

  return (
    <div className={styles.form}>
      <CustomInput
        className={styles.input}
        value={value2}
        onChange={(e) => setValue2(e.target.value)}
        values={{
          usd: Number(value2) ? formatUSD(Number(value2) * 1.2) : undefined,
          balance: 2.5413,
        }}
        title={"You pay"}
        token={{
          icon: "WrappedStakedETH",
          name: "wstETH",
          changable: true,
        }}
      />
      <CustomInput
        className={styles.input}
        value={value1}
        onChange={(e) => setValue1(e.target.value)}
        values={{
          usd: Number(value1) ? formatUSD(Number(value1) * 1.2) : undefined,
          balance: 2.5413,
        }}
        title={"You pay"}
        token={{
          icon: "WrappedStakedETH",
          name: "wstETH",
        }}
      />
      <Text size={14} theme={500} className={styles.row}>
        Exchange rate
        <span>1 ETH = 0.98 wstETH</span>
      </Text>
      <Text size={14} theme={500} className={styles.row}>
        Minimum wstETH received
        <span>
          1.0587
          <b>$3401.44</b>
        </span>
      </Text>
      <Text size={14} theme={500} className={styles.row}>
        Gas fee
        <span>0.05$</span>
      </Text>
      <Text size={14} theme={500} className={styles.row}>
        Slippage
        <span>
          <Icon glyph={"Edit"} />
          0,5%
        </span>
      </Text>
      <Button className={styles.submit} size={"large"} variant={"purple"}>
        Swap
      </Button>
    </div>
  );
};
