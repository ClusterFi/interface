import * as React from "react";
import Link from "next/link";
import { CircularProgress, Skeleton, Table, Text } from "@/components";
import { formatCoin, formatUSD, mediaBreaks, useMedia } from "@/utils";

import styles from "./Market.module.scss";
import { Currency } from "@/types";

type MarketItemProps = {
	isLoading: boolean;
	name: string;
	fullName: string;
	currency: Currency;
};

export const MarketItem: React.FC<MarketItemProps> = ({ isLoading, name, fullName, currency }) => {
	const isMobile = useMedia(mediaBreaks.max.tablet);
	const Wrapper = isMobile ? "div" : React.Fragment;
	const Row = isMobile ? "a" : Table.Row;
	const rowProps = isMobile ? { href: "/single-market" } : undefined;

	return (
		<Row {...rowProps} className={styles.row}>
			<Table.ItemAsset currency={currency} primaryText={fullName} secondaryText={name} isLoading={isLoading} />
			<Wrapper className={styles.wrapper}>
				<Table.Item mobileTitle="Utilization">
					<span className={styles.progress}>
						57.95% <CircularProgress percentage={Math.random() * 50 + 50} />
					</span>
				</Table.Item>
				<Table.Item mobileTitle="Net Earn APR">0.91%</Table.Item>
				<Table.Item mobileTitle="Net Borrow APR">1.74%</Table.Item>
				<Table.Item mobileTitle="Total Earning">$16.21M</Table.Item>
				<Table.Item mobileTitle="Total Borrowing">$9.32M</Table.Item>
				<Table.Item mobileTitle="Total Collateral">$11.24M</Table.Item>
			</Wrapper>
			<Table.ItemArrow className={styles.arrow} isLoading={isLoading} />
			{!isMobile && (
				<th className={styles.link}>
					<Link href={"/single-market"} className={styles.link} />
				</th>
			)}
		</Row>
	);
};
