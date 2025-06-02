import * as React from "react";
import Link from "next/link";
import { CircularProgress, Skeleton, Table, Text } from "@/components";
import { formatCoin, formatUSD, mediaBreaks, useMedia } from "@/utils";
import { formatCurrency, formatPercentage } from "@/utils/formatters";

import styles from "./Market.module.scss";
import { Currency } from "@/types";
import { MarketData } from "@/utils/evm/hooks/useAllMarketsData";

type MarketItemProps = {
  isLoading: boolean;
  marketData?: MarketData;
  // Fallback props for when no market data
  name?: string;
  fullName?: string;
  currency?: Currency;
};

export const MarketItem: React.FC<MarketItemProps> = ({
  isLoading,
  marketData,
  name,
  fullName,
  currency,
}) => {
  const isMobile = useMedia(mediaBreaks.max.tablet);
  const Wrapper = isMobile ? "div" : React.Fragment;
  const Row = isMobile ? "a" : Table.Row;
  const rowProps = isMobile ? { href: "/single-market" } : undefined;

  // Use market data if available, otherwise fallback to props
  const displayName = marketData?.symbol || name || "Unknown";
  const displayFullName = marketData?.name || fullName || "Unknown Token";
  const displayCurrency = currency || "USDC" as Currency; // Fallback currency

  if (isLoading) {
    return (
      <Row {...rowProps} className={styles.row}>
        <Table.ItemAsset
          currency={displayCurrency}
          primaryText="Loading..."
          secondaryText="—"
          isLoading={true}
        />
        <Wrapper className={styles.wrapper}>
          <Table.Item mobileTitle="Utilization">
            <Skeleton />
          </Table.Item>
          <Table.Item mobileTitle="Net Earn APR">
            <Skeleton />
          </Table.Item>
          <Table.Item mobileTitle="Net Borrow APR">
            <Skeleton />
          </Table.Item>
          <Table.Item mobileTitle="Total Earning">
            <Skeleton />
          </Table.Item>
          <Table.Item mobileTitle="Total Borrowing">
            <Skeleton />
          </Table.Item>
          <Table.Item mobileTitle="Total Collateral">
            <Skeleton />
          </Table.Item>
        </Wrapper>
        <Table.ItemArrow className={styles.arrow} isLoading={true} />
        {!isMobile && (
          <th className={styles.link}>
            <Link href={"/single-market"} className={styles.link} />
          </th>
        )}
      </Row>
    );
  }

  return (
    <Row {...rowProps} className={styles.row}>
      <Table.ItemAsset
        currency={displayCurrency}
        primaryText={displayFullName}
        secondaryText={displayName}
        isLoading={false}
      />
      <Wrapper className={styles.wrapper}>
        <Table.Item mobileTitle="Utilization">
          <span className={styles.progress}>
            {marketData ? formatPercentage(marketData.utilization) : "—"}
            {marketData && (
              <CircularProgress percentage={marketData.utilization} />
            )}
          </span>
        </Table.Item>
        <Table.Item mobileTitle="Net Earn APR">
          {marketData ? formatPercentage(marketData.supplyAPY) : "—"}
        </Table.Item>
        <Table.Item mobileTitle="Net Borrow APR">
          {marketData ? formatPercentage(marketData.borrowAPY) : "—"}
        </Table.Item>
        <Table.Item mobileTitle="Total Earning">
          {marketData ? formatCurrency(marketData.totalSupplyUSD) : "—"}
        </Table.Item>
        <Table.Item mobileTitle="Total Borrowing">
          {marketData ? formatCurrency(marketData.totalBorrowUSD) : "—"}
        </Table.Item>
        <Table.Item mobileTitle="Total Collateral">
          {marketData ? formatCurrency(marketData.totalCollateralUSD) : "—"}
        </Table.Item>
      </Wrapper>
      <Table.ItemArrow className={styles.arrow} isLoading={false} />
      {!isMobile && (
        <th className={styles.link}>
          <Link href={"/single-market"} className={styles.link} />
        </th>
      )}
    </Row>
  );
};
