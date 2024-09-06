import { ComponentPropsWithoutRef, forwardRef } from "react";

type Props = ComponentPropsWithoutRef<"svg">;

export const Coinbase = forwardRef<SVGSVGElement, Props>(
  function Coinbase(props, ref) {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={ref}
      >
        <g clipPath="url(#clip0_307_11059)">
          <rect width="24" height="24" rx="1" fill="#0052FF" />
          <g clipPath="url(#clip1_307_11059)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.707 -0.5H19.292C22.169 -0.5 24.5 2.008 24.5 5.102V18.898C24.5 21.992 22.169 24.5 19.293 24.5H4.707C1.831 24.5 -0.5 21.992 -0.5 18.898V5.102C-0.5 2.008 1.831 -0.5 4.707 -0.5Z"
              fill="#0052FF"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.0001 3.12097C16.9041 3.12097 20.8791 7.09597 20.8791 12C20.8791 16.904 16.9041 20.879 12.0001 20.879C7.09609 20.879 3.12109 16.904 3.12109 12C3.12109 7.09597 7.09609 3.12097 12.0001 3.12097Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.81311 9.16199H14.1861C14.5461 9.16199 14.8371 9.47599 14.8371 9.86199V14.137C14.8371 14.524 14.5451 14.837 14.1861 14.837H9.81311C9.45311 14.837 9.16211 14.523 9.16211 14.137V9.86199C9.16211 9.47599 9.45411 9.16199 9.81311 9.16199Z"
              fill="#0052FF"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_307_11059">
            <rect width="24" height="24" rx="4" fill="white" />
          </clipPath>
          <clipPath id="clip1_307_11059">
            <rect
              width="25"
              height="25"
              fill="white"
              transform="translate(-0.5 -0.5)"
            />
          </clipPath>
        </defs>
      </svg>
    );
  },
);
