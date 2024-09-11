import * as React from "react";
import cx from "classnames";

import styles from "./Section.module.scss";

type SectionProps = React.PropsWithChildren<{
  className?: string;
  containerClassName?: string;
}>;

const Section = React.forwardRef<
  React.ElementRef<"section">,
  React.ComponentPropsWithoutRef<"section"> & SectionProps
>(({ className, containerClassName, children, ...props }, forwardedRef) => (
  <section className={cx(styles.base, className)} {...props} ref={forwardedRef}>
    <div className={cx(styles.container, containerClassName)}>{children}</div>
  </section>
));

Section.displayName = "Section";
export { Section };
