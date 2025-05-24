"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import cx from "classnames";
import { Button, Icon, Section } from "@/components/shared";
import styles from "./ModalLayout.module.scss";
import { mediaBreaks, useMedia } from "@/utils";
import { motion, useSpring } from "framer-motion";
import { SwipeEventData, useSwipeable } from "react-swipeable";
import { useOnClickOutside } from "usehooks-ts";

type ModalLayoutProps = React.PropsWithChildren<{
  open: boolean;
  contentClassName?: string;
  modalClassName?: string;
  title: string;
  isTitleVisible?: boolean;
  isSwipeable?: boolean;
  onOpenChange: (open: boolean) => void;
}>;

const INITIAL_HEIGHT = 0;

export const ModalLayout: React.FC<ModalLayoutProps> = ({
  children,
  open,
  modalClassName,
  contentClassName,
  onOpenChange,
  isTitleVisible,
  isSwipeable,
  title,
}) => {
  const isMobile = useMedia(mediaBreaks.max.tablet);
  const ref = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState(INITIAL_HEIGHT);
  const animatedSpring = useSpring(INITIAL_HEIGHT, { mass: 0.4 });
  const overlayOpacity = useSpring(1);

  const handleClose = () => {
    animatedSpring.set(INITIAL_HEIGHT);
    overlayOpacity.set(0);
    setHeight(INITIAL_HEIGHT);
    setTimeout(() => {
      onOpenChange(false);
    }, 200);
  };

  const handleOpen = () => {
    const wrapperHeight = Math.min(
      ref.current?.scrollHeight ?? INITIAL_HEIGHT,
      window.innerHeight * 0.9,
    );
    animatedSpring.set(wrapperHeight);
    overlayOpacity.set(1);
    setHeight(wrapperHeight);
  };

  const handleSwiping = (e: SwipeEventData) => {
    const correctDelta = e.deltaY;
    const offset = height - correctDelta;

    if (correctDelta < 0) {
      const value = Math.min(offset, window.innerHeight * 0.9);
      animatedSpring.set(value);
    } else {
      const value = Math.max(offset, INITIAL_HEIGHT);
      animatedSpring.set(value);
      overlayOpacity.set(Math.min(1, value / height));
    }
  };

  React.useEffect(() => {
    if (!ref.current) return;
    handleOpen();
    window.addEventListener("resize", handleClose);

    return () => {
      window.removeEventListener("resize", handleClose);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current, isMobile]);

  const handlers = useSwipeable({
    preventScrollOnSwipe: true,
    delta: 5,
    touchEventOptions: { passive: false },
    onSwiping: handleSwiping,
    onSwipedUp: handleOpen,
    onSwipedDown: handleClose,
  });

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(open) => {
        if (Boolean(isMobile && isSwipeable) && !open) {
          handleClose();
        } else {
          onOpenChange(open);
        }
      }}
    >
      <Dialog.Portal>
        {Boolean(isMobile && isSwipeable) ? (
          <React.Fragment>
            <motion.div
              style={{ opacity: overlayOpacity }}
              className={styles.backdrop}
            />
            <Dialog.Content
              aria-describedby={undefined}
              onOpenAutoFocus={(e) => e.preventDefault()}
              className={cx(styles.content, contentClassName)}
              {...handlers}
            >
              <motion.div
                className={styles.swipeable}
                style={{
                  height: animatedSpring,
                }}
                key={"modal-container"}
              >
                <Section className={cx(styles.modal, modalClassName)}>
                  <div ref={ref} className={styles.container}>
                    <Button
                      size={"custom"}
                      variant={"custom"}
                      onClick={handleClose}
                      className={styles.handler}
                    />
                    {isTitleVisible ? (
                      <Dialog.Title className={styles.title}>
                        {title}
                      </Dialog.Title>
                    ) : (
                      <VisuallyHidden.Root>
                        <Dialog.Title>{title}</Dialog.Title>
                      </VisuallyHidden.Root>
                    )}
                    {children}
                  </div>
                </Section>
              </motion.div>
            </Dialog.Content>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Dialog.Overlay className={styles.overlay} />
            <Dialog.Content
              aria-describedby={undefined}
              onOpenAutoFocus={(e) => e.preventDefault()}
              className={cx(styles.content, contentClassName)}
            >
              <Section className={cx(styles.modal, modalClassName)}>
                {isTitleVisible ? (
                  <Dialog.Title className={styles.title}>{title}</Dialog.Title>
                ) : (
                  <VisuallyHidden.Root>
                    <Dialog.Title>{title}</Dialog.Title>
                  </VisuallyHidden.Root>
                )}
                {children}
                <Dialog.Close asChild>
                  <Button
                    variant={"custom"}
                    size={"custom"}
                    className={styles.close}
                    aria-label="Close"
                  >
                    <Icon glyph={"Cross"} width={16} height={16} />
                  </Button>
                </Dialog.Close>
              </Section>
            </Dialog.Content>
          </React.Fragment>
        )}
      </Dialog.Portal>
    </Dialog.Root>
  );
};
