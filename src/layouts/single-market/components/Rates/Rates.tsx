import React from "react";
import cx from "classnames";
import styles from "./Rates.module.scss";
import { Heading, Section, Text } from "@/components";

export const Rates: React.FC = () => {
  return (
    <Section className={styles.base}>
      <Heading element="h4" className={styles.heading}>
        Market Rates
        <Text size={12} theme={400} className={styles.headingText}>
          Net of Rewards
        </Text>
      </Heading>
      <div className={styles.row}>
        <Section className={styles.item}>
          <Text size={12} theme={400} className={styles.subtitle}>
            Net Borrow APR
          </Text>
          <Heading element="h4" className={styles.info}>
            1.74%
          </Heading>
          <div className={cx(styles.progress, styles.single)}>
            <Text
              size={12}
              theme={600}
              style={{ width: `70%` }}
              className={styles.fill}
            >
              1.74%
            </Text>
            <Text size={12} theme={400} className={styles.note}>
              <span>1.81%</span> Interest
            </Text>
          </div>
        </Section>
        <Section className={styles.item}>
          <Text size={12} theme={400} className={styles.subtitle}>
            Net Earn APR
          </Text>
          <Heading element="h4" className={styles.info}>
            0.91%
          </Heading>
          <div className={cx(styles.progress, styles.multi)}>
            <div style={{ width: `40%` }} className={styles.fill}>
              <Text size={12} theme={400} className={styles.note}>
                <span>0.38%</span> Interest
              </Text>
            </div>
            <div style={{ width: `calc(60% - 6px)` }} className={styles.fill}>
              <Text size={12} theme={400} className={styles.note}>
                <span>0.53%</span>
              </Text>
            </div>
          </div>
        </Section>
      </div>
    </Section>
  );
};
