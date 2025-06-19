import * as React from "react";
import { Accordion, Heading, Icon, Section, Table, Text } from "@/components";
import { CommonInfo } from "../CommonInfo/CommonInfo";
import { BorrowItem } from "./BorrowItem";
import styles from "./Borrows.module.scss";
import { Borrow, Currency } from "@/types";
import { BorrowItemOverall } from "./BorrowItemOverall";
import Image from "next/image";
import { ComponentState } from "../helpers";
import { useGetAllMarketsForSupportedNetworks } from "@/utils/evm/hooks/useGetAllMarkets";
import { useAccount } from "wagmi";
import { useUserData } from "@/utils/evm/hooks/useUserData";
import { useMarketInfo } from "@/utils/evm/hooks/useMarketInfo";
import { SEPOLIA_CHAIN_ID, ARBITRUM_CHAIN_ID } from "@/constants";

type BorrowsProps = {
  state: ComponentState;
};

const BorrowItemWrapper: React.FC<{
  borrow: Borrow & { chainId: number };
  cb: () => void;
}> = ({ borrow, cb }) => {
  const { data: marketInfo } = useMarketInfo(
    borrow.cToken as `0x${string}`,
    borrow.chainId,
  );

  return (
    <BorrowItem
      currency={marketInfo?.name as Currency}
      name={marketInfo?.name || ""}
      amount={borrow.currentBalance}
      address={marketInfo?.underlying}
      cTokenAddress={borrow.cToken as `0x${string}`}
      chainId={borrow.chainId}
      cb={cb}
    />
  );
};

export const Borrows: React.FC<BorrowsProps> = () => {
  const { address: userAddress } = useAccount();

  const { borrows: ethereumBorrows, refresh: ethereumBorrowsRefresh } =
    useUserData(SEPOLIA_CHAIN_ID, userAddress);
  const { borrows: arbitrumBorrows, refresh: arbitrumBorrowsRefresh } =
    useUserData(ARBITRUM_CHAIN_ID, userAddress);

  const refreshBorrows = () => {
    ethereumBorrowsRefresh();
    arbitrumBorrowsRefresh();
  };

  const markets = useGetAllMarketsForSupportedNetworks();

  const allBorrows = React.useMemo(() => {
    const combined = [];
    if (ethereumBorrows) {
      combined.push(
        ...ethereumBorrows.map((borrow) => ({
          ...borrow,
          chainId: SEPOLIA_CHAIN_ID,
        })),
      );
    }
    if (arbitrumBorrows) {
      combined.push(
        ...arbitrumBorrows.map((borrow) => ({
          ...borrow,
          chainId: ARBITRUM_CHAIN_ID,
        })),
      );
    }
    return combined;
  }, [ethereumBorrows, arbitrumBorrows]);

  const consolidatedMarkets = React.useMemo(() => {
    if (!markets) return [];

    if (markets.length <= 1) {
      return markets.map(({ market, chainId }) => ({
        key: `market-${chainId}`,
        sourceAddress: market,
        sourceChainId: chainId,
        destinationChainId: chainId,
        isConsolidated: false,
        consolidatedChains: undefined,
      }));
    }

    const primaryMarket = markets[0];
    const allChains = markets.map(({ market, chainId }) => ({
      chainId,
      address: market,
    }));

    return [
      {
        key: "usdc-consolidated",
        sourceAddress: primaryMarket.market,
        sourceChainId: primaryMarket.chainId,
        destinationChainId: primaryMarket.chainId,
        isConsolidated: true,
        consolidatedChains: allChains,
      },
    ];
  }, [markets]);

  const hasBorrows =
    allBorrows.length > 0 &&
    allBorrows.some(
      (borrow) =>
        borrow.currentBalance > BigInt(0) || borrow.storedBalance > BigInt(0),
    );

  return (
    <div className={styles.base}>
      {!hasBorrows ? (
        <Section containerClassName={styles.empty}>
          <Image
            src={"/empty-borrows.png"}
            alt="empty-borrows"
            width={62}
            height={60}
            quality={100}
          />
          <Heading element="h4" className={styles.emptyTitle}>
            Nothing borrowed yet
          </Heading>
          <Text size={12} theme={400} className={styles.emptySubtitle}>
            Across all supported chains
          </Text>
        </Section>
      ) : (
        <Accordion title="Your Cross-Chain Borrows" defaultOpen>
          <CommonInfo />
          <Table className={styles.table}>
            <Table.Head>
              <Table.Row>
                <Table.Item>Asset</Table.Item>
                <Table.Item>Borrows</Table.Item>
                <Table.Item>APY</Table.Item>
                <Table.Item>Chain</Table.Item>
                <Table.Item></Table.Item>
              </Table.Row>
            </Table.Head>
            <Table.Body className={styles.body}>
              {allBorrows
                .filter(
                  (borrow) =>
                    borrow.currentBalance > BigInt(0) ||
                    borrow.storedBalance > BigInt(0),
                )
                .map((borrow, index) => (
                  <BorrowItemWrapper
                    key={`${borrow.cToken}-${borrow.chainId}-${index}`}
                    borrow={borrow}
                    cb={refreshBorrows}
                  />
                ))}
            </Table.Body>
          </Table>
        </Accordion>
      )}
      <Accordion defaultOpen title="All Borrowable Assets">
        <Text size={12} theme={400} className={styles.subtitle}>
          Access borrowable assets across supported networks.
        </Text>
        <Table className={styles.table}>
          <Table.Head>
            <Table.Row>
              <Table.Item>Asset</Table.Item>
              <Table.Item title="Max borrow based on collateral.">
                Borrow Limit
                <Icon glyph="Info" width={10} height={10} />
              </Table.Item>
              <Table.Item title="Annual interest charged on your loan.">
                APY
                <Icon glyph="Info" width={10} height={10} />
              </Table.Item>
              <Table.Item>Chain</Table.Item>
              <Table.Item></Table.Item>
            </Table.Row>
          </Table.Head>
          <Table.Body className={styles.body}>
            {consolidatedMarkets.map((market) => (
              <BorrowItemOverall
                key={market.key}
                sourceAddress={market.sourceAddress}
                sourceChainId={market.sourceChainId}
                destinationChainId={market.destinationChainId}
                isConsolidated={market.isConsolidated}
                consolidatedChains={market.consolidatedChains}
                cb={refreshBorrows}
              />
            ))}
          </Table.Body>
        </Table>
      </Accordion>
    </div>
  );
};
