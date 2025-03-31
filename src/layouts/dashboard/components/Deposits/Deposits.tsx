import * as React from "react";

import { Accordion, Icon, Table, Text } from "@/components";
import { ComponentState, Info } from "@/layouts/dashboard/common";
import { DepositItem } from "./DepositItem";
import { DepositItemOverall } from "./DepositItemOverall";

import styles from "./Deposits.module.scss";
import { Currency } from "@/types";

type TAsset = {
  id: string;
  name: string;
  currency: Currency;
};

const assets: TAsset[] = [
  {
    id: "0",
    name: "rETH",
    currency: "RocketPoolETH",
  }
];

type DepositsProps = {
	state: ComponentState;
};

export const Deposits: React.FC<DepositsProps> = ({ state }) => {
<<<<<<< Updated upstream
  return (
    <Section className={styles.base}>
      <Title text={"Deposits"} />
      {(() => {
        switch (state) {
          case "empty":
            return <EmptyState text={"There is no deposits yet."} />;
          case "unauthorized":
            return <UnauthorizedState />;
          default:
            return (
              <Table className={styles.table}>
                <Table.Head>
                  <Table.Row>
                    <Table.Item>Asset</Table.Item>
                    <Table.Item>Deposits</Table.Item>
                    <Table.Item>APY</Table.Item>
                    <Table.Item>Collateral</Table.Item>
                    <Table.Item></Table.Item>
                  </Table.Row>
                </Table.Head>
                <Table.Body className={styles.body}>
                  {assets.map(asset => {
                    return (
                      <DepositItem
                        isLoading={state === "loading"}
                        currency={asset.currency}
                        name={asset.name}
                        key={asset.id}
                      />
                    )
                  })}
                </Table.Body>
              </Table>
            );
        }
      })()}
    </Section>
  );
=======
	return (
		<div className={styles.base}>
			<Accordion defaultOpen title="Your supplies">
				<Info />
				<Table className={styles.table}>
					<Table.Head>
						<Table.Row>
							<Table.Item>Asset</Table.Item>
							<Table.Item>Balance</Table.Item>
							<Table.Item>APY</Table.Item>
							<Table.Item title="some info">
								Collateral
								<Icon glyph="Info" width={10} height={10} />
							</Table.Item>
							<Table.Item />
						</Table.Row>
					</Table.Head>
					<Table.Body className={styles.body}>
						{Array.from({ length: 2 }).map((_, index) => (
							<DepositItem key={index} />
						))}
					</Table.Body>
				</Table>
			</Accordion>
			<Accordion defaultOpen title="Assets to supply">
				<label className={styles.manage}>
					<input type="checkbox" className={styles.checkbox} />
					<Text size={12} theme={400}>
						Show assets with 0 balance
					</Text>
				</label>
				<Table className={styles.table}>
					<Table.Head>
						<Table.Row>
							<Table.Item>Asset</Table.Item>
							<Table.Item>Wallet balance</Table.Item>
							<Table.Item>APY</Table.Item>
							<Table.Item>Can be collateral</Table.Item>
							<Table.Item />
						</Table.Row>
					</Table.Head>
					<Table.Body className={styles.body}>
						{Array.from({ length: 2 }).map((_, index) => (
							<DepositItemOverall key={index} />
						))}
					</Table.Body>
				</Table>
			</Accordion>
		</div>
	);
>>>>>>> Stashed changes
};
