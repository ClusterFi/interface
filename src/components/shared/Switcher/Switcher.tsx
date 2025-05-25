"use client";

import * as React from "react";
import cx from "classnames";
import styles from "./Switcher.module.scss";

type SwitcherProps = {
    targetValue: boolean;
    onSwitch: (value: boolean) => void;
    disabled?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "checked">;

export const Switcher: React.FC<SwitcherProps> = ({
                                                      className,
                                                      targetValue,
                                                      onSwitch,
                                                      disabled,
                                                      ...props
                                                  }) => {
    return (
        <input
            {...props}
            className={cx(styles.base, className)}
            type="checkbox"
            checked={targetValue}
            onChange={(e) => onSwitch(e.target.checked)}
            disabled={disabled}
        />
    );
};
