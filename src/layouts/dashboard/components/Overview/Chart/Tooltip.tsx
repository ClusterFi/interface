import * as React from "react";
import { Section, Text } from "@/components";
import styles from "./Chart.module.scss";

export const CustomTooltip = ({ active, payload, label, ...rest }: any) => {
  if (!active) {
    return null;
  }

  return (
    <div className={styles.tooltip}>
      <Text size={12} theme={500} className={styles.head}>
        {label}
        <span>TVL: $2.04M</span>
      </Text>
      <Text size={14} theme={500} className={styles.row}>
        Total Deposits
        <span className={styles.purple}>${payload[0]?.value}M</span>
      </Text>
      <Text size={14} theme={500} className={styles.row}>
        Total Borrows
        <span className={styles.green}>${payload[1]?.value}M</span>
      </Text>
    </div>
  );
};
