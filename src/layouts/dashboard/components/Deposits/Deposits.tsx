import * as React from "react";

import { Accordion, Heading, Icon, Section, Table, Text } from "@/components";
import { ComponentState } from "../helpers";
import { CommonInfo } from "../CommonInfo/CommonInfo";
import { DepositItem } from "./DepositItem";
import { DepositItemOverall } from "./DepositItemOverall";

import styles from "./Deposits.module.scss";
import { Currency } from "@/types";
import Image from "next/image";
import { useGetAllMarketsForSupportedNetworks } from "@/utils/evm/hooks/useGetAllMarkets";
import { useAccount } from "wagmi";
import { useUserData } from "@/utils/evm/hooks/useUserData";
import { SEPOLIA_CHAIN_ID, ARBITRUM_CHAIN_ID } from "@/constants";

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
  },
];

type DepositsProps = {
  state: ComponentState;
};

export const Deposits: React.FC<DepositsProps> = ({ state }) => {
  type Address = `0x${string}`;
  const { address: userAddress } = useAccount();

  const allMarketsData = useGetAllMarketsForSupportedNetworks();

  const { supplies: ethereumSupplies, isPending: isEthereumPending } =
    useUserData(SEPOLIA_CHAIN_ID, userAddress);
  const { supplies: arbitrumSupplies, isPending: isArbitrumPending } =
    useUserData(ARBITRUM_CHAIN_ID, userAddress);

  React.useEffect(() => {
    console.log("Cross-Chain Supply Data Debug:", {
      userAddress,
      ethereumSupplies: ethereumSupplies?.length || 0,
      arbitrumSupplies: arbitrumSupplies?.length || 0,
      isEthereumPending,
      isArbitrumPending,
      ethereumSuppliesData: ethereumSupplies,
      arbitrumSuppliesData: arbitrumSupplies,
    });
  }, [
    userAddress,
    ethereumSupplies,
    arbitrumSupplies,
    isEthereumPending,
    isArbitrumPending,
  ]);

  const allSupplies = React.useMemo(() => {
    const combined = [];
    if (ethereumSupplies) {
      combined.push(
        ...ethereumSupplies.map((supply) => ({
          ...supply,
          chainId: SEPOLIA_CHAIN_ID,
        }))
      );
    }
    if (arbitrumSupplies) {
      combined.push(
        ...arbitrumSupplies.map((supply) => ({
          ...supply,
          chainId: ARBITRUM_CHAIN_ID,
        }))
      );
    }
    return combined;
  }, [ethereumSupplies, arbitrumSupplies]);

  const hasSupplies =
    allSupplies.length > 0 &&
    allSupplies.some((supply) => supply.balance > BigInt(0));

  return (
    <div className={styles.base}>
      {!hasSupplies ? (
        <Section containerClassName={styles.empty}>
          <Image
            src={"/empty-deposits.png"}
            alt="empty-deposits"
            width={62}
            height={60}
            quality={100}
          />
          <Heading element="h4" className={styles.emptyTitle}>
            Nothing supplied yet
          </Heading>
          <Text size={12} theme={400} className={styles.emptySubtitle}>
            Across all supported chains
          </Text>
        </Section>
      ) : (
        <Accordion title="Your Cross-Chain Supply" defaultOpen>
          <CommonInfo />
          <Table className={styles.table}>
            <Table.Head>
              <Table.Row>
                <Table.Item>Asset</Table.Item>
                <Table.Item>Balance</Table.Item>
                <Table.Item>APY</Table.Item>
                <Table.Item title="Toggle to use as collateral.">
                  Collateral
                  <Icon glyph="Info" width={10} height={10} />
                </Table.Item>
                <Table.Item>Chain</Table.Item>
                <Table.Item />
              </Table.Row>
            </Table.Head>
            <Table.Body className={styles.body}>
              {allSupplies
                .filter((supply) => supply.balance > BigInt(0))
                .map((supply, index) => (
                  <DepositItem
                    key={`${supply.cToken}-${supply.chainId}-${index}`}
                    address={supply.cToken}
                    amount={supply.balance}
                    chainId={supply.chainId}
                  />
                ))}
            </Table.Body>
          </Table>
        </Accordion>
      )}
      <Accordion defaultOpen title="All Suppliable Assets">
        <Text size={12} theme={400} className={styles.subtitle}>
          Assets available across supported networks.
        </Text>
        <Table className={styles.table}>
          <Table.Head>
            <Table.Row>
              <Table.Item>Asset</Table.Item>
              <Table.Item>Holdings</Table.Item>
              <Table.Item title="Annual yield earned on deposits">
                APY
                <Icon glyph="Info" width={10} height={10} />
              </Table.Item>
              <Table.Item>Collateral</Table.Item>
              <Table.Item>Chain</Table.Item>
              <Table.Item />
            </Table.Row>
          </Table.Head>
          <Table.Body className={styles.body}>
            {allMarketsData?.map(({ market, chainId }) => (
              <DepositItemOverall
                key={`${market}-${chainId}`}
                address={market}
                chainId={chainId}
              />
            ))}
          </Table.Body>
        </Table>
      </Accordion>
    </div>
  );
};
