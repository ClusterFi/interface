import * as React from "react";

import { Heading, Section, Table, CurrencyIcon } from "@/components";
import { MarketItem } from "./MarketItem";
import styles from "./Market.module.scss";
import { Currency } from "@/types";
import { mediaBreaks, useMedia } from "@/utils";
import { useAllMarketsData } from "@/utils/evm/hooks/useAllMarketsData";
import { getChainById } from "@/constants";

type MarketProps = {
  chainId: number;
  isLoading?: boolean;
};

export const Market: React.FC<MarketProps> = ({
  chainId,
  isLoading = false,
}) => {
  const { markets, isPending } = useAllMarketsData(chainId);
  const chainInfo = getChainById(chainId);
  
  const isDataLoading = isLoading || isPending;

  return (
    <Section className={styles.base}>
      <Heading element="h4" as={"h2"} className={styles.title}>
        <CurrencyIcon currency={chainInfo?.currency || "Ethereum"} width={20} height={20} />
        {chainInfo?.name || `Chain ${chainId}`}
      </Heading>
      <Table className={styles.table}>
        <Table.Head>
          <Table.Row>
            <Table.Item>Market</Table.Item>
            <Table.Item>Utilization</Table.Item>
            <Table.Item>Net Earn APR</Table.Item>
            <Table.Item>Net Borrow APR</Table.Item>
            <Table.Item>Total Earning</Table.Item>
            <Table.Item>Total Borrowing</Table.Item>
            <Table.Item>Total Collateral</Table.Item>
            <Table.Item></Table.Item>
          </Table.Row>
        </Table.Head>
        <Table.Body className={styles.body}>
          {isDataLoading ? (

            Array.from({ length: 2 }, (_, index) => (
              <MarketItem
                key={`loading-${index}`}
                isLoading={true}
                currency="USDC"
              />
            ))
          ) : markets.length > 0 ? (
            markets.map((market) => (
              <MarketItem
                key={market.address}
                isLoading={false}
                marketData={market}
                chainId={chainId}
                currency="USDC" 
              />
            ))
          ) : ( 
            <tr>
              <td colSpan={8} style={{ textAlign: 'center', padding: '2rem' }}>
                No markets available on this network
              </td>
            </tr>
          )}
        </Table.Body>
      </Table>
    </Section>
  );
};
