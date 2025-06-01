import React from "react";
import styles from "./CommonInfo.module.scss";
import { Button, Icon, Text } from "@/components";
import { useAccountSummaryWithOracle } from "@/utils/evm/hooks/useAccountSummaryWithOracle";
import { useAccount, useChainId } from "wagmi";
import { formatCurrency, formatPercentage } from "@/utils/formatters";

export const CommonInfo: React.FC = () => {
  const { address: userAddress } = useAccount();
  const chainId = useChainId();
  const { 
    totalSupplyBalanceUSD, 
    totalCollateralValueUSD, 
    netAPY, 
    isLoading,
    error
  } = useAccountSummaryWithOracle(chainId);

  // Show loading state or no wallet connected
  if (!userAddress) {
    return (
      <div className={styles.info}>
        <Button
          as="div"
          size={"extra-small"}
          variant={"gradient-light"}
          className={styles.infoItem}
        >
          <Text size={12} theme={400}>
            Balance <span>Connect Wallet</span>
          </Text>
        </Button>
        <Button
          title="Net APY from your positions"
          as="div"
          size={"extra-small"}
          variant={"gradient-light"}
          className={styles.infoItem}
        >
          <Text size={12} theme={400}>
            Net APY <span>—</span>
            <Icon glyph={"Info"} width={11} height={11} />
          </Text>
        </Button>
        <Button
          title="Total value of your collateral"
          as="div"
          size={"extra-small"}
          variant={"gradient-light"}
          className={styles.infoItem}
        >
          <Text size={12} theme={400}>
            Collateral <span>—</span>
            <Icon glyph={"Info"} width={11} height={11} />
          </Text>
        </Button>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className={styles.info}>
        <Button
          as="div"
          size={"extra-small"}
          variant={"gradient-light"}
          className={styles.infoItem}
        >
          <Text size={12} theme={400}>
            Balance <span>Error</span>
          </Text>
        </Button>
        <Button
          title="Error loading data"
          as="div"
          size={"extra-small"}
          variant={"gradient-light"}
          className={styles.infoItem}
        >
          <Text size={12} theme={400}>
            Net APY <span>Error</span>
            <Icon glyph={"Info"} width={11} height={11} />
          </Text>
        </Button>
        <Button
          title="Error loading data"
          as="div"
          size={"extra-small"}
          variant={"gradient-light"}
          className={styles.infoItem}
        >
          <Text size={12} theme={400}>
            Collateral <span>Error</span>
            <Icon glyph={"Info"} width={11} height={11} />
          </Text>
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.info}>
      <Button
        as="div"
        size={"extra-small"}
        variant={"gradient-light"}
        className={styles.infoItem}
      >
        <Text size={12} theme={400}>
          Balance <span>{isLoading ? "Loading..." : formatCurrency(totalSupplyBalanceUSD)}</span>
        </Text>
      </Button>
      <Button
        title="Net APY from your supply and borrow positions (supply APY - borrow APY weighted by USD amounts)"
        as="div"
        size={"extra-small"}
        variant={"gradient-light"}
        className={styles.infoItem}
      >
        <Text size={12} theme={400}>
          Net APY <span>{isLoading ? "Loading..." : formatPercentage(netAPY)}</span>
          <Icon glyph={"Info"} width={11} height={11} />
        </Text>
      </Button>
      <Button
        title="Total USD value of your supplied assets that can be used as collateral for borrowing"
        as="div"
        size={"extra-small"}
        variant={"gradient-light"}
        className={styles.infoItem}
      >
        <Text size={12} theme={400}>
          Collateral <span>{isLoading ? "Loading..." : formatCurrency(totalCollateralValueUSD)}</span>
          <Icon glyph={"Info"} width={11} height={11} />
        </Text>
      </Button>
    </div>
  );
};
