"use client";

import * as React from "react";
import cx from "classnames";
import { Button, Text, Icon, CurrencyIcon } from "@/components/shared";
import { motion, AnimatePresence } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import styles from "./NetworkSelection.module.scss";
import { mediaBreaks, useMedia } from "@/utils";
import { useGlobalStore } from "@/utils/stores";
import { CHAINS } from "@/constants";

type NetworkSelectionProps = {
  className?: string;
  size?: "default" | "large";
};

export const NetworkSelection: React.FC<NetworkSelectionProps> = ({
  className,
  size = "default",
}) => {
  const { chainId, setChainId } = useGlobalStore();

  const containerRef = React.useRef<HTMLDivElement>(null);
  const isMobile = useMedia(mediaBreaks.max.xga);
  const [isVisible, setIsVisible] = React.useState(false);

  const onOpen = () => setIsVisible(true);

  const onClose = () => setIsVisible(false);

  const onNetworkSelect = (chainId_: number) => {
    setChainId(chainId_);
    setIsVisible(false);
  };

  const selectedNetwork = React.useMemo(() => {
    const network = CHAINS.find((t) => t.chainId == chainId) ?? CHAINS[0];
    return network;
  }, [chainId]);

  useOnClickOutside(containerRef, onClose);

  return (
    <div
      ref={containerRef}
      className={cx(styles.base, styles[size], className)}
    >
      <Button
        onClick={isVisible ? onClose : onOpen}
        size={isMobile ? "small" : "medium"}
        variant={"gradient-dark"}
        isActive={isVisible}
        className={styles.trigger}
      >
        <Text size={12} theme={400} className={styles.text}>
          <CurrencyIcon
            width={18}
            height={18}
            currency={selectedNetwork.currency}
            className={styles.icon}
          />
          {selectedNetwork.name}
          <Icon
            width={16}
            height={16}
            glyph={"Arrow"}
            className={cx(styles.arrow, isVisible && styles.isInverted)}
          />
        </Text>
      </Button>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={styles.dropdown}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
          >
            {CHAINS.map((network) => {
              const isActive = network.name === selectedNetwork.name;

              return (
                <button
                  className={cx(styles.item, isActive && styles.isActive)}
                  onClick={() => onNetworkSelect(network.chainId)}
                  key={network.name}
                >
                  <Text size={12} theme={400} className={styles.text}>
                    <CurrencyIcon
                      width={18}
                      height={18}
                      currency={network.currency}
                    />
                    {network.name}
                    {isActive && (
                      <Icon
                        width={12}
                        height={12}
                        glyph={"Check"}
                        className={styles.check}
                      />
                    )}
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
