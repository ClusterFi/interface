"use client";

import * as React from "react";
import cx from "classnames";
import { Button, Glyph, Text, Icon } from "@/components/shared";
import { motion, AnimatePresence } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import styles from "./NetworkSelection.module.scss";

type Network = {
  name: string;
  icon: Glyph;
};

const networks: Network[] = [
  {
    name: "Ethereum",
    icon: "Ethereum",
  },
  {
    name: "Solana",
    icon: "Solana",
  },
];

export const NetworkSelection = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const [selectedNetwork, setSelectedNetwork] = React.useState<Network>(
    networks[0],
  );
  const onOpen = () => setIsVisible(true);
  const onClose = () => setIsVisible(false);
  const onNetworkSelect = (network: Network) => {
    setSelectedNetwork(network);
    setIsVisible(false);
  };

  useOnClickOutside(containerRef, onClose);

  return (
    <div ref={containerRef} className={styles.base}>
      <Button
        onClick={isVisible ? onClose : onOpen}
        size={"medium"}
        variant={"gradient-dark"}
        isActive={isVisible}
        className={styles.trigger}
      >
        <Text size={12} theme={400} className={styles.text}>
          <Icon
            width={18}
            height={18}
            glyph={selectedNetwork.icon}
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
            {networks.map((network) => {
              const isActive = network.name === selectedNetwork.name;

              return (
                <button
                  className={cx(styles.item, isActive && styles.isActive)}
                  onClick={() => onNetworkSelect(network)}
                  key={network.name}
                >
                  <Text size={12} theme={400} className={styles.text}>
                    <Icon width={18} height={18} glyph={network.icon} />
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
