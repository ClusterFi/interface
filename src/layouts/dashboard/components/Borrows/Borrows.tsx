import * as React from "react";
import { Accordion, Heading, Icon, Section, Table } from "@/components";
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

type BorrowsProps = {
  state: ComponentState;
};

const BorrowItemWrapper: React.FC<{ borrow: Borrow }> = ({ borrow }) => {
  const { data: marketInfo } = useMarketInfo(borrow.cToken as `0x${string}`);

  return (
    <BorrowItem
      currency={marketInfo?.name as Currency}
      name={marketInfo?.name || ""}
      amount={borrow.currentBalance}
      address={marketInfo?.underlying}
    />
  );
};

export const Borrows: React.FC<BorrowsProps> = ({ state }) => {
  const { address: userAddress } = useAccount();
  const { borrows, isPending: isUserDataPending } = useUserData(
    11155111,
    userAddress,
  );

  const markets = useGetAllMarketsForSupportedNetworks();

  const hasBorrows =
    borrows &&
    borrows.length > 0 &&
    borrows.some(
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
        </Section>
      ) : (
        <Accordion title="Your borrows" defaultOpen>
          <CommonInfo />
          <Table className={styles.table}>
            <Table.Head>
              <Table.Row>
                <Table.Item>Asset</Table.Item>
                <Table.Item>Borrows</Table.Item>
                <Table.Item>APY</Table.Item>
                <Table.Item></Table.Item>
              </Table.Row>
            </Table.Head>
            <Table.Body className={styles.body}>
              {borrows
                .filter(
                  (borrow) =>
                    borrow.currentBalance > BigInt(0) ||
                    borrow.storedBalance > BigInt(0),
                )
                .map((borrow, index) => (
                  <BorrowItemWrapper key={index} borrow={borrow} />
                ))}
            </Table.Body>
          </Table>
        </Accordion>
      )}
      <Accordion defaultOpen title="Assets to borrow">
        <Table className={styles.table}>
          <Table.Head>
            <Table.Row>
              <Table.Item>Asset</Table.Item>
              <Table.Item title="some info">
                Avaliable
                <Icon glyph="Info" width={10} height={10} />
              </Table.Item>
              <Table.Item title="some info">
                APY, borrow rate
                <Icon glyph="Info" width={10} height={10} />
              </Table.Item>
              <Table.Item></Table.Item>
            </Table.Row>
          </Table.Head>
          <Table.Body className={styles.body}>
            {markets?.map(({ market, chainId }) => (
              <BorrowItemOverall
                key={`${market}-${chainId}`}
                sourceAddress={market}
                sourceChainId={chainId}
                destinationChainId={chainId}
              />
            ))}
          </Table.Body>
        </Table>
      </Accordion>
    </div>
  );
};
