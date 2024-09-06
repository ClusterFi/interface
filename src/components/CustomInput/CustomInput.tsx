import * as React from "react";
import cx from "classnames";

import styles from "./CustomInput.module.scss";
import { Button, Text } from "@/components/shared";

type CustomInputProps = {
  className?: string;
  USDValue: string;
  actions?: {
    text: string;
    onClick: () => void;
  }[];
  onClickMax?: () => void;
};

const CustomInput = React.forwardRef<
  React.ElementRef<"input">,
  React.ComponentPropsWithoutRef<"input"> & CustomInputProps
>(
  (
    { children, className, onClickMax, USDValue, actions, ...props },
    forwardedRef,
  ) => (
    <div className={cx(styles.base, className)}>
      <label className={cx(styles.input, props.value && styles.active)}>
        <input
          className={styles.element}
          type="number"
          {...props}
          ref={forwardedRef}
        />
        <Text className={styles.usd} size={12} theme={400}>
          ${USDValue}
        </Text>
        {onClickMax && (
          <Button
            className={styles.max}
            onClick={onClickMax}
            variant={"gradient-light"}
            size={"extra-small"}
          >
            MAX
          </Button>
        )}
      </label>
      {actions?.length !== 0 && (
        <div className={styles.actions}>
          {actions!.map((action, index) => (
            <Button
              className={styles.action}
              key={index}
              onClick={action.onClick}
              variant={"gradient-dark"}
              size={"custom"}
            >
              <Text size={14} theme={600}>
                {action.text}
              </Text>
            </Button>
          ))}
        </div>
      )}
    </div>
  ),
);

CustomInput.displayName = "CustomInput";
export { CustomInput };
