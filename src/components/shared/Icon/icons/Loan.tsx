import { ComponentPropsWithoutRef, forwardRef } from "react";

type Props = ComponentPropsWithoutRef<"svg">;

export const Loan = forwardRef<SVGSVGElement, Props>(function Loan(props, ref) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      ref={ref}
    >
      <path
        d="M14.5183 10.3526C14.5183 12.646 12.6635 14.5008 10.3701 14.5008L10.9923 13.4637"
        stroke="currentColor"
        strokeWidth="0.888889"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.48145 5.61186C1.48145 3.31853 3.33626 1.46371 5.62959 1.46371L5.00737 2.50075"
        stroke="currentColor"
        strokeWidth="0.888889"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.68857 9.97343C9.68857 11.9942 8.05301 13.6297 6.03227 13.6297C4.01153 13.6297 2.37598 11.9942 2.37598 9.97343C2.37598 7.95269 4.01153 6.31711 6.03227 6.31711C6.12709 6.31711 6.21598 6.32305 6.31672 6.32897C8.11227 6.46527 9.54635 7.89934 9.68264 9.69489C9.68264 9.78378 9.68857 9.87269 9.68857 9.97343Z"
        stroke="currentColor"
        strokeWidth="0.888889"
        stroke-miterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.629 6.0268C13.629 8.04754 11.9934 9.68312 9.9727 9.68312H9.68233C9.54604 7.88757 8.11196 6.45346 6.31641 6.31716V6.0268C6.31641 4.00606 7.95196 2.37051 9.9727 2.37051C11.9934 2.37051 13.629 4.00606 13.629 6.0268Z"
        stroke="currentColor"
        strokeWidth="0.888889"
        stroke-miterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});
