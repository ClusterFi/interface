import * as React from "react";
import cx from "classnames";

import { Text, Heading, Button, Skeleton } from "@/components";

import { useResizeObserver } from "usehooks-ts";
import { Chart } from "./Chart/Chart";

import styles from "./Overview.module.scss";

type OverviewProps = {
  state: "default" | "loading" | "unauthorized" | "empty";
  content: {
    title: string;
    content: React.ReactNode;
    color: "white" | "purple" | "green";
  }[];
};

export const Overview: React.FC<OverviewProps> = ({ state, content }) => {
  const chartRowRef = React.useRef<HTMLDivElement>(null);
  const { width = 0 } = useResizeObserver({
    ref: chartRowRef,
    box: "border-box",
  });
  const isLoading = state === "loading";

  return (
    <div className={styles.base}>
      <div className={styles.row}>
        <div className={styles.info}>
          {content.map((item, index) => (
            <div className={cx(styles.box, styles[item.color])} key={index}>
              <Text
                size={14}
                theme={500}
                className={cx(
                  styles.subtitle,
                  !isLoading && styles[item.color],
                )}
              >
                {isLoading ? (
                  <Skeleton className={styles.skeleton} />
                ) : (
                  item.title
                )}
              </Text>
              <Heading
                className={styles.infoText}
                element={item.color === "white" ? "h1" : "h3"}
                as="div"
              >
                {isLoading ? (
                  <Skeleton className={styles.skeleton} />
                ) : (
                  <React.Fragment>{item.content}</React.Fragment>
                )}
              </Heading>
            </div>
          ))}
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
      {isLoading ? (
        <div className={styles.chart}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              key={index}
              className={cx(styles.skeleton, styles.chart)}
            />
          ))}
          <div ref={chartRowRef} className={styles.chartRow}>
            {width !== 0 &&
              Array.from({ length: Math.round(width / 90) }).map((_, index) => (
                <Skeleton key={index} className={styles.skeleton} />
              ))}
          </div>
        </div>
      ) : (
        <Chart />
      )}
    </div>
  );
};
