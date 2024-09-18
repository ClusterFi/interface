import * as React from "react";
import cx from "classnames";
import { ModalLayout } from "@/components/Modals/ModalLayout/ModalLayout";
import {
  ModalProps,
  Button,
  Icon,
  Text,
  CurrencyIcon,
  Currency,
} from "@/components";
import { formatCoin } from "@/utils";
import styles from "./SelectToken.module.scss";

export type SelectTokenProps = null;

type SelectToken = ModalProps & {
  props: SelectTokenProps;
};

const tokens: {
  currency: Currency;
  name: string;
  shortName: string;
  amount: number;
}[] = [
  {
    currency: "Ethereum",
    name: "Ethereum",
    shortName: "ETH",
    amount: 0,
  },
  {
    currency: "USDCoin",
    name: "USD Coin",
    shortName: "USDC",
    amount: 400.12,
  },
  {
    currency: "WrappedEETH",
    name: "Wrapped eETH",
    shortName: "weETH",
    amount: 0,
  },
  {
    currency: "AnkrStakedETH",
    name: "Wrapped Staked ETH",
    shortName: "wstETH",
    amount: 0,
  },
  {
    currency: "RocketPoolETH",
    name: "Wrapped eETH",
    shortName: "eETH",
    amount: 0,
  },
  {
    currency: "USDTether",
    name: "Tether USD",
    shortName: "USDT",
    amount: 0,
  },
  {
    currency: "Polygon",
    name: "Polygon",
    shortName: "Matic",
    amount: 0,
  },
];

const popularTokens: {
  currency: Currency;
  name: string;
}[] = [
  {
    currency: "Ethereum",
    name: "ETH",
  },
  {
    currency: "USDTether",
    name: "USDT",
  },
  {
    currency: "USDCoin",
    name: "USDC",
  },
  {
    currency: "AnkrStakedETH",
    name: "weWTH",
  },
];

export const SelectToken: React.FC<SelectToken> = ({ props, ...rest }) => {
  return (
    <ModalLayout
      modalClassName={styles.modal}
      title={"Select a token"}
      isTitleVisible
      {...rest}
    >
      <div className={styles.box}>
        <div className={styles.wrapper}>
          <Icon
            glyph={"Search"}
            width={16}
            height={17}
            className={styles.icon}
          />
          <input
            type="text"
            placeholder="Token name or address"
            className={styles.input}
          />
        </div>
        <div className={styles.options}>
          {popularTokens.map((token) => (
            <Button
              key={token.name}
              size={"small"}
              variant={"gradient-dark"}
              className={styles.option}
            >
              <CurrencyIcon currency={token.currency} width={18} height={18} />
              <Text size={14} theme={500}>
                {token.name}
              </Text>
            </Button>
          ))}
        </div>
      </div>
      <div className={styles.list}>
        <div className={styles.track}>
          <Text size={12} theme={400} className={styles.title}>
            Popular tokens
          </Text>
          {tokens.map((token) => (
            <Button
              key={token.currency}
              size={"custom"}
              variant={"custom"}
              className={styles.token}
            >
              <CurrencyIcon currency={token.currency} width={33} height={33} />
              <Text size={14} theme={500} className={styles.text}>
                {token.shortName}
                <span>{token.name}</span>
              </Text>
              <Text
                size={12}
                theme={400}
                className={cx(styles.amount, !token.amount && styles.inactive)}
              >
                {formatCoin(token.amount)}
              </Text>
            </Button>
          ))}
        </div>
      </div>
    </ModalLayout>
  );
};
