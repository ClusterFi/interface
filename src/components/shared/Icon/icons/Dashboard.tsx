import { ComponentPropsWithoutRef, forwardRef } from "react";

type Props = ComponentPropsWithoutRef<"svg">;

export const Dashboard = forwardRef<SVGSVGElement, Props>(
  function Dashboard(props, ref) {
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
          d="M6.00016 14.6667H10.0002C13.3335 14.6667 14.6668 13.3333 14.6668 9.99999V5.99999C14.6668 2.66666 13.3335 1.33333 10.0002 1.33333H6.00016C2.66683 1.33333 1.3335 2.66666 1.3335 5.99999V9.99999C1.3335 13.3333 2.66683 14.6667 6.00016 14.6667Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.88721 9.66006L6.47387 7.60006C6.70054 7.30672 7.12054 7.25339 7.41387 7.48006L8.63387 8.44006C8.92721 8.66672 9.34721 8.61339 9.57387 8.32672L11.1139 6.34006"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
);
