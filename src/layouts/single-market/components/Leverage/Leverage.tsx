"use client";

import * as React from "react";
import { Heading, CustomInput, Text, Button, CurrencyIcon } from "@/components";
import styles from "./Leverage.module.scss";
import { formatUSD } from "@/utils";

const MIN_SLIDER = 1.1;
const MAX_SLIDER = 4;
const DEFAULT_SLIDER = 2.55;
const STEP = 0.01;

export const Leverage = () => {
  const [value, setValue] = React.useState("");
  const [slider, setSlider] = React.useState(DEFAULT_SLIDER);

  return (
    <React.Fragment>
      <Heading element="h3" className={styles.title}>
        1-Click Leverage
      </Heading>
      <Text size={12} theme={400} className={styles.text}>
        Increase the yield potential of your tokens with up to 4x leverage. This
        process deposits a user’s tokens and automatically borrows against them,
        repeating these steps until your desired amount of leverage is acquired.
      </Text>
      <div className={styles.label}>
        <Text size={14} theme={400} className={styles.token}>
          <CurrencyIcon currency={"Cluster"} width={20} height={20} /> CLR-LP
        </Text>
        <Text size={12} theme={400} className={styles.balance}>
          Balance: <span>2540,13</span>
        </Text>
      </div>
      <CustomInput
        className={styles.input}
        value={value}
        USDValue={formatUSD(Number(value) * 1.2)}
        onClickMax={() => setValue("1000.00")}
        placeholder={"0.00"}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className={styles.slider}>
        <Text size={14} theme={500} className={styles.head}>
          <span className={styles.headItem}>1.1</span>
          <span className={styles.headItem}>
            Leverage <span>x{slider.toFixed(2)}</span>
          </span>
          <span className={styles.headItem}>4</span>
        </Text>
        <input
          type="range"
          min={MIN_SLIDER}
          max={MAX_SLIDER}
          step={STEP}
          value={slider}
          onChange={(e) => setSlider(Number(e.target.value))}
          className={styles.range}
        />
      </div>
      <Text size={14} theme={500} className={styles.row}>
        Liquidation price
        <span>$3553.45</span>
      </Text>
      <Text size={14} theme={500} className={styles.row}>
        Health factor
        <span>1.03</span>
      </Text>
      <Button size={"large"} variant={"purple"} className={styles.button}>
        Connect Wallet
      </Button>
    </React.Fragment>
  );
};
