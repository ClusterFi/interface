import { ComponentPropsWithoutRef, forwardRef } from "react";

type Props = ComponentPropsWithoutRef<"svg">;

export const Rabby = forwardRef<SVGSVGElement, Props>(
  function RabbyWallet(props, ref) {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={ref}
      >
        <rect width="48" height="48" rx="8" fill="white" />
        <path
          d="M12 24C12 17.3726 17.3726 12 24 12C30.6274 12 36 17.3726 36 24C36 30.6274 30.6274 36 24 36C17.3726 36 12 30.6274 12 24Z"
          fill="#FF824B"
        />
        <path d="M24 16L28 28L24 26L20 28L24 16Z" fill="white" />
      </svg>
    );
  }
);
