import * as React from "react";
import * as Recharts from "recharts";
import { ModalLayout } from "@/components/Modals/ModalLayout/ModalLayout";
import { Button, ModalProps, Text, CurrencyIcon, Icon } from "@/components";
import styles from "./Details.module.scss";
import Data from "../../../Overview/Chart/mock.json";

export type DetailsProps = {};

type Details = ModalProps & {
  props: DetailsProps;
};

export const Details: React.FC<Details> = ({ props, ...rest }) => {
  return (
    <ModalLayout
      title="Reserve status & configuration"
      isSwipeable
      modalClassName={styles.modal}
      {...rest}
    >
      <div className={styles.content}>
        <Text size={16} theme={600} className={styles.title}>
          Reserve status & configuration
        </Text>

        <div className={styles.flex}>
          <div className={styles.side}>
            <Text size={14} theme={600} className={styles.label}>
              Supply Info
            </Text>
          </div>
          <div className={styles.main}>
            <div></div>
            <div>
              <Chart />
            </div>
            <div>
              <div className={styles.infoLabel}>
                <Text size={14} theme={600} className={styles.label}>
                  Collateral usage
                </Text>
                <Text size={14} theme={600} className={styles.infoLabelCheck}>
                  <Icon glyph={"Check"} width={20} height={20} />
                  Can be collateral
                </Text>
              </div>
              <div className={styles.info}>
                <Button
                  title="Some info"
                  as="div"
                  size="custom"
                  variant={"stroke"}
                  className={styles.infoItem}
                >
                  <Text size={14} theme={400}>
                    Max LTV <Icon glyph={"Info"} width={12} height={12} />
                  </Text>
                  <Text size={14} theme={500}>
                    80.50%
                  </Text>
                </Button>
                <Button
                  title="Some info"
                  as="div"
                  size="custom"
                  variant={"stroke"}
                  className={styles.infoItem}
                >
                  <Text size={14} theme={400}>
                    Liquidation threshold
                    <Icon glyph={"Info"} width={12} height={12} />
                  </Text>
                  <Text size={14} theme={500}>
                    83.00%
                  </Text>
                </Button>
                <Button
                  title="Some info"
                  as="div"
                  size="custom"
                  variant="stroke"
                  className={styles.infoItem}
                >
                  <Text size={14} theme={400}>
                    Liquidation penalty
                    <Icon glyph={"Info"} width={12} height={12} />
                  </Text>
                  <Text size={14} theme={500}>
                    5.00%
                  </Text>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};

export const Chart: React.FC = () => {
  const data = Data.map((item) => ({
    date: item.date,
    apr: (Math.random() * 5).toFixed(2),
  }));

  return (
    <div className={styles.chart}>
      <div className={styles.chartContainer}>
        <Recharts.ResponsiveContainer>
          <Recharts.ComposedChart
            margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
            data={data}
          >
            <Recharts.Legend
              verticalAlign="top"
              align="left"
              iconSize={8}
              height={36}
              iconType="circle"
              formatter={(value) => (value === "apr" ? "Supply APR" : value)}
            />
            <Recharts.CartesianGrid
              strokeDasharray="3 4"
              stroke="#2E2C37"
              vertical={false}
            />
            <Recharts.XAxis
              padding={{ left: 0, right: 0 }}
              axisLine={{ stroke: "#2E2C37" }}
              tickLine={false}
              tick={{ stroke: "#2E2C37", fontSize: 12 }}
              dataKey="date"
            />
            <Recharts.YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(tick) => `${tick}%`}
              tick={{ stroke: "#2E2C37", fontSize: 12 }}
            />
            <Recharts.Line
              dataKey={"apr"}
              stroke={"#2EBAC6"}
              strokeWidth={2}
              dot={false}
              activeDot={{
                stroke: "#2EBAC6",
                fill: "#0F0E11",
                strokeWidth: 2,
                width: 12,
                height: 12,
              }}
            />
          </Recharts.ComposedChart>
        </Recharts.ResponsiveContainer>
      </div>
    </div>
  );
};
