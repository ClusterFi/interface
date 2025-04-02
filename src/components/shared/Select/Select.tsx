import React from "react";
import cx from "classnames";
import styles from "./Select.module.scss";
import { Button, Icon, Text } from "@/components/shared";
import { useOnClickOutside } from "usehooks-ts";
import { AnimatePresence, motion } from "framer-motion";

type SelectProps = {
  pre?: string;
  className?: string;
  options: { name: string; value: string }[];
  onSelect: (option: SelectProps["options"][0]) => void;
};

export const Select: React.FC<SelectProps> = ({
  className,
  pre,
  options,
  onSelect,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<
    SelectProps["options"][0]
  >(options[0]);

  const onOpen = () => setIsVisible(true);

  const onChange = (option: SelectProps["options"][0]) => {
    setSelectedOption(option);
    onSelect(option);
    onClose();
  };

  const onClose = () => setIsVisible(false);

  useOnClickOutside(containerRef, onClose);

  return (
    <div ref={containerRef} className={cx(styles.base, className)}>
      <Button
        onClick={isVisible ? onClose : onOpen}
        size={"custom"}
        variant={"custom"}
        className={cx(styles.trigger, isVisible && styles.open)}
      >
        <Text size={14} theme={600}>
          <span>{pre}</span>
          {selectedOption.name}
          <Icon glyph="Arrow" width={18} height={18} />
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
            {options.map((option) => {
              const isActive = option.value === selectedOption.value;
              return (
                <button
                  key={option.value}
                  className={cx(styles.item, isActive && styles.isActive)}
                  onClick={() => onChange(option)}
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
