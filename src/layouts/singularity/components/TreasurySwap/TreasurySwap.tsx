import * as React from "react";

import { Heading, Button, Text, Icon, Section } from "@/components";
import styles from "./TreasurySwap.module.scss";
import { useModalsStore } from "@/utils/stores";

export const TreasurySwap: React.FC = () => {
  const { openModal } = useModalsStore();

  return (
    <Section className={styles.base}>
      <Heading element="h3" as="h2" className={styles.title}>
        Treasury swap
      </Heading>
      <Text size={12} theme={400} className={styles.text}>
        Stake your CLR\ETH or CLR\SOL and get access the treasury swap discount
      </Text>
      <Button
        onClick={() => openModal("TreasurySwap", null)}
        className={styles.button}
        size={"medium"}
        variant={"white"}
      >
        <Text size={14} theme={600}>
          Go to swap
        </Text>
        <Icon glyph={"Arrow"} width={16} height={16} />
      </Button>
    </Section>
  );
};
