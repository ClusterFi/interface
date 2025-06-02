"use client";

import * as React from "react";
import { useIsMounted } from "usehooks-ts";

import { Swiper, SwiperSlide } from "swiper/react";
import { Controller, Pagination, A11y } from "swiper/modules";
import "swiper/css";

import {
  Heading,
  Container,
  Overview,
  Section,
  Text,
  Table,
  CurrencyIcon,
  Button,
  Icon,
  Select,
} from "@/components";
import { Market } from "./Market/Market";

import { Currency } from "@/types";
import { useProtocolStats } from "@/utils/evm/hooks/useProtocolStats";
import { useAllMarketsData } from "@/utils/evm/hooks/useAllMarketsData";
import { formatCurrency, formatPercentage } from "@/utils/formatters";
import { CHAINS } from "@/constants";

import styles from "./Markets.module.scss";

export const MarketsPage: React.FC = () => {
  const isMounted = useIsMounted();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(isMounted());
  }, [isMounted]);

  const [isBeginning, setIsBeginning] = React.useState(true);
  const [isEnd, setIsEnd] = React.useState(false);
  const [swiper, setSwiper] = React.useState<any>(null);

  const protocolStats = useProtocolStats();
  const sepoliaMarkets = useAllMarketsData(11155111);
  const arbitrumMarkets = useAllMarketsData(421614);

  const allMarkets = React.useMemo(() => {
    return [
      ...sepoliaMarkets.markets,
      ...arbitrumMarkets.markets,
    ];
  }, [sepoliaMarkets.markets, arbitrumMarkets.markets]);

  const onSlidePrev = React.useCallback(() => {
    swiper?.slidePrev?.();
  }, [swiper]);

  const onSlideNext = React.useCallback(() => {
    swiper?.slideNext?.();
  }, [swiper]);

  const onSwiper = (swiper: any) => {
    setIsEnd(Boolean(swiper?.isEnd));
    setIsBeginning(Boolean(swiper?.isBeginning));
  };

  return (
    <section className={styles.base}>
      <Container className={styles.container}>
        <Section className={styles.overview}>
          <Overview
            state={"default"}
            content={[
              {
                title: "Total Value Locked",
                content: protocolStats.isLoading 
                  ? "Loading..." 
                  : formatCurrency(protocolStats.totalValueLocked),
                color: "white",
              },
              {
                title: "Total Deposits",
                content: protocolStats.isLoading 
                  ? "Loading..." 
                  : (
                    <>
                      {formatCurrency(protocolStats.totalDeposits, { compact: true })}
                    </>
                  ),
                color: "purple",
              },
              {
                title: "Total Borrowed",
                content: protocolStats.isLoading 
                  ? "Loading..." 
                  : (
                    <>
                      {formatCurrency(protocolStats.totalBorrowed, { compact: true })}
                    </>
                  ),
                color: "green",
              },
            ]}
          />
        </Section>

        
         {/*
         <Heading element="h3" className={styles.title}>
          Popular markets
        </Heading>
        {mounted && (
          <div className={styles.slider}>
            <Button
              disabled={isBeginning}
              className={styles.prev}
              onClick={onSlidePrev}
              size="custom"
              variant="gradient-light"
            >
              <Icon glyph={"Arrow"} width={24} height={24} />
            </Button>
            <Button
              disabled={isEnd}
              className={styles.next}
              onClick={onSlideNext}
              size="custom"
              variant="gradient-light"
            >
              <Icon glyph={"Arrow"} width={24} height={24} />
            </Button>
           
            <Swiper
              className={styles.swiper}
              pagination={{
                enabled: true,
                clickable: true,
              }}
              spaceBetween={20}
              slidesPerView={4}
              slidesPerGroup={4}
              modules={[Pagination, Controller, A11y]}
              onSwiper={setSwiper}
              onReachEnd={onSwiper}
              onReachBeginning={onSwiper}
              onSlideChange={onSwiper}
              breakpoints={{
                320: {
                  slidesPerView: "auto",
                  slidesPerGroup: 1,
                  pagination: {
                    enabled: true,
                    dynamicBullets: true,
                    dynamicMainBullets: 5,
                  },
                },
                1171: {
                  slidesPerView: 4,
                  slidesPerGroup: 4,
                },
              }}
            >
              {allMarkets.length > 0 ? (
                allMarkets.map((market, index) => (
                  <SwiperSlide className={styles.slide} key={`${market.address}-${index}`}>
                    <div className={styles.token}>
                      <div className={styles.tokenIcon}>
                        <CurrencyIcon
                          width={40}
                          height={40}
                          currency="USDTether" 
                        />
                        <CurrencyIcon
                          width={18}
                          height={18}
                          currency="Ethereum" 
                        />
                      </div>
                      <Heading element="h4" className={styles.tokenName}>
                        {market.name}
                      </Heading>
                      <Text
                        size={14}
                        theme={400}
                        className={styles.tokenShortname}
                      >
                        {market.symbol}
                      </Text>
                    </div>
                    <div className={styles.tokenRow}>
                      <div className={styles.tokenBox}>
                        <Text size={14} theme={500} className={styles.tokenTitle}>
                          Supply APR
                        </Text>
                        <Heading element="h3" className={styles.tokenInfo}>
                          {formatPercentage(market.supplyAPY)}
                        </Heading>
                      </div>
                      <div className={styles.tokenBox}>
                        <Text size={14} theme={500} className={styles.tokenTitle}>
                          Borrow APR
                        </Text>
                        <Heading element="h3" className={styles.tokenInfo}>
                          {formatPercentage(market.borrowAPY)}
                        </Heading>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                // Show loading slides
                Array.from({ length: 4 }, (_, index) => (
                  <SwiperSlide className={styles.slide} key={`loading-${index}`}>
                    <div className={styles.token}>
                      <div className={styles.tokenIcon}>
                        <CurrencyIcon
                          width={40}
                          height={40}
                          currency="USDTether"
                        />
                        <CurrencyIcon
                          width={18}
                          height={18}
                          currency="Ethereum"
                        />
                      </div>
                      <Heading element="h4" className={styles.tokenName}>
                        Loading...
                      </Heading>
                      <Text
                        size={14}
                        theme={400}
                        className={styles.tokenShortname}
                      >
                        —
                      </Text>
                    </div>
                    <div className={styles.tokenRow}>
                      <div className={styles.tokenBox}>
                        <Text size={14} theme={500} className={styles.tokenTitle}>
                          Supply APR
                        </Text>
                        <Heading element="h3" className={styles.tokenInfo}>
                          —
                        </Heading>
                      </div>
                      <div className={styles.tokenBox}>
                        <Text size={14} theme={500} className={styles.tokenTitle}>
                          Borrow APR
                        </Text>
                        <Heading element="h3" className={styles.tokenInfo}>
                          —
                        </Heading>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              )}
            </Swiper>
            
          </div>
          */}

        
        )}
        <div className={styles.sort}>
          <Select
            pre="Sort By"
            options={[
              {
                value: "Net Borrow APR",
                name: "Net Borrow APR",
              },
              {
                value: "Utilization",
                name: "Utilization",
              },
              {
                value: "Net Earn APR",
                name: "Net Earn APR",
              },
              {
                value: "Total Earning",
                name: "Total Earning",
              },
              {
                value: "Total Borrowing",
                name: "Total Borrowing",
              },
              {
                value: "Total Collateral",
                name: "Total Collateral",
              },
            ]}
            onSelect={() => {}}
          />
          <Select
            pre="Order"
            options={[
              {
                value: "Descending",
                name: "Descending",
              },
              {
                value: "Ascending",
                name: "Ascending",
              },
            ]}
            onSelect={() => {}}
          />
        </div>
        <div className={styles.grid}>
          {CHAINS.map((chain) => (
            <Market 
              key={chain.chainId}
              chainId={chain.chainId}
              isLoading={protocolStats.isLoading}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
