"use client";

import * as React from "react";
import styles from "./AmountInput.module.scss";
import cx from "classnames";
import { NumericFormat } from "react-number-format";

type AmountInputProps = {
  value: string;
  onChange: (val: string) => void;
  label?: string;
  state?: "default" | "error";
  className?: string;
};

export const AmountInput: React.FC<AmountInputProps> = ({
  value,
  onChange,
  label = "Amount",
  state = "default",
  className,
}) => {
  return (
    <div className={cx(styles.base, styles[state], className)}>
      <div className={styles.input}>
        <NumericFormat
          className={styles.element}
          placeholder="0"
          allowNegative={false}
          value={value}
          onValueChange={(vals) => onChange(vals.value)}
          thousandSeparator=","
          allowLeadingZeros={false}
          decimalScale={6}
        />
      </div>
    </div>
  );
};
