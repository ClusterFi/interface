"use client";

import * as React from "react";
import cx from "classnames";

import styles from "./Switcher.module.scss";

type SwitcherProps = {
  targetValue?: boolean;
  onSwitch: (value: boolean) => void;
} & React.HTMLAttributes<HTMLInputElement>;

export const Switcher: React.FC<SwitcherProps> = ({
  className,
  targetValue,
  onSwitch,
  ...props
}) => {
  const [checked, setChecked] = React.useState(props.defaultChecked ?? false);

  React.useEffect(() => {
    if (!targetValue || checked === targetValue) return;
    setChecked(targetValue);
  }, [
    targetValue
  ]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setChecked(value);
    onSwitch(value);
  };

  return (
    <input
      {...props}
      className={cx(styles.base, className)}
      checked={checked}
      onChange={onChange}
      type={"checkbox"}
    />
  );
};
