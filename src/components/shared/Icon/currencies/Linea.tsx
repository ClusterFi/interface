import { ComponentPropsWithoutRef, forwardRef } from "react";

type Props = ComponentPropsWithoutRef<"svg">;

export const Linea = forwardRef<SVGSVGElement, Props>(
  function Linea(props, ref) {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 200 208"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="199.4" height="207.623" fill="white" />
        <g clip-path="url(#clip0_2303_641)">
          <path
            d="M132.369 155.99H49.7V68.8854H68.6147V139.109H132.369V155.981V155.99Z"
            fill="#121212"
          />
          <path
            d="M132.369 85.7575C141.687 85.7575 149.241 78.2036 149.241 68.8855C149.241 59.5673 141.687 52.0134 132.369 52.0134C123.05 52.0134 115.497 59.5673 115.497 68.8855C115.497 78.2036 123.05 85.7575 132.369 85.7575Z"
            fill="#121212"
          />
        </g>
        <defs>
          <clipPath id="clip0_2303_641">
            <rect
              width="99.5407"
              height="103.977"
              fill="white"
              transform="translate(49.7 52.0134)"
            />
          </clipPath>
        </defs>
      </svg>
    );
  },
);
