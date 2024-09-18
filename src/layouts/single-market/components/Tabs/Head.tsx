import * as React from "react";
import { Heading, Text } from "@/components";
import styles from "./Tabs.module.scss";

type HeadProps = {
  title: string;
  text: string;
};

export const Head: React.FC<HeadProps> = ({ title, text }) => {
  return (
    <React.Fragment>
      <Heading element="h3" className={styles.title}>
        {title}
      </Heading>
      <Text size={12} theme={400} className={styles.description}>
        {text}
      </Text>
    </React.Fragment>
  );
};
