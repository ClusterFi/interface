"use client";

import * as React from "react";
import cx from "classnames";
import { useControls } from "leva";

import {
  Heading,
  Container,
  Text,
  Icon,
  Button,
  PendingRewards,
  Skeleton,
  Section,
} from "@/components";
import { TreasurySwap, Withdraw, Deposit, Epoch } from "./components";

import styles from "./Singularity.module.scss";

const tabs = {
  deposit: "deposit",
  withdraw: "withdraw",
} as const;

type Tabs = keyof typeof tabs;

export const SingularityPage: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<Tabs>(tabs.deposit);
  const controls = useControls({
    ["Is Loading?"]: false,
  });
  const isLoading = controls["Is Loading?"] === true;

  return (
    <section className={styles.base}>
      <Container className={styles.container}>
        <Heading element="h2" as="h1" className={styles.title}>
          Staking
          <Button
            className={styles.more}
            size={"small"}
            variant={"gradient-light"}
          >
            <Text size={12} theme={600}>
              Read more
            </Text>
            <Icon glyph={"Lamp"} width={15} height={15} />
          </Button>
        </Heading>
        <div className={styles.tabs}>
          {Object.keys(tabs).map((tab) => (
            <Button
              className={cx(styles.tab, tab === activeTab && styles.active)}
              variant={"custom"}
              size={"custom"}
              key={tab}
              onClick={() => setActiveTab(tab as Tabs)}
            >
              <Heading element="h4" as={"p"}>
                {tab}
              </Heading>
            </Button>
          ))}
        </div>
        <div className={styles.grid}>
          <Section className={styles.box}>
            {(() => {
              switch (activeTab) {
                case tabs.deposit:
                  return <Deposit isLoading={isLoading} />;
                case tabs.withdraw:
                  return <Withdraw isLoading={isLoading} />;
                default:
                  return null;
              }
            })()}
          </Section>
          <TreasurySwap />
        </div>
        <Heading element="h2" as="h2" className={styles.title}>
          My Rewards
          {isLoading ? (
            <Skeleton className={cx(styles.epochs, styles.skeleton)} />
          ) : (
            <div className={styles.epochWrapper}>
              <Button
                className={styles.epochs}
                size={"small"}
                variant={"gradient-dark"}
              >
                <Text size={12} theme={600}>
                  Consecutive Epochs:&nbsp;<span>22</span>
                </Text>
                <Icon glyph={"Info"} width={15} height={15} />
              </Button>
              <Epoch className={styles.epoch} />
            </div>
          )}
        </Heading>
        <PendingRewards state={isLoading ? "loading" : "default"} />
      </Container>
    </section>
  );
};
