import * as React from "react";
import { Button, Table, Text, CurrencyIcon } from "@/components";
import styles from "./Borrows.module.scss";
import { formatCoin, formatUSD } from "@/utils";
import { Currency } from "@/types";
import { useModalsStore } from "@/utils/stores";
import { useAccount } from "wagmi";
import { CHAINS, getChainById } from "@/constants";
import { CONTRACT_ADDRESSES } from "@/utils/evm/contracts";
import { formatTokenAmount } from "@/utils/formatters";

type BorrowItemProps = {
  currency: Currency;
  name: string;
  amount: bigint;
  address?: `0x${string}` | undefined;
  cTokenAddress: `0x${string}`;
  chainId: number;
};

export const BorrowItem: React.FC<BorrowItemProps> = ({
  currency,
  name,
  amount,
  address,
  cTokenAddress,
  chainId,
}) => {
  const { openModal } = useModalsStore();
  const { address: userAddress } = useAccount();
  const chainInfo = getChainById(chainId);

  const handleRepayClick = () => {
    if (!userAddress) return;

    openModal("Repay", {
      chain: {
        name: chainInfo?.name || "Unknown",
        icon: chainInfo?.currency || "Ethereum",
        chainId: chainId,
      },
      asset: {
        name: name,
        icon: currency,
        address: address as `0x${string}`,
        decimals: 6, // USDC decimals
      },
      cTokenAddress: cTokenAddress,
      amount: amount,
    });
  };

  return (
    <Table.Row className={styles.row}>
      <Table.ItemAsset currency={currency} primaryText={name} />
      <Table.ItemAmount
        primaryValue={formatTokenAmount(Number(amount))}
        secondaryValue={"$" + formatUSD(Number(amount))}
        mobileTitle={"Borrows"}
      />
      <Table.ItemAmount
        primaryValue={"8.33%"}
        secondaryValue={""}
        mobileTitle={"APY"}
      />
      <Table.Item mobileTitle="Chain">
        <div className={styles.chainDisplay}>
          <CurrencyIcon
            width={16}
            height={16}
            currency={chainInfo?.currency!}
          />
          <Text size={12} theme={400}>
            {chainInfo?.name}
          </Text>
        </div>
      </Table.Item>

      <Table.Item>
        <div className={styles.buttons}>
          <Button
            className={styles.button}
            size="small"
            variant="stroke"
            onClick={handleRepayClick}
          >
            <Text size={12} theme={500}>
              Repay
            </Text>
          </Button>
        </div>
      </Table.Item>
    </Table.Row>
  );
};
