import { ComponentPropsWithoutRef, forwardRef } from "react";

type Props = ComponentPropsWithoutRef<"svg">;

export const Anchor = forwardRef<SVGSVGElement, Props>(
  function Anchor(props, ref) {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={ref}
      >
        <path
          d="M3.92578 6.47241L7.99986 10.5465L12.0739 6.47241"
          stroke="currentColor"
          strokeWidth="1.01852"
          strokeLinecap="round"
        />
      </svg>
    );
  },
);
