import { ComponentPropsWithoutRef, forwardRef } from "react";

type Props = ComponentPropsWithoutRef<"svg">;

export const Ledger = forwardRef<SVGSVGElement, Props>(
  function Ledger(props, ref) {
    return (
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={ref}
      >
        <rect x="1" y="1" width="24" height="24" rx="4" fill="#0F0E11" />
        <rect
          x="0.75"
          y="0.75"
          width="24.5"
          height="24.5"
          rx="4.25"
          stroke="#F2F2F2"
          strokeOpacity="0.05"
          strokeWidth="0.5"
        />
        <g clipPath="url(#clip0_307_11072)">
          <path
            d="M6 15.7289V19.1904H11.266V18.4227H6.76727V15.7289H6ZM19.2328 15.7289V18.4227H14.734V19.1902H20V15.7289H19.2328ZM11.2736 10.4613V15.7287H14.734V15.0365H12.0409V10.4613H11.2736ZM6 6.99988V10.4613H6.76727V7.76735H11.266V6.99988H6ZM14.734 6.99988V7.76735H19.2328V10.4613H20V6.99988H14.734Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_307_11072">
            <rect
              width="14"
              height="12.1905"
              fill="white"
              transform="translate(6 6.99988)"
            />
          </clipPath>
        </defs>
      </svg>
    );
  },
);
