import { ComponentPropsWithoutRef, forwardRef } from "react";

type Props = ComponentPropsWithoutRef<"svg">;

export const Singularity = forwardRef<SVGSVGElement, Props>(function Singularity(props, ref) {
	return (
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" {...props} ref={ref}>
			<path d="M13.9259 5.92583C13.9259 8.05323 12.2014 9.77768 10.074 9.77768C9.97328 9.77768 9.86662 9.77176 9.76588 9.76583C9.61773 7.88731 8.11253 6.38212 6.23401 6.23397C6.22809 6.13323 6.22217 6.02657 6.22217 5.92583C6.22217 3.79842 7.94661 2.07397 10.074 2.07397C12.2014 2.07397 13.9259 3.79842 13.9259 5.92583Z" stroke="currentColor" stroke-width="0.888889" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M9.77743 10.0741C9.77743 12.2015 8.05299 13.9259 5.92558 13.9259C3.79817 13.9259 2.07373 12.2015 2.07373 10.0741C2.07373 7.94664 3.79817 6.2222 5.92558 6.2222C6.02632 6.2222 6.13298 6.22812 6.23372 6.23404C8.11224 6.38219 9.61744 7.88739 9.76559 9.76591C9.77151 9.86665 9.77743 9.97331 9.77743 10.0741Z" stroke="currentColor" stroke-width="0.888889" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M4.20114 2.07397H2.66632C2.3404 2.07397 2.07373 2.34064 2.07373 2.66657V4.20138C2.07373 4.72879 2.71373 4.99545 3.08706 4.62212L4.62187 3.0873C4.98928 2.71397 4.72854 2.07397 4.20114 2.07397Z" stroke="currentColor" stroke-width="0.888889" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M11.7979 13.9259H13.3327C13.6586 13.9259 13.9253 13.6592 13.9253 13.3333V11.7985C13.9253 11.2711 13.2853 11.0044 12.912 11.3778L11.3772 12.9126C11.0098 13.2859 11.2705 13.9259 11.7979 13.9259Z" stroke="currentColor" stroke-width="0.888889" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
});
