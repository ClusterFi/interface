import { ComponentPropsWithoutRef, forwardRef } from "react";

type Props = ComponentPropsWithoutRef<"svg">;

export const Swap = forwardRef<SVGSVGElement, Props>(function Swap(props, ref) {
	return (
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" {...props} ref={ref}>
			<path d="M6.00016 14.6668H10.0002C13.3335 14.6668 14.6668 13.3334 14.6668 10.0001V6.00009C14.6668 2.66675 13.3335 1.33342 10.0002 1.33342H6.00016C2.66683 1.33342 1.3335 2.66675 1.3335 6.00009V10.0001C1.3335 13.3334 2.66683 14.6668 6.00016 14.6668Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M11.4324 9.2139L9.40576 11.2406" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M4.56641 9.2139H11.4331" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M4.56641 6.78611L6.59307 4.75945" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M11.4331 6.78622H4.56641" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
});
