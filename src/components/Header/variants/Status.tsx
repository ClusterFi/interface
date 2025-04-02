import React from "react";
import cx from "classnames";
import styles from "./Header.module.scss";
import { Icon, Text } from "@/components/shared";
import { mediaBreaks, useMedia } from "@/utils";
import { useOnClickOutside } from "usehooks-ts";
import { AnimatePresence, motion } from "framer-motion";

const options: {
  name: string;
  value: number;
  color: "blue" | "green" | "purple";
}[] = [
  {
    name: "General",
    value: 0,
    color: "blue",
  },
  {
    name: "LSDs",
    value: 1,
    color: "purple",
  },
  {
    name: "Stable",
    value: 2,
    color: "green",
  },
];

export const Status: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isMobile = useMedia(mediaBreaks.max.xga);
  const [isVisible, setIsVisible] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState(options[0]);

  const onOpen = () => setIsVisible(true);

  const onSelect = (option: (typeof options)[0]) => {
    setSelectedOption(option);
    onClose();
  };

  const onClose = () => setIsVisible(false);

  useOnClickOutside(containerRef, onClose);

  return (
    <div ref={containerRef} className={styles.statusContainer}>
      <Text
        onClick={isVisible ? onClose : onOpen}
        size={14}
        theme={500}
        className={cx(
          styles.status,
          isVisible && styles.open,
          styles[
            options.find((opt) => opt.value === selectedOption.value)?.color ||
              ""
          ],
        )}
      >
        {selectedOption.name}
      </Text>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={styles.statusDropdown}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
          >
            {options.map((option) => {
              const isActive = option.value === selectedOption.value;
              return (
                <button
                  key={option.value}
                  className={cx(styles.statusItem, isActive && styles.isActive)}
                  onClick={() => onSelect(option)}
                >
                  <Text size={12} theme={400} className={styles.text}>
                    {option.name}
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
