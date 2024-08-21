import * as React from "react";
import cx from "classnames";

import { Section, Text, Heading, Button, Skeleton } from "@/components";
import { ComponentState } from "@/layouts/dashboard/common";
import { useResizeObserver } from "usehooks-ts";

import styles from "./Overview.module.scss";

type OverviewProps = {
  state: ComponentState;
};

export const Overview: React.FC<OverviewProps> = ({ state }) => {
  const chartRowRef = React.useRef<HTMLDivElement>(null);
  const { width = 0 } = useResizeObserver({
    ref: chartRowRef,
    box: "border-box",
  });
  const isLoading = state === "loading";

  return (
    <Section className={styles.base}>
      <div className={styles.row}>
        <div className={styles.primary}>
          <Text size={12} theme={500} className={styles.subtitle}>
            {isLoading ? (
              <Skeleton className={styles.skeleton} />
            ) : (
              "Total Value Locked"
            )}
          </Text>
          <Heading className={styles.primaryText} element="h1" as="div">
            {isLoading ? (
              <Skeleton className={styles.skeleton} />
            ) : (
              <React.Fragment>
                $2,040,012<span>.15</span>
              </React.Fragment>
            )}
          </Heading>
        </div>
        <div className={styles.info}>
          <div className={styles.box}>
            <Text
              size={12}
              theme={500}
              className={cx(styles.subtitle, !isLoading && styles.purple)}
            >
              {isLoading ? (
                <Skeleton className={styles.skeleton} />
              ) : (
                "Total Deposits"
              )}
            </Text>
            <Heading className={styles.infoText} element="h3" as="div">
              {isLoading ? (
                <Skeleton className={styles.skeleton} />
              ) : (
                <React.Fragment>
                  $4,699,012<span>.43</span>
                </React.Fragment>
              )}
            </Heading>
          </div>
          <div className={styles.box}>
            <Text
              size={12}
              theme={500}
              className={cx(styles.subtitle, !isLoading && styles.green)}
            >
              {isLoading ? (
                <Skeleton className={styles.skeleton} />
              ) : (
                "Total Borrowed"
              )}
            </Text>
            <Heading className={styles.infoText} element="h3" as="div">
              {isLoading ? (
                <Skeleton className={styles.skeleton} />
              ) : (
                <React.Fragment>
                  $3,299,012<span>.15</span>
                </React.Fragment>
              )}
            </Heading>
          </div>
        </div>
        <div className={styles.filter}>
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <Skeleton className={styles.skeleton} key={index} />
            ))
          ) : (
            <React.Fragment>
              <Button
                className={styles.filterItem}
                size={"small"}
                variant={"gradient-light"}
              >
                <Text size={14} theme={600}>
                  Day
                </Text>
              </Button>
              <Button
                className={styles.filterItem}
                size={"small"}
                variant={"gradient-light"}
              >
                <Text size={14} theme={600}>
                  Week
                </Text>
              </Button>
              <Button
                className={styles.filterItem}
                size={"small"}
                variant={"gradient-light"}
                isActive
              >
                <Text size={14} theme={600}>
                  Month
                </Text>
              </Button>
            </React.Fragment>
          )}
        </div>
      </div>
      <div className={styles.chart}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className={cx(styles.skeleton, styles.chart)} />
        ))}
        <div ref={chartRowRef} className={styles.chartRow}>
          {width !== 0 &&
            Array.from({ length: Math.round(width / 90) }).map((_, index) => (
              <Skeleton key={index} className={styles.skeleton} />
            ))}
        </div>
      </div>
    </Section>
  );
};
