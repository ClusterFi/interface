import * as React from "react";
import cx from "classnames";

import { Section, Button, Skeleton, Table, Text, Heading } from "@/components";
import { PendingRewardItem } from "./PendingRewardItem";

import styles from "./PendingRewards.module.scss";

type PendingRewardsProps = {
  state: "default" | "loading" | "unauthorized" | "empty";
};

export const PendingRewards: React.FC<PendingRewardsProps> = ({ state }) => {
  if (state === "unauthorized") {
    return null;
  }

  return (
    <Section className={styles.base}>
      <div className={styles.head}>
        <Heading element="h4" as={"h2"} className={styles.title}>
          Pending rewards
        </Heading>
        {(() => {
          switch (state) {
            case "empty":
            case "default":
              return (
                <Button
                  size={"small"}
                  variant={"stroke-purple"}
                  disabled={state === "empty"}
                  className={styles.claim}
                >
                  <Text size={12} theme={600}>
                    Claim All
                  </Text>
                </Button>
              );
            case "loading":
              return <Skeleton className={cx(styles.claim, styles.loading)} />;
            default:
              console.warn("Unreachable branch!");
              return null;
          }
        })()}
      </div>
      {(() => {
        switch (state) {
          case "empty":
            return (
              <Text size={12} theme={400} className={styles.empty}>
                There is no pending rewards yet.
              </Text>
            );
          case "loading":
          case "default":
            return (
              <Table className={styles.table}>
                <Table.Head>
                  <Table.Row>
                    <Table.Item>Asset</Table.Item>
                    <Table.Item>Amount</Table.Item>
                    <Table.Item>Amount, $</Table.Item>
                    <Table.Item></Table.Item>
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {Array.from({ length: 1 }).map((_, index) => (
                    <PendingRewardItem
                      isLoading={state === "loading"}
                      key={index}
                    />
                  ))}
                </Table.Body>
              </Table>
            );
          default:
            console.warn("Unreachable branch!");
            return null;
        }
      })()}
    </Section>
  );
};
