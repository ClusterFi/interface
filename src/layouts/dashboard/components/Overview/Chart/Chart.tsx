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
                    <Recharts.ComposedChart
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
                        {lines.map((line, index) => (
                            <React.Fragment key={line.dataKey}>
                                <defs>
                                    <linearGradient
                                        id={"chartGradient" + index}
                                        x1="582"
                                        y1="0"
                                        x2="582"
                                        y2="250"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor={line.accentColor} />
                                        <stop offset="1" stopColor={line.accentColor} stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                <Recharts.Line
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
                                <Recharts.Area
                                    dataKey={line.dataKey}
                                    stroke={"none"}
                                    strokeWidth={2}
                                    fillOpacity={.3}
                                    fill={`url(#chartGradient${index})`}
                                />
                            </React.Fragment>
                        ))}
                    </Recharts.ComposedChart>
                </Recharts.ResponsiveContainer>
            </div>
        </div>
    );
};
