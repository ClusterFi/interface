'use client';

import * as React from 'react';
import cx from 'classnames';
import { Button, Text, Icon, CurrencyIcon } from '@/components/shared';
import { AnimatePresence, motion } from 'framer-motion';
import { useOnClickOutside } from 'usehooks-ts';
import styles from './ChainSelection.module.scss';
import { Currency } from '@/types';

export type TChain = {
  id: string;
  name: string;
  fullName: string;
  icon: string; // For CurrencyIcon
};

type ChainSelectionProps = {
  value: TChain;
  onChange: (c: TChain) => void;
  options: TChain[];
  variant?: 'default' | 'gradient';
  className?: string;
};

export const ChainSelection: React.FC<ChainSelectionProps> = ({
  value,
  onChange,
  options,
  variant = 'default',
  className,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  const toggle = () => setIsVisible((v) => !v);
  const close = () => setIsVisible(false);
  const select = (chain: TChain) => {
    onChange(chain);
    close();
  };

  useOnClickOutside(containerRef, close);

  return (
    <div
      ref={containerRef}
      className={cx(styles.base, styles[variant], className)}
    >
      <Button
        onClick={toggle}
        size='custom'
        variant='gradient-dark'
        isActive={isVisible}
        className={styles.trigger}
      >
        <CurrencyIcon
          width={variant === 'default' ? 33 : 40}
          height={variant === 'default' ? 33 : 40}
          currency={value.icon as Currency}
          className={styles.icon}
        />
        <span className={styles.block}>
          <Text size={16} theme={500}>
            {value.name}
          </Text>
          <Text size={12} theme={400}>
            {value.fullName}
          </Text>
        </span>
        <Icon
          width={24}
          height={24}
          glyph='Arrow'
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
            {options.map((chain) => {
              const isActive = chain.id === value.id;
              return (
                <button
                  key={chain.id}
                  className={cx(styles.item, isActive && styles.isActive)}
                  onClick={() => select(chain)}
                >
                  <CurrencyIcon
                    width={33}
                    height={33}
                    currency={chain.icon as Currency}
                  />
                  <span className={styles.block}>
                    <Text size={14} theme={500}>
                      {chain.name}
                    </Text>
                    <Text size={12} theme={400}>
                      {chain.fullName}
                    </Text>
                  </span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
