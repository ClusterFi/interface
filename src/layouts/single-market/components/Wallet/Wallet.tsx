import React from "react";
import cx from "classnames";
import styles from "./Wallet.module.scss";
import { Button, Heading, Icon, Section, Text } from "@/components";
import { useMarketData } from "../../SingleMarket";
import { useAccount, useBalance } from "wagmi";
import { formatUnits } from "viem";
import { useMultiNetworkStats } from "@/utils/evm/hooks/useMultiNetworkStats";
import { CONTRACT_ADDRESSES } from "@/utils/evm/contracts";
import { formatTokenAmount } from "@/utils/formatters";

export const Wallet: React.FC = () => {
  const { marketData, isLoading: isMarketLoading, chainId } = useMarketData();
  const { address } = useAccount();
  
  const { data: tokenBalance } = useBalance({
    address,
    token: marketData?.underlying,
    chainId,
    query: { enabled: !!marketData?.underlying && !!address && !!chainId },
  });

  const comptrollerAddresses = chainId ? {
    [chainId]: chainId === 11155111 
      ? CONTRACT_ADDRESSES.sepolia.comptroller as `0x${string}`
      : CONTRACT_ADDRESSES.arbitrum_sepolia.comptroller as `0x${string}`
  } : {};

  const { stats: userStats, isPending: isStatsLoading } = useMultiNetworkStats({
    userAddress: address,
    comptrollerAddresses,
  });

  const currentChainStats = userStats.find(stat => 
    chainId === 11155111 ? stat.networkName === "Ethereum Sepolia" :
    chainId === 421614 ? stat.networkName === "Arbitrum Sepolia" : false
  );

  if (isMarketLoading || !marketData) {
    return (
      <Section className={styles.base}>
        <div className={styles.balance}>
          <Text size={12} theme={500} className={styles.balanceTitle}>
            Wallet balance
          </Text>
          <Heading element="h3" className={styles.balanceText}>
            Loading... <span>USDC</span>
          </Heading>
          <Section className={styles.balanceIcon}>
            <Icon glyph={"Wallet"} width={20} height={20} />
          </Section>
        </div>
        <div className={styles.info}>
          <Section className={styles.box}>
            <Text size={12} theme={500} className={styles.boxTitle}>
              Supplied
            </Text>
            <Heading element="h4" className={styles.boxText}>
              Loading... <span>USDC</span>
            </Heading>
            <Text size={12} theme={400} className={styles.boxNote}>
              Loading...
            </Text>
          </Section>
          <Section className={styles.box}>
            <Text size={12} theme={500} className={styles.boxTitle}>
              Borrowed
            </Text>
            <Heading element="h4" className={styles.boxText}>
              Loading... <span>USDC</span>
            </Heading>
            <Text size={12} theme={400} className={styles.boxNote}>
              Loading...
            </Text>
          </Section>
        </div>
      </Section>
    );
  }

  // Calculate actual user positions
  const walletBalance = tokenBalance ? Number(formatUnits(tokenBalance.value, tokenBalance.decimals)) : 0;
  const suppliedAmount = currentChainStats ? currentChainStats.totalCollateralValue / marketData.underlyingPriceUSD : 0;
  const borrowedAmount = currentChainStats ? currentChainStats.borrowValue / marketData.underlyingPriceUSD : 0;
  const suppliedUSD = currentChainStats ? currentChainStats.totalCollateralValue : 0;
  const borrowedUSD = currentChainStats ? currentChainStats.borrowValue : 0;

  return (
    <Section className={styles.base}>
      <div className={styles.balance}>
        <Text size={12} theme={500} className={styles.balanceTitle}>
          Wallet balance
        </Text>
        <Heading element="h3" className={styles.balanceText}>
          {formatTokenAmount(walletBalance, marketData.symbol)} <span>{marketData.symbol}</span>
        </Heading>
        <Section className={styles.balanceIcon}>
          <Icon glyph={"Wallet"} width={20} height={20} />
        </Section>
      </div>
      <div className={styles.info}>
        <Section className={styles.box}>
          <Text size={12} theme={500} className={styles.boxTitle}>
            Supplied
          </Text>
          <Heading element="h4" className={styles.boxText}>
            {formatTokenAmount(suppliedAmount, marketData.symbol)} <span>{marketData.symbol}</span>
          </Heading>
          <Text size={12} theme={400} className={styles.boxNote}>
            ${suppliedUSD.toFixed(2)}
          </Text>
        </Section>
        <Section className={styles.box}>
          <Text size={12} theme={500} className={styles.boxTitle}>
            Borrowed
          </Text>
          <Heading element="h4" className={styles.boxText}>
            {formatTokenAmount(borrowedAmount, marketData.symbol)} <span>{marketData.symbol}</span>
          </Heading>
          <Text size={12} theme={400} className={styles.boxNote}>
            ${borrowedUSD.toFixed(2)}
          </Text>
        </Section>
      </div>
    </Section>
  );
};
