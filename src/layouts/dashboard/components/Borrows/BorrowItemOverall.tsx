import * as React from "react";
import { Button, Table, Text, CurrencyIcon } from "@/components";
import styles from "./Borrows.module.scss";
import { Currency } from "@/types";
import { useMarketInfo } from "@/utils/evm/hooks/useMarketInfo";
import { useModalsStore } from "@/utils/stores";
import { useAccount } from "wagmi";
import { CHAINS, getChainById } from "@/constants";
import { formatTokenAmount } from "@/utils/formatters";

type BorrowItemOverallProps = {
  cb: () => void;
  sourceAddress: `0x${string}`;
  sourceChainId: number;
  destinationChainId: number;
  consolidatedChains?: Array<{
    chainId: number;
    address: `0x${string}`;
  }>;
  isConsolidated?: boolean;
};

export const BorrowItemOverall: React.FC<BorrowItemOverallProps> = ({
  sourceAddress,
  sourceChainId,
  destinationChainId,
  consolidatedChains,
  isConsolidated = false,
  cb,
}) => {
  const {
    data: marketInfo,
    isPending,
    error,
  } = useMarketInfo(sourceAddress, sourceChainId);

  const { data: arbitrumMarketInfo } = useMarketInfo(
    (isConsolidated && consolidatedChains?.[1]?.address) || sourceAddress,
    (isConsolidated && consolidatedChains?.[1]?.chainId) || sourceChainId,
  );

  const { openModal } = useModalsStore();
  const { isConnected } = useAccount();

  if (!marketInfo || error || !marketInfo.isListed) {
    return null;
  }

  const sourceChainInfo = getChainById(sourceChainId);
  const destinationChainInfo = getChainById(destinationChainId);

  const handleClick = () => {
    openModal("Borrow", {
      cb: cb,
      sourceChain: {
        name: sourceChainInfo?.name!,
        icon: sourceChainInfo?.currency!,
        chainId: sourceChainInfo?.chainId ?? CHAINS[0].chainId,
        cTokenAddress: sourceAddress,
      },
      destinationChain: {
        name: destinationChainInfo?.name!,
        icon: destinationChainInfo?.currency!,
        chainId: destinationChainInfo?.chainId ?? CHAINS[1].chainId,
      },
    });
  };

  const handleDetails = () => {
    openModal("Details", {});
  };

  const renderChainDisplay = () => {
    if (isConsolidated && consolidatedChains) {
      return (
        <div className={styles.chainDisplay}>
          <div className={styles.multiChain}>
            {consolidatedChains.map((chain, index) => {
              const chainInfo = getChainById(chain.chainId);
              return (
                <div key={chain.chainId} className={styles.chainItem}>
                  <CurrencyIcon
                    width={16}
                    height={16}
                    currency={chainInfo?.currency!}
                  />
                  <Text size={12} theme={400}>
                    {chainInfo?.name}
                  </Text>
                  {index < consolidatedChains.length - 1}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return (
      <div className={styles.chainDisplay}>
        <CurrencyIcon
          width={16}
          height={16}
          currency={sourceChainInfo?.currency!}
        />
        <Text size={12} theme={400}>
          {sourceChainInfo?.name}
          {sourceChainId !== destinationChainId && (
            <span className={styles.crossChain}>
              {" "}
              → {destinationChainInfo?.name}
            </span>
          )}
        </Text>
      </div>
    );
  };

  return (
    <Table.Row className={styles.row} onClick={() => {}}>
      <Table.ItemAsset
        currency={(marketInfo?.name ?? "Unknown") as Currency}
        primaryText={marketInfo?.name ?? "Unknown"}
        isLoading={isPending}
      />

      <Table.ItemAmount
        primaryValue={
          marketInfo
            ? formatTokenAmount(
                Number(marketInfo.cash) / 10 ** marketInfo.decimals,
                marketInfo.symbol,
              )
            : "0"
        }
        secondaryValue={
          marketInfo
            ? formatTokenAmount(
                Number(marketInfo.cash) / 10 ** marketInfo.decimals,
                marketInfo.symbol,
              )
            : "0"
        }
        mobileTitle="Avaliable Liquidity"
      />

      <Table.Item mobileTitle="APY">
        {isConsolidated && consolidatedChains ? (
          <div className={styles.multiChainApy}>
            {consolidatedChains.map((chain, index) => {
              const chainInfo = getChainById(chain.chainId);
              const apy =
                index === 0
                  ? marketInfo?.borrowAPY
                  : arbitrumMarketInfo?.borrowAPY;
              return (
                <div key={chain.chainId} className={styles.apyItem}>
                  <CurrencyIcon
                    width={12}
                    height={12}
                    currency={chainInfo?.currency!}
                  />
                  <Text size={12} theme={400}>
                    {apy ? `${apy.toFixed(2)}%` : "0%"}
                  </Text>
                </div>
              );
            })}
          </div>
        ) : marketInfo ? (
          `${marketInfo.borrowAPY.toFixed(2)}%`
        ) : (
          "0%"
        )}
      </Table.Item>

      <Table.Item mobileTitle="Chain">{renderChainDisplay()}</Table.Item>

      <Table.Item>
        {isConnected && (
          <div className={styles.buttons}>
            <Button
              className={styles.button}
              size="small"
              variant="purple"
              onClick={handleClick}
            >
              <Text size={12} theme={500}>
                Borrow
              </Text>
            </Button>
            <Button
              className={styles.button}
              size="small"
              variant="stroke"
              onClick={handleDetails}
            >
              <Text size={12} theme={500}>
                Details
              </Text>
            </Button>
          </div>
        )}
      </Table.Item>
    </Table.Row>
  );
};
