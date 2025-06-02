import * as React from "react";
import { Button, Table, Text } from "@/components";
import styles from "./Borrows.module.scss";
import { formatCoin } from "@/utils";
import { Currency } from "@/types";
import { useMarketInfo } from "@/utils/evm/hooks/useMarketInfo";
import { useModalsStore } from "@/utils/stores";
import { useAccount } from "wagmi";
import { CHAINS, getChainById } from "@/constants";

type BorrowItemOverallProps = {
  sourceAddress: `0x${string}`;
  sourceChainId: number;
  destinationChainId: number;
};

export const BorrowItemOverall: React.FC<BorrowItemOverallProps> = ({
  sourceAddress,
  sourceChainId,
  destinationChainId,
}) => {
  const { data: marketInfo, isPending, error } = useMarketInfo(sourceAddress, sourceChainId);
  const { openModal } = useModalsStore();
  const { isConnected } = useAccount();

  if (!marketInfo || error || !marketInfo.isListed) {
    return null;
  }

  const sourceChainInfo = getChainById(sourceChainId);
  const destinationChainInfo = getChainById(destinationChainId);

  const handleClick = () => {
    if (isConnected) {
      openModal("Borrow", {
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
    } else {
      openModal("ConnectWallet", null);
    }
  };

  const handleDetails = () => {
    openModal("Details", {});
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
            ? formatCoin(Number(marketInfo.cash) / 10 ** marketInfo.decimals)
            : "0"
        }
        secondaryValue={
          marketInfo
            ? formatCoin(Number(marketInfo.cash) / 10 ** marketInfo.decimals)
            : "0"
        }
        mobileTitle="Available"
      />

      <Table.Item mobileTitle="APY, borrow rate">
        {marketInfo ? `${marketInfo.borrowAPY.toFixed(2)}%` : "0%"}
      </Table.Item>

      <Table.Item>
        <div className={styles.buttons}>
          <Button
            className={styles.button}
            size="small"
            variant="purple"
            onClick={handleClick}
          >
            <Text size={12} theme={500}>
              {isConnected ? "Borrow" : "Connect"}
            </Text>
          </Button>
          {isConnected && (
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
          )}
        </div>
      </Table.Item>
    </Table.Row>
  );
};
