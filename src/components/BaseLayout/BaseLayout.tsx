"use client";

import * as React from "react";

import { Footer, Header, Modals } from "@/components";
import { useWindowSize } from "usehooks-ts";
import { Leva, useControls } from "leva";

import styles from "./BaseLayout.module.scss";
import { isReady, mediaBreaks, useMedia } from "@/utils";

type BaseLayoutProps = React.PropsWithChildren;

const BaseLayout = ({ children }: BaseLayoutProps) => {
	const { width, height } = useWindowSize();
	const isDesktop = useMedia(mediaBreaks.min.fullhd);

	React.useEffect(() => {
		document.body.style.setProperty("--vw", `${width / 100}px`);
		document.body.style.setProperty("--vh", `${height / 100}px`);
	}, [width, height]);

	if (!isReady(isDesktop)) {
		return null;
	}

	return (
		<div className={styles.base}>
			<Header className={styles.header} />
			<main className={styles.content}>{children}</main>
			<Footer className={styles.footer} />
			<Modals />
			<Leva
				titleBar={{
					position: {
						y: height - 250,
						x: 0,
					},
				}}
			/>
		</div>
	);
};

export { BaseLayout };
