import * as React from "react";
import { formatCoin, formatUSD } from "@/utils";
<<<<<<< Updated upstream
import { Currency } from "@/types";

type DepositItemProps = {
  isLoading: boolean;
  currency: Currency;
  name: string;
};

export const DepositItem: React.FC<DepositItemProps> = ({
  isLoading, currency, name
}) => {
  return (
    <Table.Row className={styles.row}>
      <Table.ItemAsset
        currency={currency}
        primaryText={name}
        isLoading={isLoading}
      />
      <Table.ItemAmount
        primaryValue={formatCoin(0.159)}
        secondaryValue={"$" + formatUSD(303.0)}
        isLoading={isLoading}
        mobileTitle={"Deposits"}
      />
      <Table.ItemAmount
        primaryValue={"0.54%"}
        secondaryValue={"10.32%"}
        isReward
        isLoading={isLoading}
        mobileTitle={"APY"}
      />
      <Table.Item mobileTitle={"Collateral"}>
        {!isLoading ? (
          <Switcher
            className={styles.switcher}
            targetValue={true}
            onSwitch={(val) => console.log(val)}
          />
        ) : (
          <Skeleton className={cx(styles.skeleton, styles.switcher)} />
        )}
      </Table.Item>
      <Table.ItemArrow isLoading={isLoading} />
      <th className={styles.link}>
        <Link href={"/"} className={styles.link} />
      </th>
    </Table.Row>
  );
=======
import { Table, Switcher, Button, Text } from "@/components";
import styles from "./Deposits.module.scss";

export const DepositItem: React.FC = () => {
	return (
		<Table.Row className={styles.row}>
			<Table.ItemAsset currency={"Ethereum"} primaryText={"ETH"} />
			<Table.ItemAmount primaryValue={formatCoin(0.159)} secondaryValue={"$" + formatUSD(303.0)} mobileTitle={"Deposits"} />
			<Table.Item mobileTitle={"APY"}>1.97%</Table.Item>
			<Table.Item mobileTitle={"Collateral"}>
				<Switcher className={styles.switcher} targetValue={true} onSwitch={(val) => console.log(val)} />
			</Table.Item>
			<Table.Item>
				<Button className={styles.button} size={"small"} variant={"stroke"}>
					<Text size={12} theme={500}>
						Withdraw
					</Text>
				</Button>
			</Table.Item>
		</Table.Row>
	);
>>>>>>> Stashed changes
};
