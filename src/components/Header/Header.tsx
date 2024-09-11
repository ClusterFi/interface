"use client";

import * as React from "react";
import { useControls } from "leva";

import { useMedia, mediaBreaks } from "@/utils";

import { Mobile, Desktop } from "./variants";

type HeaderProps = {
  className?: string;
};

export const Header = ({ className }: HeaderProps) => {
  const isMobile = useMedia(mediaBreaks.max.xga);
  const Element = isMobile ? Mobile : Desktop;
  const controls = useControls({
    "is-authed": {
      value: false,
      label: "Is Authed?",
    },
  });

  return <Element className={className} isAuthed={controls["is-authed"]} />;
};
