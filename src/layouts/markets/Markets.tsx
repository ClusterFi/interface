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
                content: "$4,699,012.43",
                color: "white",
              },
              {
                title: "Total Deposits",
                content: (
                  <>
                    $4,699,012.<span>43</span>
                  </>
                ),
                color: "purple",
              },
              {
                title: "Total Borrowed",
                content: (
                  <>
                    $3,299,012.<span>15</span>
                  </>
                ),
                color: "green",
              },
            ]}
          />
        </Section>
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
              {Array.from({ length: 23 }, () => ({
                name: "Tether USDt",
                shortName: "USDT",
                token: "USDTether" as Currency,
                network: "Ethereum" as Currency,
                supply: "0.91%",
                borrow: "1.74%",
              })).map((item, index) => (
                <SwiperSlide className={styles.slide} key={index}>
                  <div className={styles.token}>
                    <div className={styles.tokenIcon}>
                      <CurrencyIcon
                        width={40}
                        height={40}
                        currency={item.token}
                      />
                      <CurrencyIcon
                        width={18}
                        height={18}
                        currency={item.network}
                      />
                    </div>
                    <Heading element="h4" className={styles.tokenName}>
                      {item.name}
                    </Heading>
                    <Text
                      size={14}
                      theme={400}
                      className={styles.tokenShortname}
                    >
                      {item.shortName}
                    </Text>
                  </div>
                  <div className={styles.tokenRow}>
                    <div className={styles.tokenBox}>
                      <Text size={14} theme={500} className={styles.tokenTitle}>
                        Supply APR
                      </Text>
                      <Heading element="h3" className={styles.tokenInfo}>
                        {item.supply}
                      </Heading>
                    </div>
                    <div className={styles.tokenBox}>
                      <Text size={14} theme={500} className={styles.tokenTitle}>
                        Borrow APR
                      </Text>
                      <Heading element="h3" className={styles.tokenInfo}>
                        {item.borrow}
                      </Heading>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
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
              {
                value: "",
                name: "",
              },
              {
                value: "",
                name: "",
              },
              {
                value: "",
                name: "",
              },
            ]}
            onSelect={() => {}}
          />
        </div>
        <div className={styles.grid}>
          <Market isLoading={false} currency={"Ethereum"} name={"Ethereum"} />
          <Market isLoading={false} currency={"Solana"} name={"Solana"} />
          <Market
            isLoading={false}
            currency={"Hyperliquid"}
            name={"Hyperliquid"}
          />
        </div>
      </Container>
    </section>
  );
};
