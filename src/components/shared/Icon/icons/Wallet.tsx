import { ComponentPropsWithoutRef, forwardRef } from "react";

type Props = ComponentPropsWithoutRef<"svg">;

export const Wallet = forwardRef<SVGSVGElement, Props>(
  function Wallet(props, ref) {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={ref}
      >
        <path
          d="M13.2521 5.35957H4.02029C3.78329 5.35957 3.59171 5.16757 3.59171 4.931C3.59171 4.69443 3.78329 4.50243 4.02029 4.50243H11.5511V2.89529C11.5511 2.66686 11.4487 2.45386 11.2704 2.31114C11.0913 2.16757 10.8594 2.11572 10.6383 2.16543L2.58371 3.974C2.24043 4.05114 2 4.35157 2 4.70386V13.1051C2 13.5174 2.33557 13.8534 2.74786 13.8534H13.2521C13.6644 13.8534 14 13.5179 14 13.1051V6.10743C14 5.69514 13.6644 5.35957 13.2521 5.35957ZM11.9026 10.3704C11.5019 10.3704 11.1761 10.0443 11.1761 9.64357C11.1761 9.24286 11.5023 8.91672 11.9026 8.91672C12.3037 8.91672 12.6294 9.24286 12.6294 9.64357C12.6294 10.0443 12.3037 10.3704 11.9026 10.3704Z"
          fill="currentColor"
        />
      </svg>
    );
  },
);
