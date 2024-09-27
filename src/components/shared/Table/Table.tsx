import * as React from "react";
import cx from "classnames";

import styles from "./Table.module.scss";
import {
  Button,
  CurrencyIcon,
  Icon,
  Skeleton,
  Text,
} from "@/components";
import { mediaBreaks, useMedia } from "@/utils";
import { Currency } from "@/types";

export type TableProps = {} & React.HTMLAttributes<HTMLElement>;

export const Table = ({ className, children, ...rest }: TableProps) => {
  return (
    <table className={cx(styles.base, className)} {...rest}>
      {children}
    </table>
  );
};

const Body: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <tbody className={cx(styles.body, className)} {...rest}>
      {children}
    </tbody>
  );
};

const Head: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <thead className={cx(styles.head, className)} {...rest}>
      {children}
    </thead>
  );
};

const Row: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <tr className={cx(styles.row, className)} {...rest}>
      {children}
    </tr>
  );
};

type ItemProps = {
  mobileTitle?: string;
} & React.HTMLAttributes<HTMLElement>;

const Item: React.FC<ItemProps> = ({
  children,
  className,
  mobileTitle,
  ...rest
}) => {
  const isMobile = useMedia(mediaBreaks.max.tablet);

  return (
    <td className={cx(styles.item, className)} {...rest}>
      {isMobile && mobileTitle && (
        <Text size={12} theme={500} className={styles.label}>
          {mobileTitle}
        </Text>
      )}
      {children}
    </td>
  );
};

type ItemAmountProps = {
  primaryValue: string;
  secondaryValue: string;
  isReward?: boolean;
  isLoading?: boolean;
} & ItemProps;

const ItemAmount: React.FC<ItemAmountProps> = ({
  children,
  className,
  primaryValue,
  secondaryValue,
  isReward,
  isLoading,
  ...rest
}) => {
  if (isLoading) {
    return (
      <Item {...rest}>
        <div className={styles.box}>
          <Skeleton className={styles.skeleton} />
          <Skeleton className={styles.skeleton} />
        </div>
      </Item>
    );
  }

  return (
    <Item {...rest}>
      <div className={styles.box}>
        <Text
          size={16}
          theme={500}
          className={cx(styles.boxRow, styles.default)}
        >
          {primaryValue}
        </Text>
        {isReward ? (
          <div className={styles.boxRow}>
            <Button
              className={styles.reward}
              as={"div"}
              size={"extra-small"}
              variant={"gradient-light"}
            >
              <Text size={12} theme={400}>
                <Icon glyph={"ClusterFlat"} width={12} height={12} />
                {secondaryValue}
              </Text>
            </Button>
          </div>
        ) : (
          <Text
            size={12}
            theme={400}
            className={cx(styles.boxRow, styles.small)}
          >
            {secondaryValue}
          </Text>
        )}
      </div>
    </Item>
  );
};

type ItemArrowProps = {
  isLoading?: boolean;
} & ItemProps;

const ItemArrow: React.FC<ItemArrowProps> = ({
  children,
  className,
  isLoading,
  ...rest
}) => {
  if (isLoading) {
    return (
      <Table.Item {...rest}>
        <Skeleton className={cx(styles.skeleton, styles.next)} />
      </Table.Item>
    );
  }

  return (
    <Item {...rest}>
      <div className={styles.next}>
        <Icon glyph={"Arrow"} width={24} height={24} />
      </div>
    </Item>
  );
};

type ItemAssetProps = {
  currency: Currency | [Currency, Currency];
  variant?: "default" | "small";
  primaryText: string;
  secondaryText?: string;
  isLoading: boolean;
} & ItemProps;

const ItemAsset: React.FC<ItemAssetProps> = ({
  children,
  className,
  variant = "default",
  currency,
  primaryText,
  secondaryText,
  isLoading,
  ...rest
}) => {
  const isMulti = Array.isArray(currency);

  if (isLoading) {
    return (
      <Item className={cx(styles[variant], className)} {...rest}>
        <div className={cx(styles.asset)}>
          <Skeleton className={styles.skeleton} />
          <Skeleton className={styles.skeleton} />
        </div>
      </Item>
    );
  }

  return (
    <Item className={cx(styles[variant], className)} {...rest}>
      <div className={cx(styles.asset, isMulti && styles.multi)}>
        {isMulti ? (
          <div className={styles.currencies}>
            {currency.map((item) => (
              <CurrencyIcon key={item} currency={item} width={40} height={40} />
            ))}
          </div>
        ) : (
          <CurrencyIcon currency={currency} width={40} height={40} />
        )}
        <div className={styles.assetContent}>
          <Text size={16} theme={500}>
            {primaryText}
          </Text>
          {secondaryText && (
            <Text size={12} theme={400}>
              {secondaryText}
            </Text>
          )}
        </div>
      </div>
    </Item>
  );
};

Table.Row = Row;
Table.Item = Item;
Table.Head = Head;
Table.Body = Body;
Table.ItemAmount = ItemAmount;
Table.ItemArrow = ItemArrow;
Table.ItemAsset = ItemAsset;
