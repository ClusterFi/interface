"use client";

import * as React from "react";
import Link from "next/link";

import { Container, Icon, Section, Text } from "@/components";

import { Token } from "./components/Token/Token";
import { Tabs } from "./components/Tabs/Tabs";
import { Stats } from "./components/Stats/Stats";
import { Rates } from "./components/Rates/Rates";
import { RateModel } from "./components/RateModel/RateModel";
import { Assets } from "./components/Assets/Assets";
import { Wallet } from "./components/Wallet/Wallet";
import { Details } from "./components/Details/Details";

import styles from "./SingleMarket.module.scss";
import { Leverage } from "./components/Tabs/Leverage";

export const SingleMarketPage: React.FC = () => {
  return (
    <section className={styles.base}>
      <Container className={styles.container}>
        <Link href={"/markets"} className={styles.back}>
          <Text size={14} theme={500}>
            <Icon glyph={"Arrow"} width={24} height={24} /> Markets
          </Text>
        </Link>
        <div className={styles.grid}>
          <div className={styles.col}>
            <Token />
            <Stats />
            <Rates />
            <RateModel />
            <Assets />
          </div>
          <div className={styles.col}>
            <Wallet />
            <Tabs />
            <Section
              className={styles.leverage}
              containerClassName={styles.leverageContainer}
            >
              <Leverage />
            </Section>
            <Details />
          </div>
        </div>
      </Container>
    </section>
  );
};
