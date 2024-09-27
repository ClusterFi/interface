import { ComponentPropsWithRef, forwardRef } from "react";

import * as Currencies from "./currencies";
import { Currency } from "@/types";

export { Currencies };

export type CurrencyIconProps = {
  currency: Currency;
} & ComponentPropsWithRef<"svg">;

export const CurrencyIcon = forwardRef<SVGSVGElement, CurrencyIconProps>(
  function CurrencyIcon({ currency, ...restProps }, ref) {
    const Component = Currencies[currency];
    if (Component) {
      return <Component {...restProps} ref={ref} />;
    }

    console.warn("Unknown icon currency to render", currency);
    return null;
  },
);
