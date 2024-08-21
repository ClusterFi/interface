import * as React from "react";
import cx from "classnames";
import Link from "next/link";
import Image from "next/image";

import styles from "./Logotype.module.scss";

type LogotypeProps = {
  className?: string;
};

const Logotype = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & LogotypeProps
>(({ className, ...props }, forwardedRef) => (
  <Link
    href={"/"}
    className={cx(styles.base, className)}
    {...props}
    ref={forwardedRef}
  >
    <Image src={"/logotype.svg"} alt="Logotype" width={93} height={30} />
  </Link>
));

Logotype.displayName = "Logotype";
export { Logotype };
