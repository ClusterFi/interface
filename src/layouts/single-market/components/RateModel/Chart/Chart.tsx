"use client";

import * as React from "react";
import * as Recharts from "recharts";
import { CustomXAxisTick } from "./CustomXAxisTick";
import { CustomTooltip } from "./Tooltip";

import styles from "./Chart.module.scss";
import { Text } from "@/components";

const lines: {
  dataKey: string;
  accentColor: string;
}[] = [
  {
    dataKey: "earn",
    accentColor: "#9969FF",
  },
  {
    dataKey: "borrow",
    accentColor: "#74DDE3",
  },
];

export const Chart: React.FC = () => {
  const data = [
    {
      value: 0,
      earn: 10,
      borrow: 5,
    },
    {
      value: 25,
      earn: 12,
      borrow: 7,
    },
    {
      value: 50,
      earn: 14,
      borrow: 9,
    },
    {
      value: 75,
      earn: 15,
      borrow: 10,
    },
    {
      value: 100,
      earn: 60,
      borrow: 55,
    },
  ];

  return (
    <div className={styles.base}>
      <div className={styles.container}>
        <Recharts.ResponsiveContainer>
          <Recharts.LineChart
            margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
            data={data}
          >
            <Recharts.CartesianGrid
              strokeDasharray="3 4"
              stroke="#2E2C37"
              vertical={false}
            />
            <Recharts.XAxis
              padding={{ left: 0, right: 0 }}
              axisLine={{ stroke: "#2E2C37" }}
              tick={false}
              tickLine={false}
              dataKey="value"
            />
            <Recharts.YAxis
              width={0}
              axisLine={false}
              tick={<React.Fragment />}
              tickLine={false}
            />
            <Recharts.Tooltip content={<CustomTooltip />} />
            {lines.map((line, index) => (
              <Recharts.Line
                key={index}
                dataKey={line.dataKey}
                stroke={line.accentColor}
                strokeWidth={2}
                dot={false}
                activeDot={{
                  stroke: line.accentColor,
                  fill: "#0F0E11",
                  strokeWidth: 2,
                  width: 12,
                  height: 12,
                }}
              />
            ))}
          </Recharts.LineChart>
        </Recharts.ResponsiveContainer>
        <Text size={12} theme={400} className={styles.ticks}>
          <span>0%</span> <span>100%</span>
        </Text>
      </div>
    </div>
  );
};
