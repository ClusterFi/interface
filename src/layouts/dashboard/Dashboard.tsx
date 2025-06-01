"use client";

import * as React from "react";
import { useControls } from "leva";
import cx from "classnames";
import { useAccount, useChainId } from "wagmi";
import { useMemo } from "react";
import { Address } from "viem";
import { formatNumberCompact } from "@/utils";
import { CONTRACT_ADDRESSES } from "@/utils/evm/contracts";
import { useGetAllMarkets } from "@/utils/evm/hooks/useGetAllMarkets";
import { useMultiNetworkStats } from "@/utils/evm/hooks/useMultiNetworkStats";

import {
  Heading,
  Container,
  Tabs as CustomTabs,
  Text,
  Button,
  Section,
  AnimatedButton,
} from "@/components";

import { Deposits, Borrows } from "./components";
import { getState } from "./components/helpers";

import styles from "./Dashboard.module.scss";
import Image from "next/image";
import { mediaBreaks, useMedia } from "@/utils";
import { AssetInfo } from "@/types";
import { ARBITRUM_CHAIN_ID, SEPOLIA_CHAIN_ID } from "@/constants";

const tabs = {
  supply: "supply",
  borrow: "borrow",
} as const;

type Tab = keyof typeof tabs;

export const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<Tab>(tabs.supply);
  const [activeNav, setActiveNav] = React.useState(0);
  const isMobile = useMedia(mediaBreaks.max.xga);
  const controls = useControls({
    ["dashboard-state"]: {
      options: ["Default", "Not Authorized", "Empty"],
      value: "Default",
      label: "Page state",
    },
  });
  const componentState = "default" as any;
  const { address: userAddress } = useAccount();
  const isConnected = !!userAddress;
  const chainId = useChainId();
  const {
    data: rawMarkets,
    isPending: isMarketsPending,
    error: marketsError,
  } = useGetAllMarkets(chainId);

  const markets = rawMarkets as Address[];

  const asset = useMemo<AssetInfo | undefined>(() => {
    if (!markets || markets.length === 0) return undefined;

    return {
      cTokenAddress: markets[0] as Address,
      underlyingDecimals: 18,
    };
  }, [markets]);

  const {
    stats: statsAcrossChains,
    aggregate,
    isPending,
    error,
  } = useMultiNetworkStats({
    userAddress,
    comptrollerAddresses: {
      [SEPOLIA_CHAIN_ID]: CONTRACT_ADDRESSES.sepolia.comptroller as Address,
      [ARBITRUM_CHAIN_ID]: CONTRACT_ADDRESSES.arbitrum_sepolia
        .comptroller as Address,
    },
  });

  const renderValue = (
    value: string | number | undefined,
    suffix = "",
    prefix = "",
  ) =>
    isPending
      ? "Loading..."
      : value === undefined || value === null || !userAddress || !aggregate
        ? "-"
        : `${prefix}${value}${suffix}`;

  return (
    <section className={styles.base}>
      <Container className={styles.container}>
        {/*   <div className={styles.network}> */}
        {/*    <NetworkSelection className={styles.networkSelect} size='large' /> */}
        {/*   <Text size={14} theme={400} className={styles.note}>
            Main Ethereum market with the larges selection of assets and yield
            options
          </Text> */}
        {/*   </div> */}
        {componentState === "unauthorized" ? (
          <Section className={styles.auth}>
            <Image
              src={"/not-authorized.png"}
              quality={100}
              alt="not-auth"
              width={98}
              height={95}
            />
            <Heading className={styles.authTitle} element="h3">
              Please, connect your wallet
            </Heading>
            <Text className={styles.authText} size={14} theme={400}>
              Please connect your wallet to see your supplies, borrowings, and
              open positions.
            </Text>
            <AnimatedButton className={styles.authButton} size={"default"}>
              Connect wallet
            </AnimatedButton>
          </Section>
        ) : (
          <React.Fragment>
            {isConnected && (
              <div className={styles.info}>
                <div className={styles.box}>
                  <Text className={styles.boxTitle} size={14} theme={500}>
                    Net worth
                  </Text>
                  <Heading className={styles.boxText} element="h3">
                    {renderValue(
                      aggregate?.netWorth !== undefined
                        ? formatNumberCompact(aggregate.netWorth, 2)
                        : undefined,
                      "",
                      "$",
                    )}{" "}
                  </Heading>
                </div>
                <div className={styles.box}>
                  <Text className={styles.boxTitle} size={14} theme={500}>
                    Net APY
                  </Text>
                  <Heading className={styles.boxText} element="h3">
                    <span>
                      {renderValue(
                        aggregate?.netApy !== undefined
                          ? Number(aggregate.netApy).toFixed(2)
                          : undefined,
                        "%",
                      )}
                    </span>
                  </Heading>
                </div>
                <div className={styles.box}>
                  <Text className={styles.boxTitle} size={14} theme={500}>
                    Health factor
                  </Text>
                  <Heading
                    className={cx(styles.boxText, styles.green)}
                    element="h3"
                  >
                    {renderValue(aggregate?.healthFactor?.toFixed(2))}
                    <Button
                      className={styles.boxButton}
                      size={"extra-small"}
                      variant={"gradient-light"}
                    >
                      <Text size={12} theme={500}>
                        Risk details
                      </Text>
                    </Button>
                  </Heading>
                </div>
              </div>
            )}
            {isMobile && (
              <CustomTabs className={styles.tabs}>
                {Object.entries(tabs).map(([key, val]) => (
                  <CustomTabs.Item
                    onClick={() => setActiveTab(key as Tab)}
                    isActive={activeTab === key}
                    key={key}
                  >
                    {val}
                  </CustomTabs.Item>
                ))}
              </CustomTabs>
            )}
            <div className={styles.inner}>
              <div className={styles.options}>
                <Button
                  onClick={() => setActiveNav(0)}
                  size={"small"}
                  variant={activeNav === 0 ? "status-active" : "gradient-light"}
                  color="blue"
                  className={styles.optionsItem}
                >
                  <Text size={14} theme={600}>
                    General
                  </Text>
                </Button>
                <Button
                  onClick={() => setActiveNav(1)}
                  size={"small"}
                  variant={activeNav === 1 ? "status-active" : "gradient-light"}
                  color="purple"
                  className={styles.optionsItem}
                >
                  <Text size={14} theme={600}>
                    LSDs
                  </Text>
                </Button>
                <Button
                  onClick={() => setActiveNav(2)}
                  size={"small"}
                  variant={activeNav === 2 ? "status-active" : "gradient-light"}
                  color="green"
                  className={styles.optionsItem}
                >
                  <Text size={14} theme={600}>
                    Stables
                  </Text>
                </Button>
              </div>
              <div className={styles.row}>
                {Boolean(!isMobile || activeTab === tabs.supply) && (
                  <Deposits state={componentState} />
                )}
                {Boolean(!isMobile || activeTab === tabs.borrow) && (
                  <Borrows state={componentState} />
                )}
              </div>
            </div>
          </React.Fragment>
        )}
      </Container>
    </section>
  );
};
