"use client";

import * as React from "react";
import Link from "next/link";

import { Button, Container, Icon, Section, Text } from "@/components";

import { Token } from "./components/Token/Token";
import { Tabs } from "./components/Tabs/Tabs";
import { Stats } from "./components/Stats/Stats";
import { Rates } from "./components/Rates/Rates";
import { RateModel } from "./components/RateModel/RateModel";
import { Assets } from "./components/Assets/Assets";
import { Wallet } from "./components/Wallet/Wallet";
import { Details } from "./components/Details/Details";

import styles from "./SingleMarket.module.scss";
import { Leverage } from "./components/Tabs/Leverage";
import { mediaBreaks, useMedia } from "@/utils";
import { useModalsStore } from "@/utils/stores";
import {
  useAllMarketsData,
  type MarketData,
} from "@/utils/evm/hooks/useAllMarketsData";
import { SEPOLIA_CHAIN_ID } from "@/constants";

export const MarketDataContext = React.createContext<{
  marketData: MarketData | null;
  isLoading: boolean;
  chainId?: number;
}>({
  marketData: null,
  isLoading: false,
  chainId: undefined,
});

export const useMarketData = () => React.useContext(MarketDataContext);

export const Column: React.FC<React.PropsWithChildren> = ({ children }) => {
  const isMobile = useMedia(mediaBreaks.max.tablet);

  if (!isMobile) {
    return <div className={styles.col}>{children}</div>;
  }

  return children;
};

type SingleMarketPageProps = {
  marketAddress?: `0x${string}`;
  chainId?: number;
};

export const SingleMarketPage: React.FC<SingleMarketPageProps> = ({
  marketAddress,
  chainId = SEPOLIA_CHAIN_ID, // Default to Ethereum Sepolia
}) => {
  const isMobile = useMedia(mediaBreaks.max.tablet);
  const { openModal } = useModalsStore();

  // Fetch market data
  const { markets, isPending } = useAllMarketsData(chainId);

  // Find the specific market by address
  const marketData = React.useMemo(() => {
    if (!marketAddress || !markets.length) return null;
    return (
      markets.find(
        (market) =>
          market.address.toLowerCase() === marketAddress.toLowerCase(),
      ) || null
    );
  }, [markets, marketAddress]);

  const contextValue = React.useMemo(
    () => ({
      marketData,
      isLoading: isPending,
      chainId,
    }),
    [marketData, isPending, chainId],
  );

  return (
    <MarketDataContext.Provider value={contextValue}>
      <section className={styles.base}>
        <Container className={styles.container}>
          {isMobile && (
            <div className={styles.fixed}>
              <Container className={styles.subcontainer}>
                <Button
                  onClick={() => openModal("TabsModal", { activeTab: 0 })}
                  size="medium"
                  variant={"gradient-light"}
                >
                  Deposit
                </Button>
                <Button
                  onClick={() => openModal("TabsModal", { activeTab: 1 })}
                  size="medium"
                  variant={"gradient-light"}
                >
                  Borrow
                </Button>
                <Button
                  onClick={() => openModal("TabsModal", { activeTab: 2 })}
                  size="medium"
                  variant={"gradient-light"}
                >
                  Withdraw
                </Button>
                <Button
                  onClick={() => openModal("TabsModal", { activeTab: 3 })}
                  size="medium"
                  variant={"gradient-light"}
                >
                  Repay
                </Button>
              </Container>
            </div>
          )}
          <div className={styles.row}>
            <Link href={"/markets"} className={styles.back}>
              <Text size={14} theme={500}>
                <Icon glyph={"Arrow"} width={24} height={24} /> Markets
              </Text>
            </Link>
            {isMobile && (
              <Button
                onClick={() => openModal("Loans", null)}
                size={"medium"}
                variant={"purple"}
              >
                <Icon glyph={"Loan"} />
                <Text size={12} theme={600}>
                  Cross-Chain Loan
                </Text>
              </Button>
            )}
          </div>
          <div className={styles.grid}>
            <Column>
              <Token />
              <Stats />
              <Rates />
              <RateModel />
              <Assets />
            </Column>
            <Column>
              <Wallet />
              {!isMobile && (
                <React.Fragment>
                  <Tabs />
                  <Section
                    className={styles.leverage}
                    containerClassName={styles.leverageContainer}
                  >
                    <Leverage />
                  </Section>
                </React.Fragment>
              )}
              <Details />
            </Column>
          </div>
        </Container>
      </section>
    </MarketDataContext.Provider>
  );
};
