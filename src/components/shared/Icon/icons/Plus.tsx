import { ComponentPropsWithoutRef, forwardRef } from "react";

type Props = ComponentPropsWithoutRef<"svg">;

export const Plus = forwardRef<SVGSVGElement, Props>(function Plus(props, ref) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      ref={ref}
    >
      <path
        d="M5.95996 11.0001C8.70996 11.0001 10.96 8.75006 10.96 6.00006C10.96 3.25006 8.70996 1.00006 5.95996 1.00006C3.20996 1.00006 0.959961 3.25006 0.959961 6.00006C0.959961 8.75006 3.20996 11.0001 5.95996 11.0001Z"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 8V4"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.95996 6H7.95996"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});
