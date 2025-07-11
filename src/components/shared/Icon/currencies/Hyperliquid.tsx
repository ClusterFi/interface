import { ComponentPropsWithoutRef, forwardRef } from "react";

type Props = ComponentPropsWithoutRef<"svg">;

export const Hyperliquid = forwardRef<SVGSVGElement, Props>(
  function Hyperliquid(props, ref) {
    return (
      <svg
        width="40"
        height="41"
        viewBox="0 0 40 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={ref}
      >
        <mask
          id="path-1-outside-1_39_10976"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0.5"
          width="40"
          height="40"
          fill="black"
        >
          <rect fill="white" y="0.5" width="40" height="40" />
          <path d="M38 20.4999C38 30.4411 29.9412 38.5 20.0001 38.5C10.0589 38.5 2 30.4411 2 20.4999C2 10.5588 10.0589 2.5 20.0001 2.5C29.9411 2.5 38 10.5588 38 20.4999Z" />
        </mask>
        <path
          d="M38 20.4999C38 30.4411 29.9412 38.5 20.0001 38.5C10.0589 38.5 2 30.4411 2 20.4999C2 10.5588 10.0589 2.5 20.0001 2.5C29.9411 2.5 38 10.5588 38 20.4999Z"
          fill="#34323C"
        />
        <path
          d="M20.0001 38.5V36.5V38.5ZM36 20.4999C36 29.3365 28.8366 36.5 20.0001 36.5V40.5C31.0458 40.5 40 31.5456 40 20.4999H36ZM20.0001 36.5C11.1634 36.5 4 29.3365 4 20.4999H0C0 31.5456 8.9543 40.5 20.0001 40.5V36.5ZM4 20.4999C4 11.6634 11.1634 4.5 20.0001 4.5V0.5C8.95432 0.5 0 9.45423 0 20.4999H4ZM20.0001 4.5C28.8366 4.5 36 11.6634 36 20.4999H40C40 9.45425 31.0457 0.5 20.0001 0.5V4.5Z"
          fill="url(#paint0_linear_39_10976)"
          mask="url(#path-1-outside-1_39_10976)"
        />
        <circle cx="20" cy="20.458" r="18" fill="#072723" />
        <path
          d="M33.7669 20.475C33.7669 29.3135 28.254 32.1495 25.3493 29.6242C22.9585 27.5651 22.2471 23.214 18.6509 22.7672C14.0864 22.2039 13.6912 28.1674 10.6878 28.1674C7.19038 28.1674 6.51855 23.1751 6.51855 20.611C6.51855 17.9886 7.26941 14.4143 10.2531 14.4143C13.7308 14.4143 13.9284 19.5232 18.2754 19.2512C22.6028 18.9598 22.6818 13.6373 25.4877 11.3645C27.9378 9.40259 33.7669 11.5199 33.7669 20.475Z"
          fill="url(#paint1_linear_39_10976)"
        />
        <path
          d="M33.7669 20.475C33.7669 29.3135 28.254 32.1495 25.3493 29.6242C22.9585 27.5651 22.2471 23.214 18.6509 22.7672C14.0864 22.2039 13.6912 28.1674 10.6878 28.1674C7.19038 28.1674 6.51855 23.1751 6.51855 20.611C6.51855 17.9886 7.26941 14.4143 10.2531 14.4143C13.7308 14.4143 13.9284 19.5232 18.2754 19.2512C22.6028 18.9598 22.6818 13.6373 25.4877 11.3645C27.9378 9.40259 33.7669 11.5199 33.7669 20.475Z"
          fill="#F6FEFD"
        />
        <defs>
          <linearGradient
            id="paint0_linear_39_10976"
            x1="1.73443"
            y1="5.34615"
            x2="42.2528"
            y2="10.8919"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#1A1725" />
            <stop offset="1" stopColor="#101014" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_39_10976"
            x1="20.1427"
            y1="10.6912"
            x2="20.1427"
            y2="30.5081"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#C4ABFB" />
            <stop offset="1" stopColor="#766D8E" stopOpacity="0.28" />
          </linearGradient>
        </defs>
      </svg>
    );
  },
);
