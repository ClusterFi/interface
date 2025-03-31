import React from "react";
import styles from "./CommonInfo.module.scss";
import { Button, Icon, Text } from "@/components";

export const CommonInfo: React.FC = () => {
  return (
    <div className={styles.info}>
      <Button
        as="div"
        size={"extra-small"}
        variant={"gradient-light"}
        className={styles.infoItem}
      >
        <Text size={12} theme={400}>
          Balance <span>$178.80K</span>
        </Text>
      </Button>
      <Button
        title="Some info"
        as="div"
        size={"extra-small"}
        variant={"gradient-light"}
        className={styles.infoItem}
      >
        <Text size={12} theme={400}>
          APY <span>1.03%</span>
          <Icon glyph={"Info"} width={11} height={11} />
        </Text>
      </Button>
      <Button
        title="Some info"
        as="div"
        size={"extra-small"}
        variant={"gradient-light"}
        className={styles.infoItem}
      >
        <Text size={12} theme={400}>
          Collateral <span>$178.80K</span>
          <Icon glyph={"Info"} width={11} height={11} />
        </Text>
      </Button>
    </div>
  );
};
