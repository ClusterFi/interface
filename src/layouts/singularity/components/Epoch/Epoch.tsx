import * as React from "react";
import cx from "classnames";
import Link from "next/link";

import { Heading, Icon, Section, Text } from "@/components";

import styles from "./Epoch.module.scss";

type EpochProps = {
  className?: string;
};

export const Epoch: React.FC<EpochProps> = ({ className }) => {
  return (
    <Section className={cx(styles.base, className)}>
      <div className={styles.info}>
        <div className={styles.box}>
          <Text size={12} theme={500}>
            Next epoch in:
          </Text>
          <Heading element="h3">04:22:03</Heading>
        </div>
        <div className={styles.box}>
          <Text size={12} theme={500}>
            Consecutive Epochs:
          </Text>
          <Heading element="h3">22</Heading>
        </div>
      </div>
      <Text size={12} theme={400} className={styles.text}>
        {`
             $aMTT distribution and real return rewards to liquidity providers will
            happen every 6 hours (1 epoch). The size of your rewards depends on the
            length of consecutive epochs during which you deposit and hold the LP in
            the Singularity.
        `}
      </Text>
      <Text size={12} theme={500} className={styles.note}>
        {`Adding LP or claiming rewards won't reset the timer.`}
      </Text>
      <Link href={"/"} className={styles.link}>
        <Text size={12} theme={500}>
          Read more
        </Text>
        <Icon glyph={"Share"} width={12} height={12} />
      </Link>
    </Section>
  );
};
