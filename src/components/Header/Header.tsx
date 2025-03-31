"use client";

import * as React from "react";

import { useMedia, mediaBreaks } from "@/utils";

import { Mobile, Desktop } from "./variants";

type HeaderProps = {
	className?: string;
};

export const Header = ({ className }: HeaderProps) => {
	const isMobile = useMedia(mediaBreaks.max.xga);
	const Element = isMobile ? Mobile : Desktop;

	return <Element className={className} />;
};
