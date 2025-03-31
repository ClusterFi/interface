"use client";

import * as React from "react";
import { useControls } from "leva";
import cx from "classnames";

import { Heading, Container, NetworkSelection, Text, Button, Section, AnimatedButton } from "@/components";

import { Deposits, Borrows } from "./components";
import { getState } from "./common";

import styles from "./Dashboard.module.scss";
import Image from "next/image";

export const DashboardPage: React.FC = () => {
	const controls = useControls({
		["dashboard-state"]: {
			options: ["Default", "Not Authorized", "Empty"],
			value: "Default",
			label: "Page state",
		},
	});
	const componentState = React.useMemo(() => getState(controls["dashboard-state"]), [controls]);

	return (
		<section className={styles.base}>
			<Container className={styles.container}>
				<div className={styles.network}>
					<NetworkSelection size="large" />
					<Text size={14} theme={400} className={styles.note}>
						Main Ethereum market with the larges selection of assets and yield options
					</Text>
				</div>
				{componentState === "unauthorized" ? (
					<Section className={styles.auth}>
						<Image src={"/not-authorized.png"} quality={100} alt="not-auth" width={98} height={95} />
						<Heading className={styles.authTitle} element="h3">
							Please, connect your wallet
						</Heading>
						<Text className={styles.authText} size={14} theme={400}>
							Please connect your wallet to see your supplies, borrowings, and open positions.
						</Text>
						<AnimatedButton className={styles.authButton} size={"default"}>
							Connect wallet
						</AnimatedButton>
					</Section>
				) : (
					<React.Fragment>
						<div className={styles.info}>
							<div className={styles.box}>
								<Text className={styles.boxTitle} size={14} theme={500}>
									Net worth
								</Text>
								<Heading className={styles.boxText} element="h3">
									$150,80K
								</Heading>
							</div>
							<div className={styles.box}>
								<Text className={styles.boxTitle} size={14} theme={500}>
									Net APY
								</Text>
								<Heading className={styles.boxText} element="h3">
									-0.33%
								</Heading>
							</div>
							<div className={styles.box}>
								<Text className={styles.boxTitle} size={14} theme={500}>
									Health factor
								</Text>
								<Heading className={cx(styles.boxText, styles.green)} element="h3">
									4.99
									<Button className={styles.boxButton} size={"extra-small"} variant={"gradient-light"}>
										<Text size={12} theme={500}>
											Risk details
										</Text>
									</Button>
								</Heading>
							</div>
						</div>
						<div className={styles.inner}>
							<div className={styles.options}>
								<Button size={"small"} variant={"status-active"} className={styles.optionsItem}>
									<Text size={14} theme={600}>
										General
									</Text>
								</Button>
								<Button size={"small"} variant={"gradient-light"} className={styles.optionsItem}>
									<Text size={14} theme={600}>
										LSDs
									</Text>
								</Button>
								<Button size={"small"} variant={"gradient-light"} className={styles.optionsItem}>
									<Text size={14} theme={600}>
										Stables
									</Text>
								</Button>
							</div>
							<div className={styles.row}>
								<Deposits state={componentState} />
								<Borrows state={componentState} />
							</div>
						</div>
					</React.Fragment>
				)}
			</Container>
		</section>
	);
};
