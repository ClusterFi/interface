import * as React from "react";

export const CustomXAxisTick = ({ x, y, payload }: any) => {
  console.log(payload);
  return (
    <text
      x={x - 10}
      y={y + 14}
      textAnchor="center"
      fontSize={"12"}
      fontFamily={"Involve, sans-serif"}
      fill="#5C566B"
    >
      {payload.value}
    </text>
  );
};
