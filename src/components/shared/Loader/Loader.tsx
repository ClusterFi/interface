import * as React from "react";
import cx from "classnames";
import { Icon } from "@/components";
import styles from "./Loader.module.scss";

type LoaderProps = {
  className?: string;
  width: number;
  height: number;
};

export const Loader: React.FC<LoaderProps> = ({ className, ...rest }) => (
  <Icon className={cx(styles.base, className)} glyph={"Loader"} {...rest} />
);
