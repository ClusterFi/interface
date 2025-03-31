import * as React from "react";
import { Icon, Button, Text, Heading, CurrencyIcon, Loader } from "@/components/shared";
import styles from "../Swap.module.scss";
import { formatCoin, formatUSD } from "@/utils";

type ConfirmSwapProps = {
	isLoading: boolean;
};

export const ConfirmSwap: React.FC<ConfirmSwapProps> = ({ isLoading }) => {
	return (
		<div className={styles.confirm}>
			<div className={styles.info}>
				<div className={styles.box}>
					<Text size={14} theme={400} className={styles.boxTitle}>
						Sell
					</Text>
					<div className={styles.boxRow}>
						<div className={styles.boxAmount}>
							<Heading element="h2" as="div">
								{formatCoin(1.134)}
							</Heading>
							<Text size={12} theme={400}>
								${formatUSD(3443.4)}
							</Text>
						</div>
						<Text size={16} theme={600} className={styles.boxToken}>
							<CurrencyIcon currency={"Ethereum"} width={22} height={22} /> ETH
						</Text>
					</div>
				</div>
				<div className={styles.box}>
					<Text size={14} theme={400} className={styles.boxTitle}>
						Buy
					</Text>
					<div className={styles.boxRow}>
						<div className={styles.boxAmount}>
							<Heading element="h2" as="div">
								{formatCoin(1.0632)}
							</Heading>
							<Text size={12} theme={400}>
								${formatUSD(3443.4)}
							</Text>
						</div>
						<Text size={16} theme={600} className={styles.boxToken}>
							<CurrencyIcon currency={"WrappedEETH"} width={22} height={22} /> wstETH
						</Text>
					</div>
				</div>
			</div>
			{isLoading ? (
				<div className={styles.loading}>
					<Loader width={60} height={60} />
					<Heading element="h3" className={styles.loadingText}>
						Approve in wallet
					</Heading>
				</div>
			) : (
				<React.Fragment>
					<Text size={14} theme={500} className={styles.row}>
						Exchange rate
						<span>1 ETH = 0.98 wstETH</span>
					</Text>
					<Text size={14} theme={500} className={styles.row}>
						Minimum wstETH received
						<span>
							1.0587
							<b>$3401.44</b>
						</span>
					</Text>
					<Text size={14} theme={500} className={styles.row}>
						Gas fee
						<span>0.05$</span>
					</Text>
					<Text size={14} theme={500} className={styles.row}>
						Slippage
						<span>
							<Icon glyph={"Edit"} />
							0,5%
						</span>
					</Text>
					<Button className={styles.submit} size={"large"} variant={"purple"}>
						Swap
					</Button>
				</React.Fragment>
			)}
		</div>
	);
};
