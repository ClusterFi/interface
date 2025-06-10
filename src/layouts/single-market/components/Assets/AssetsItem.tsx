import * as React from "react";
import Link from "next/link";
import { CircularProgress, Skeleton, Table, Text } from "@/components";
import { formatCoin, formatUSD, mediaBreaks, useMedia } from "@/utils";
import { formatCurrency } from "@/utils/formatters";

import styles from "./Assets.module.scss";
import { Currency } from "@/types";
import { type MarketData } from "@/utils/evm/hooks/useAllMarketsData";

type AssetsItemProps = {
  name: string;
  fullName: string;
  currency: Currency;
  marketData?: MarketData;
  isLoading?: boolean;
};

export const AssetsItem: React.FC<AssetsItemProps> = ({
  name,
  fullName,
  currency,
  marketData,
  isLoading = false,
}) => {
  const isMobile = useMedia(mediaBreaks.max.xga);

  const Wrapper = isMobile ? "div" : React.Fragment;
  
  if (isLoading || !marketData) {
    return (
      <Table.Row className={styles.row}>
        <Table.ItemAsset
          currency={currency}
          primaryText={fullName}
          secondaryText={name}
        />
        <Wrapper className={styles.wrapper}>
          <Table.Item mobileTitle="Total Supply">
            <Skeleton />
          </Table.Item>
          <Table.Item mobileTitle="Reserves">
            <Skeleton />
          </Table.Item>
          <Table.Item mobileTitle="Oracle Price">
            <Skeleton />
          </Table.Item>
          <Table.Item mobileTitle="Collateral Factor">
            <Skeleton />
          </Table.Item>
          <Table.Item mobileTitle="Liquidation Factor">
            <Skeleton />
          </Table.Item>
        </Wrapper>
        {isMobile && <Table.ItemArrow />}
      </Table.Row>
    );
  }

  const collateralFactor = Number(marketData.collateralFactorMantissa) / 1e18;
  const availableLiquidity = Number(marketData.cash) / 10 ** marketData.underlyingDecimals;

  return (
    <Table.Row className={styles.row}>
      <Table.ItemAsset
        currency={currency}
        primaryText={fullName}
        secondaryText={name}
      />
      <Wrapper className={styles.wrapper}>
        <Table.Item mobileTitle="Total Supply">
          <div className={styles.progress}>
            {formatCurrency(marketData.totalSupplyUSD)} 
            <CircularProgress percentage={marketData.utilization} />
          </div>
        </Table.Item>
        <Table.Item mobileTitle="Reserves">
          {formatCurrency(availableLiquidity)}
        </Table.Item>
        <Table.Item mobileTitle="Oracle Price">
          {formatCurrency(marketData.underlyingPriceUSD)}
        </Table.Item>
        <Table.Item mobileTitle="Collateral Factor">
          {(collateralFactor * 100).toFixed(0)}%
        </Table.Item>
        <Table.Item mobileTitle="Liquidation Factor">
          {formatCurrency(0)} {/* Liquidation factor would need additional contract data */}
        </Table.Item>
      </Wrapper>
      {isMobile && <Table.ItemArrow />}
    </Table.Row>
  );
};
