import React, { Fragment } from "react";
import cx from "classnames";
import styles from "./Assets.module.scss";
import { Button, Heading, Section, Table, Text } from "@/components";
import { AssetsItem } from "./AssetsItem";
import { Currency } from "@/types";

export const Assets: React.FC = () => {
	return (
		<Section className={styles.base}>
			<Heading element="h4" className={styles.title}>
				Collateral Assets
			</Heading>
			<div className={styles.options}>
				<Button size={"small"} variant={"status-active"} color={"blue"} className={styles.optionsItem}>
					<Text size={14} theme={600}>
						General
					</Text>
				</Button>
				<Button size={"small"} variant={"gradient-light"} color={"purple"} className={styles.optionsItem}>
					<Text size={14} theme={600}>
						LSDs
					</Text>
				</Button>
				<Button size={"small"} variant={"gradient-light"} color={"green"} className={styles.optionsItem}>
					<Text size={14} theme={600}>
						Stables
					</Text>
				</Button>
			</div>
			<div className={styles.scroller}>
				<Table className={styles.table}>
					<Table.Head className={styles.head}>
						<Table.Row>
							<Table.Item>Asset</Table.Item>
							<Table.Item>Total Supply</Table.Item>
							<Table.Item>Reserves</Table.Item>
							<Table.Item>Oracle Price</Table.Item>
							<Table.Item>Collateral Factor</Table.Item>
							<Table.Item>Liquidation Factor</Table.Item>
						</Table.Row>
					</Table.Head>
					<Table.Body className={styles.body}>
						{Array.from({ length: 2 }, () => ({
							currency: "Ethereum" as Currency,
							name: "rsETH",
							fullName: "KelpDao Restaked ETH",
						})).map((item, index) => {
							return <AssetsItem currency={item.currency} name={item.name} fullName={item.fullName} key={index} />;
						})}
					</Table.Body>
				</Table>
			</div>
		</Section>
	);
};
