import * as React from "react";
import Link from "next/link";
import { Skeleton, Table, Text } from "@/components";
import { formatCoin, formatUSD, mediaBreaks, useMedia } from "@/utils";

import styles from "./Assets.module.scss";
import { Currency } from "@/types";

type AssetsItemProps = {
	name: string;
	fullName: string;
	currency: Currency;
};

export const AssetsItem: React.FC<AssetsItemProps> = ({ name, fullName, currency }) => {
	const isMobile = useMedia(mediaBreaks.max.xga);

	const Wrapper = isMobile ? "div" : React.Fragment;
	return (
		<Table.Row className={styles.row}>
			<Table.ItemAsset currency={currency} primaryText={fullName} secondaryText={name} />
			<Wrapper className={styles.wrapper}>
				<Table.Item mobileTitle="Total Supply">$11.00M</Table.Item>
				<Table.Item mobileTitle="Reserves">$0.00</Table.Item>
				<Table.Item mobileTitle="Oracle Price">$2.835.02</Table.Item>
				<Table.Item mobileTitle="Collateral Factor">88%</Table.Item>
				<Table.Item mobileTitle="Liquidation Factor">$0.00</Table.Item>
			</Wrapper>
			{isMobile && <Table.ItemArrow />}
		</Table.Row>
	);
};
