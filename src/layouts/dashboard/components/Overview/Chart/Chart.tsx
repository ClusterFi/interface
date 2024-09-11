"use client";

import * as React from "react";
import * as Recharts from "recharts";
import { CustomXAxisTick } from "./CustomXAxisTick";
import { CustomTooltip } from "./Tooltip";

import styles from "./Chart.module.scss";
import Data from "./mock.json";

const lines: {
  dataKey: string;
  accentColor: string;
}[] = [
  {
    dataKey: "deposits",
    accentColor: "#9969FF",
  },
  {
    dataKey: "borrows",
    accentColor: "#74DDE3",
  },
];

export const Chart: React.FC = () => {
  const data = Data.map((item) => ({
    date: item.date,
    deposits: (Math.random() * 4).toFixed(2),
    borrows: (Math.random() * 4).toFixed(2),
    tvls: (Math.random() * 8).toFixed(2),
  }));

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
              tick={<CustomXAxisTick />}
              tickLine={false}
              dataKey="date"
            />
            <Recharts.YAxis
              width={0}
              axisLine={false}
              tick={<React.Fragment />}
              tickLine={false}
            />
            <Recharts.Tooltip content={<CustomTooltip />} />
            {lines.map((line) => (
              <Recharts.Line
                key={line.dataKey}
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
      </div>
    </div>
  );
};
