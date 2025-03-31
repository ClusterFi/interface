"use client";

import * as React from "react";
import { Button, CurrencyIcon, Icon, Text, CustomInput } from "@/components";
import { formatCoin, formatUSD } from "@/utils";
import { useModalsStore } from "@/utils/stores";
import styles from "../Swap.module.scss";

export const Form: React.FC = () => {
	const [value1, setValue1] = React.useState("");
	const [value2, setValue2] = React.useState("");
	const { openModal } = useModalsStore();

	return (
		<div className={styles.form}>
			<div className={styles.head}>
				<Button onClick={() => openModal("SelectToken", null)} size={"custom"} variant={"custom"} className="tokenWrap">
					<Text size={14} theme={400} className={styles.token}>
						<CurrencyIcon currency={"Ethereum"} width={20} height={20} />
						ETH
						<Icon glyph={"Anchor"} width={16} height={16} />
					</Text>
				</Button>
				<Text size={12} theme={400} className={styles.balance}>
					Balance: <span>{formatCoin(45000)}</span>
				</Text>
			</div>
			<CustomInput className={styles.input} value={value2} USDValue={formatUSD(Number(value2) * 1.2)} onClickMax={() => setValue2("1000.00")} placeholder={"0.00"} onChange={(e) => setValue2(e.target.value)} />
			<div className={styles.head}>
				<Text size={14} theme={400} className={styles.token}>
					<CurrencyIcon currency={"WrappedEETH"} width={20} height={20} /> wstETH
				</Text>
				<Text size={12} theme={400} className={styles.balance}>
					Balance: <span>{formatCoin(0)}</span>
				</Text>
			</div>
			<CustomInput className={styles.input} value={value1} USDValue={formatUSD(Number(value1) * 1.2)} onClickMax={() => setValue1("1000.00")} placeholder={"0.00"} onChange={(e) => setValue1(e.target.value)} />
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
		</div>
	);
};
