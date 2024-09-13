import { ComponentPropsWithoutRef, forwardRef } from "react";

type Props = ComponentPropsWithoutRef<"svg">;

export const Cross = forwardRef<SVGSVGElement, Props>(
  function Cross(props, ref) {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={ref}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.55806 2.55806C2.80214 2.31398 3.19786 2.31398 3.44194 2.55806L8 7.11612L12.5581 2.55806C12.8021 2.31398 13.1979 2.31398 13.4419 2.55806C13.686 2.80214 13.686 3.19786 13.4419 3.44194L8.88388 8L13.4419 12.5581C13.686 12.8021 13.686 13.1979 13.4419 13.4419C13.1979 13.686 12.8021 13.686 12.5581 13.4419L8 8.88388L3.44194 13.4419C3.19786 13.686 2.80214 13.686 2.55806 13.4419C2.31398 13.1979 2.31398 12.8021 2.55806 12.5581L7.11612 8L2.55806 3.44194C2.31398 3.19786 2.31398 2.80214 2.55806 2.55806Z"
          fill="currentColor"
        />
      </svg>
    );
  },
);
