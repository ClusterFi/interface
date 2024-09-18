import { ComponentPropsWithoutRef, forwardRef } from "react";

type Props = ComponentPropsWithoutRef<"svg">;

export const Loader = forwardRef<SVGSVGElement, Props>(
  function Loader(props, ref) {
    return (
      <svg
        width="61"
        height="60"
        viewBox="0 0 61 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={ref}
      >
        <circle cx="31" cy="30" r="28.5" stroke="#26232C" strokeWidth="3" />
        <path
          d="M30.5702 1.50009C35.573 1.51241 40.4844 2.8414 44.8108 5.35346C49.1371 7.86553 52.726 11.4722 55.2168 15.8109C57.7075 20.1496 59.0122 25.0674 58.9999 30.0702C58.9876 35.073 57.6586 39.9844 55.1465 44.3108C52.6345 48.6371 49.0278 52.2261 44.6891 54.7168C40.3504 57.2075 35.4325 58.5122 30.4298 58.4999C25.427 58.4876 20.5156 57.1586 16.1892 54.6465C11.8629 52.1345 8.27395 48.5278 5.78324 44.1891"
          stroke="#9969FF"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    );
  },
);
