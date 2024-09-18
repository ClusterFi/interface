"use client";

import * as React from "react";
import { useControls } from "leva";

import {
  Button,
  Container,
  CurrencySelection,
  Heading,
  Icon,
  Section,
  Skeleton,
  Tabs,
  Text,
} from "@/components";
import { Leverage, Deposit, Borrow, Withdraw, Repay } from "./components";

import styles from "./SingleMarket.module.scss";
import Link from "next/link";

const tabs = {
  deposit: "deposit",
  borrow: "borrow",
  withdraw: "withdraw",
  repay: "repay",
} as const;

type Tab = keyof typeof tabs;

const info: {
  title: string;
  content: string;
}[] = [
  {
    title: "Asset price",
    content: "$4.05K",
  },
  {
    title: "Total Supply",
    content: "$2.12M",
  },
  {
    title: "Total Borrow",
    content: "$4.05K",
  },
  {
    title: "Supply APY",
    content: "$2.12M",
  },
  {
    title: "Borrow APY",
    content: "$4.05K",
  },
  {
    title: "Available Liquidity",
    content: "$300.43K",
  },
];

export const SingleMarketPage: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<Tab>(tabs.deposit);
  const controls = useControls({
    ["single-market-loading"]: {
      value: false,
      label: "Is loading?",
    },
  });

  return (
    <section className={styles.base}>
      <Container className={styles.container}>
        <Link href={"/markets"} className={styles.back}>
          <Text size={14} theme={500}>
            <Icon glyph={"Arrow"} width={24} height={24} /> Markets
          </Text>
        </Link>
        <div className={styles.row}>
          <CurrencySelection variant={"gradient"} />
          <Section containerClassName={styles.box}>
            {info.map((item, index) => (
              <div key={index} className={styles.item}>
                <Text size={12} theme={400}>
                  {item.title}
                </Text>
                <Heading element="h3">
                  {controls["single-market-loading"] ? (
                    <Skeleton className={styles.skeleton} />
                  ) : (
                    item.content
                  )}
                </Heading>
              </div>
            ))}
          </Section>
        </div>
        <div className={styles.grid}>
          <Section className={styles.section}>
            <Tabs className={styles.tabs}>
              {Object.entries(tabs).map(([key, val]) => (
                <Tabs.Item
                  onClick={() => setActiveTab(key as Tab)}
                  isActive={activeTab === key}
                  key={key}
                >
                  {val}
                </Tabs.Item>
              ))}
            </Tabs>
            {(() => {
              switch (activeTab) {
                case tabs.deposit:
                  return <Deposit />;
                case tabs.borrow:
                  return <Borrow />;
                case tabs.withdraw:
                  return <Withdraw />;
                case tabs.repay:
                  return <Repay />;
                default:
                  console.warn("Unreachable branch:", activeTab);
                  break;
              }
            })()}
          </Section>
          <Section className={styles.section}>
            <Leverage />
          </Section>
        </div>
      </Container>
    </section>
  );
};
