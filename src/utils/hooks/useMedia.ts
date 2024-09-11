"use client";

import { useEffect, useState } from "react";

/* https://observablehq.com/@werehamster/avoiding-hydration-mismatch-when-using-react-hooks */
export function useMedia(mediaQueryString: string) {
  const [matches, setMatches] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQueryString);
    const listener = () => setMatches(Boolean(mediaQueryList.matches));

    /* Call the listener() function immediately to set the local
    state as soon as possible. */
    listener();
    mediaQueryList.addEventListener("change", listener);
    return () => mediaQueryList.removeEventListener("change", listener);
  }, [mediaQueryString]);

  return matches;
}

export const isReady = (value: boolean | null) => typeof value === "boolean";
