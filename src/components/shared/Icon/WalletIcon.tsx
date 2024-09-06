import { ComponentPropsWithRef, forwardRef } from "react";

import * as Wallets from "./wallets";

export type Wallet = keyof typeof Wallets;

export { Wallets };

export type WalletIconProps = {
  wallet: Wallet;
} & ComponentPropsWithRef<"svg">;

export const WalletIcon = forwardRef<SVGSVGElement, WalletIconProps>(
  function WalletIcon({ wallet, ...restProps }, ref) {
    const Component = Wallets[wallet];
    if (Component) {
      return <Component {...restProps} ref={ref} />;
    }

    console.warn("Unknown icon wallet to render", wallet);
    return null;
  },
);
