"use client";

import React, { ReactNode } from "react";
import styles from "./Accordion.module.scss";
import { Section } from "../Section/Section";
import { Heading } from "../Heading/Heading";
import { Button } from "../Button/Button";
import { Icon } from "../Icon";

type AccordionProps = React.PropsWithChildren<{
  title: string;
  defaultOpen?: boolean;
  customContent?: ReactNode;
}>;

export const Accordion: React.FC<AccordionProps> = ({
  title,
  defaultOpen,
  customContent,
  children,
}) => {
  const [open, setOpen] = React.useState(defaultOpen || false);

  const handleClick = () => setOpen((prev) => !prev);

  return (
    <Section className={styles.base} containerClassName={styles.base__container}>
      <div className={styles.head}>
        <Heading element="h4" className={styles.title}>
          {title}
        </Heading>
        <div className={styles.custom}>{customContent}</div>
        <Button
          onClick={handleClick}
          size={"custom"}
          variant={"custom"}
          className={styles.toggle}
        >
          {open ? (
            <React.Fragment>
              Hide <Icon glyph={"Minus"} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              Show <Icon glyph={"Plus"} />
            </React.Fragment>
          )}
        </Button>
      </div>
      {open && <div className={styles.content}>{children}</div>}
    </Section>
  );
};
