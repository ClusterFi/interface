import React from "react";
import cx from "classnames";
import styles from "./RateModel.module.scss";
import { Heading, Section, Text } from "@/components";
import { Chart } from "./Chart/Chart";

export const RateModel: React.FC = () => {
	return (
		<Section className={styles.base} containerClassName={styles.container}>
			<Heading element="h4" className={styles.heading}>
				Interest Rate Model
			</Heading>
			<div className={styles.info}>
				<div className={styles.box}>
					<Text size={14} theme={400} className={styles.subtitle}>
						Borrow APR
					</Text>
					<Heading element="h4" className={styles.text}>
						1.81%
					</Heading>
				</div>
				<div className={styles.box}>
					<Text size={14} theme={400} className={styles.subtitle}>
						Earn APR
					</Text>
					<Heading element="h4" className={styles.text}>
						0.69%
					</Heading>
				</div>
			</div>
			<Chart />
		</Section>
	);
};
