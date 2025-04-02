import React from "react";
import cx from "classnames";

import styles from "./Button.module.scss";

export type ButtonOwnProps<E extends React.ElementType = React.ElementType> = {
  children?: React.ReactNode;
  size: "extra-small" | "small" | "medium" | "large" | "custom";
  variant:
    | "gradient-dark"
    | "stroke"
    | "gradient-light"
    | "white"
    | "purple"
    | "stroke-purple"
    | "custom"
    | "status-active";
  color?: "blue" | "purple" | "green";
  isActive?: boolean;
  as?: E;
};

export type ButtonProps<E extends React.ElementType> = ButtonOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof ButtonOwnProps>;

const defaultElement = "button";

export function Button<E extends React.ElementType = typeof defaultElement>({
  children,
  color,
  variant,
  size,
  as,
  className,
  disabled,
  isActive,
  ...rest
}: ButtonProps<E>) {
  const TagName = as || defaultElement;

  return (
    <>
      <TagName
        className={cx(
          styles.button,
          styles[size],
          styles[variant],
          color && styles["color-" + color],
          disabled && styles.disabled,
          isActive && styles.isActive,
          className,
        )}
        disabled={disabled}
        {...rest}
      >
        {variant === "status-active" && <span className={styles.status} />}
        {children}
      </TagName>
    </>
  );
}
