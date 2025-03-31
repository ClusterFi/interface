import { ComponentPropsWithoutRef, forwardRef } from "react";

type Props = ComponentPropsWithoutRef<"svg">;

export const WrappedStakedETH = forwardRef<SVGSVGElement, Props>(
  function WrappedStakedETH(props, ref) {
    return (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={ref}
      >
        <mask
          id="path-1-outside-1"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="28"
          height="28"
          fill="black"
        >
          <rect fill="white" x="0" y="0" width="28" height="28" />
          <path d="M25.934 14C25.934 20.5928 20.5898 25.9371 13.9973 25.9371C7.40479 25.9371 2.06055 20.5928 2.06055 14C2.06055 7.40784 7.40479 2.0636 13.9973 2.0636C20.5897 2.0636 25.934 7.40784 25.934 14Z" />
        </mask>
        <path
          d="M25.934 14C25.934 20.5928 20.5898 25.9371 13.9973 25.9371C7.40479 25.9371 2.06055 20.5928 2.06055 14C2.06055 7.40784 7.40479 2.0636 13.9973 2.0636C20.5897 2.0636 25.934 7.40784 25.934 14Z"
          fill="#41a0e0"
        />
        <path
          d="M13.9973 25.9371V24.5657V25.9371ZM24.5625 14C24.5625 19.8354 19.8323 24.5657 13.9973 24.5657V27.3086C21.3472 27.3086 27.3054 21.3502 27.3054 14H24.5625ZM13.9973 24.5657C8.16222 24.5657 3.43198 19.8354 3.43198 14H0.689118C0.689118 21.3502 6.64736 27.3086 13.9973 27.3086V24.5657ZM3.43198 14C3.43198 8.16527 8.1622 3.43503 13.9973 3.43503V0.69217C6.64737 0.69217 0.689118 6.65042 0.689118 14H3.43198ZM13.9973 3.43503C19.8323 3.43503 24.5625 8.16525 24.5625 14H27.3054C27.3054 6.65043 21.3471 0.69217 13.9973 0.69217V3.43503Z"
          fill="url(#paint0_linear)"
          mask="url(#path-1-outside-1)"
        />
        <path d="M14 7L14 15L20 12L14 7Z" fill="white" />
        <path d="M14 7L8 12L14 15L14 7Z" fill="white" />
        <path d="M14 18L14 23L20 16L14 18Z" fill="white" />
        <path d="M14 23L8 16L14 18V23Z" fill="white" />
        <path d="M14 15L20 12L14 10V15Z" fill="white" />
        <path d="M8 12L14 15V10L8 12Z" fill="white" />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="2"
            y1="15"
            x2="26"
            y2="15"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3F99F1" />
            <stop offset="1" stopColor="#41a0e0" />
          </linearGradient>
        </defs>
      </svg>
    );
  },
);
