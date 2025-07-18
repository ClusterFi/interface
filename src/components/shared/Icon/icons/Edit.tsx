import { ComponentPropsWithoutRef, forwardRef } from "react";

type Props = ComponentPropsWithoutRef<"svg">;

export const Edit = forwardRef<SVGSVGElement, Props>(function Edit(props, ref) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      ref={ref}
    >
      <path
        d="M7.41065 2.0155L0.808079 8.61855C0.774861 8.65186 0.750876 8.69393 0.739455 8.73914L0.00762279 11.6766C-0.0142684 11.765 0.0117155 11.859 0.0762469 11.9235C0.125074 11.9724 0.191604 11.9994 0.259657 11.9994C0.280501 11.9994 0.301821 11.9968 0.32257 11.9916L3.25999 11.2597C3.30577 11.2483 3.34736 11.2244 3.38058 11.1911L9.98372 4.58857L7.41065 2.0155Z"
        fill="currentColor"
      />
      <path
        d="M11.6198 1.11523L10.8848 0.38026C10.3936 -0.110959 9.53743 -0.110483 9.04678 0.38026L8.14648 1.28056L10.7195 3.85353L11.6198 2.95323C11.8651 2.70796 12.0003 2.38149 12.0003 2.03428C12.0003 1.68707 11.8651 1.3606 11.6198 1.11523Z"
        fill="currentColor"
      />
    </svg>
  );
});
