import * as React from "react";
import cx from "classnames";

import styles from "./CustomInput.module.scss";
import { Button, CurrencyIcon, Icon, Section, Text } from "@/components/shared";
import { Currency } from "@/types";
import { useModalsStore } from "@/utils/stores";

type CustomInputProps = {
  className?: string;
  values: {
    usd?: string;
    balance?: number;
  };
  title: string;
  subtitle?: React.ReactNode;
  fastOptions?: boolean;
  token?: {
    icon: Currency;
    name: string;
    changable?: boolean;
  };
  state?: "default" | "error";
};

const CustomInput = React.forwardRef<
  React.ElementRef<"input">,
  React.ComponentPropsWithoutRef<"input"> & CustomInputProps
>(
  (
    {
      children,
      className,
      values,
      subtitle,
      title,
      fastOptions,
      token,
      state,
      ...props
    },
    forwardedRef,
  ) => {
    const { openModal } = useModalsStore();

    const changeToken = () => openModal("SelectToken", null);

    return (
      <Section className={cx(styles.base, state && styles[state], className)}>
        <div className={styles.head}>
          <Text size={14} theme={400} className={styles.title}>
            {title}
          </Text>
          {subtitle ? (
            <Text size={14} theme={400} className={styles.subtitle}>
              {subtitle}
            </Text>
          ) : fastOptions ? (
            <div className={styles.options}>
              {[0.25, 0.5, 0.75, 1].map((option) => (
                <Button
                  className={styles.option}
                  size="custom"
                  variant="custom"
                  key={option}
                >
                  {option * 100}%
                </Button>
              ))}
            </div>
          ) : null}
        </div>
        <div className={styles.input}>
          <input
            type="text"
            ref={forwardedRef}
            {...props}
            className={styles.element}
            placeholder="0"
          />
          {values.usd && <div className={styles.usd}>${values.usd}</div>}
        </div>
        <div className={styles.token}>
          {!token ? (
            <Button
              className={styles.select}
              size="custom"
              variant="purple"
              onClick={changeToken}
            >
              <Text size={14} theme={600}>
                Select token
              </Text>{" "}
              <Icon glyph="Arrow" width={16} height={16} />
            </Button>
          ) : (
            <Button
              className={styles.tokenButton}
              size="custom"
              variant="gradient-light"
              as={token.changable ? "button" : "div"}
              onClick={token.changable ? changeToken : undefined}
            >
              <CurrencyIcon currency={token.icon} width={18} height={18} />
              {token.name}
              {token.changable && <Icon glyph="Arrow" width={16} height={16} />}
            </Button>
          )}
          {values.balance && (
            <Text size={14} theme={400} className={styles.balance}>
              {values.balance}
              {
                <Button
                  size="custom"
                  variant="custom"
                  className={styles.option}
                >
                  MAX
                </Button>
              }
            </Text>
          )}
        </div>
      </Section>
    );
  },
);

CustomInput.displayName = "CustomInput";
export { CustomInput };
