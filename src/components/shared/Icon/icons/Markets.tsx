import { ComponentPropsWithoutRef, forwardRef } from "react";

type Props = ComponentPropsWithoutRef<"svg">;

export const Markets = forwardRef<SVGSVGElement, Props>(
  function Markets(props, ref) {
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
          d="M4.58691 12.1V10.72"
          stroke="currentColor"
          strokeLinecap="round"
        />
        <path
          d="M8 12.1001V9.34006"
          stroke="currentColor"
          strokeLinecap="round"
        />
        <path
          d="M11.4131 12.1V7.95334"
          stroke="currentColor"
          strokeLinecap="round"
        />
        <path
          d="M11.4136 3.90018L11.1069 4.26018C9.40691 6.24684 7.12691 7.65351 4.58691 8.28684"
          stroke="currentColor"
          strokeLinecap="round"
        />
        <path
          d="M9.45996 3.90018H11.4133V5.84684"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.00016 14.6667H10.0002C13.3335 14.6667 14.6668 13.3333 14.6668 9.99999V5.99999C14.6668 2.66666 13.3335 1.33333 10.0002 1.33333H6.00016C2.66683 1.33333 1.3335 2.66666 1.3335 5.99999V9.99999C1.3335 13.3333 2.66683 14.6667 6.00016 14.6667Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
);
