import * as React from "react";
import { Section, Text } from "@/components";
import styles from "./Chart.module.scss";

export const CustomTooltip = ({ active, payload }: any) => {
  if (!active) {
    return null;
  }

  return (
    <div className={styles.tooltip}>
      <Text size={12} theme={500} className={styles.head}>
        Utilization
      </Text>
      <Text size={14} theme={500} className={styles.row}>
        {(payload[0].payload.value + payload[1].payload.value) / 2}%
      </Text>
    </div>
  );
};
