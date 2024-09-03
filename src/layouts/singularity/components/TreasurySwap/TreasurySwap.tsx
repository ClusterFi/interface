import * as React from "react";

import { Heading, Button, Text, Icon, Section } from "@/components";
import styles from "./TreasurySwap.module.scss";

export const TreasurySwap: React.FC = () => {
  return (
    <Section className={styles.base}>
      <Heading element="h3" as="h2" className={styles.title}>
        Treasury swap
      </Heading>
      <Text size={12} theme={400} className={styles.text}>
        Stake your CLR\ETH or CLR\SOL and get access the treasury swap discount
      </Text>
      <Button className={styles.button} size={"medium"} variant={"white"}>
        <Text size={14} theme={600}>
          Go to swap
        </Text>
        <Icon glyph={"Arrow"} width={16} height={16} />
      </Button>
    </Section>
  );
};
