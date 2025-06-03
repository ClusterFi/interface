import * as React from "react";

import { Accordion, Heading, Icon, Section, Table, Text } from "@/components";
import { ComponentState } from "../helpers";
import { CommonInfo } from "../CommonInfo/CommonInfo";
import { DepositItem } from "./DepositItem";
import { DepositItemOverall } from "./DepositItemOverall";

import styles from "./Deposits.module.scss";
import { Currency } from "@/types";
import Image from "next/image";
import { useGetAllMarkets } from "@/utils/evm/hooks/useGetAllMarkets";
import { useAccount } from "wagmi";
import { useUserData } from "@/utils/evm/hooks/useUserData";
import { useGlobalStore } from "@/utils/stores";

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
  const { chainId } = useGlobalStore();
  const { data, isPending, error } = useGetAllMarkets(chainId);
  const addresses = (data ?? []) as Address[];
  const { address: userAddress } = useAccount();
  const { supplies, isPending: isUserDataPending } = useUserData(chainId, userAddress);

  const hasSupplies =
    supplies &&
    supplies.length > 0 &&
    supplies.some((supply) => supply.balance > BigInt(0));

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
        </Section>
      ) : (
        <Accordion title="Your Supply" defaultOpen>
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
                <Table.Item />
              </Table.Row>
            </Table.Head>
            <Table.Body className={styles.body}>
              {supplies
                .filter((supply) => supply.balance > BigInt(0))
                .map((supply, index) => (
                  <DepositItem
                    key={index}
                    address={supply.cToken}
                    amount={supply.balance}
                  />
                ))}
            </Table.Body>
          </Table>
        </Accordion>
      )}
      <Accordion defaultOpen title="Available to Supply">
        {/* <label className={styles.manage}>
          <input type='checkbox' className={styles.checkbox} />
          <Text size={12} theme={400}>
            Show assets with 0 balance
          </Text>
        </label> */}
        <Table className={styles.table}>
          <Table.Head>
            <Table.Row>
              <Table.Item>Asset</Table.Item>
              <Table.Item>Wallet balance</Table.Item>
              <Table.Item title="Annual yield earned on deposits">APY
              <Icon glyph="Info" width={10} height={10} />
              </Table.Item>
              <Table.Item>Can be collateral</Table.Item>
              <Table.Item />
            </Table.Row>
          </Table.Head>
          <Table.Body className={styles.body}>
            {addresses.map((address, index) => (
              <DepositItemOverall
                key={index}
                address={address}
                chainId={chainId}
              />
            ))}
          </Table.Body>
        </Table>
      </Accordion>
    </div>
  );
};
