import * as React from "react";
import cx from "classnames";
import { Button, Text } from "@/components";
import styles from "./Tabs.module.scss";

type TabsProps = React.PropsWithChildren<{
  className?: string;
}>;

export const Tabs = ({ children, className }: TabsProps) => {
  return <div className={cx(styles.base, className)}>{children}</div>;
};

type ItemProps = React.PropsWithChildren<{
  isActive: boolean;
  onClick: () => void;
  className?: string;
}>;

export const Item: React.FC<ItemProps> = ({
  children,
  isActive,
  onClick,
  className,
}) => (
  <Button
    onClick={onClick}
    className={cx(styles.tab, isActive && styles.active, className)}
    size={"custom"}
    variant={"custom"}
  >
    <Text size={14} theme={600}>
      {children}
    </Text>
  </Button>
);

Tabs.Item = Item;
