import { ComponentPropsWithoutRef, forwardRef } from "react";

type Props = ComponentPropsWithoutRef<"svg">;

export const Zerion = forwardRef<SVGSVGElement, Props>(
  function Zerion(props, ref) {
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
          d="M24 12C17.3726 12 12 17.3726 12 24C12 30.6274 17.3726 36 24 36C30.6274 36 36 30.6274 36 24C36 17.3726 30.6274 12 24 12ZM22 32L32 24L22 16V32Z"
          fill="#0057FF"
        />
      </svg>
    );
  }
);
