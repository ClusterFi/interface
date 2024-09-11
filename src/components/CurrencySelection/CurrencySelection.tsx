"use client";

import * as React from "react";
import cx from "classnames";
import {
  Button,
  Section,
  Text,
  Icon,
  CurrencyIcon,
  Currency,
} from "@/components/shared";
import { motion, AnimatePresence } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import styles from "./CurrencySelection.module.scss";
import { formatCoin } from "@/utils";

type TCurrency = {
  name: string;
  fullName: string;
  amount: number;
  id: string;
  currency: Currency;
};

const currencies: TCurrency[] = [
  {
    id: "0",
    name: "ETH",
    fullName: "Ethereum",
    currency: "Ethereum",
    amount: 0.0,
  },
  {
    id: "1",
    name: "ETH",
    fullName: "Rocket Pool ETH",
    currency: "RocketPoolETH",
    amount: 0.0,
  },
  {
    id: "2",
    name: "USDC",
    fullName: "USD Coin",
    currency: "USDCoin",
    amount: 4324.5,
  },
  {
    id: "3",
    name: "weETH",
    fullName: "Wrapped eETH",
    currency: "WrappedEETH",
    amount: 0.0,
  },
  {
    id: "4",
    name: "AnkrETH",
    fullName: "Ankr Staked ETH",
    currency: "AnkrStakedETH",
    amount: 0.0,
  },
  {
    id: "5",
    name: "USDT",
    fullName: "Tether USD",
    currency: "USDTether",
    amount: 0.0,
  },
];

type CurrencySelectionProps = {
  variant: "default" | "gradient";
  className?: string;
};

export const CurrencySelection: React.FC<CurrencySelectionProps> = ({
  variant,
  className,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const [selectedCurrency, seTselectedCurrency] = React.useState<TCurrency>(
    currencies[0],
  );
  const onOpen = () => setIsVisible(true);
  const onClose = () => setIsVisible(false);
  const onCurrencySelect = (currency: TCurrency) => {
    seTselectedCurrency(currency);
    setIsVisible(false);
  };

  useOnClickOutside(containerRef, onClose);

  return (
    <div
      ref={containerRef}
      className={cx(styles.base, styles[variant], className)}
    >
      <Button
        onClick={isVisible ? onClose : onOpen}
        size={"custom"}
        variant={"gradient-dark"}
        isActive={isVisible}
        className={styles.trigger}
      >
        <CurrencyIcon
          width={variant === "default" ? 33 : 40}
          height={variant === "default" ? 33 : 40}
          currency={selectedCurrency.currency}
          className={styles.icon}
        />
        <span className={styles.block}>
          <Text size={16} theme={500}>
            {selectedCurrency.name}
          </Text>
          <Text size={12} theme={400}>
            {selectedCurrency.fullName}
          </Text>
        </span>
        <Icon
          width={24}
          height={24}
          glyph={"Arrow"}
          className={cx(styles.arrow, isVisible && styles.isInverted)}
        />
      </Button>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={styles.dropdown}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
          >
            {currencies.map((currency) => {
              const isActive = currency.id === selectedCurrency.id;

              return (
                <button
                  className={cx(styles.item, isActive && styles.isActive)}
                  onClick={() => onCurrencySelect(currency)}
                  key={currency.id}
                >
                  <CurrencyIcon
                    width={33}
                    height={33}
                    currency={currency.currency}
                  />
                  <span className={styles.block}>
                    <Text size={14} theme={500}>
                      {currency.name}
                    </Text>
                    <Text size={12} theme={400}>
                      {currency.fullName}
                    </Text>
                  </span>
                  <Text size={14} theme={500} className={styles.amount}>
                    {formatCoin(currency.amount)}
                  </Text>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
