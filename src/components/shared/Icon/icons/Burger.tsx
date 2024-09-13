import { ComponentPropsWithoutRef, forwardRef } from "react";

type Props = ComponentPropsWithoutRef<"svg">;

export const Burger = forwardRef<SVGSVGElement, Props>(
  function Burger(props, ref) {
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
          d="M13.6732 4.28613H2.32728C1.90181 4.28613 1.61816 4.03613 1.61816 3.66113C1.61816 3.28613 1.90181 3.03613 2.32728 3.03613H13.6732C14.0987 3.03613 14.3823 3.28613 14.3823 3.66113C14.3823 4.03613 14.0987 4.28613 13.6732 4.28613Z"
          fill="currentColor"
        />
        <path
          d="M13.6732 8.54083H2.32728C1.90181 8.54083 1.61816 8.29083 1.61816 7.91583C1.61816 7.54083 1.90181 7.29083 2.32728 7.29083H13.6732C14.0987 7.29083 14.3823 7.54083 14.3823 7.91583C14.3823 8.29083 14.0987 8.54083 13.6732 8.54083Z"
          fill="currentColor"
        />
        <path
          d="M13.6732 12.7956H2.32728C1.90181 12.7956 1.61816 12.5456 1.61816 12.1706C1.61816 11.7956 1.90181 11.5456 2.32728 11.5456H13.6732C14.0987 11.5456 14.3823 11.7956 14.3823 12.1706C14.3823 12.5456 14.0987 12.7956 13.6732 12.7956Z"
          fill="currentColor"
        />
      </svg>
    );
  },
);
