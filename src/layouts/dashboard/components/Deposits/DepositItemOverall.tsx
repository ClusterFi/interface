import * as React from "react";
import { Table, Button, Text, Icon, CurrencyIcon } from "@/components";
import styles from "./Deposits.module.scss";
import { useMarketInfo } from "@/utils/evm/hooks/useMarketInfo";
import { Currency } from "@/types";
import { useModalsStore } from "@/utils/stores";
import { useAccount } from "wagmi";
import { ARBITRUM_CHAIN_ID, getChainById, SEPOLIA_CHAIN_ID } from "@/constants";
import { CONTRACT_ADDRESSES } from "@/utils/evm/contracts";
import { useCheckCollateralMembership } from "@/utils/evm/hooks/useCheckCollateralMembership";
import Skeleton from "react-loading-skeleton";
import { useCrossChainBalance } from "@/utils/evm/hooks/useCrossChainBalance";
import { formatTokenAmount } from "@/utils/formatters";

type DepositItemOverallProps = {
  address: `0x${string}`;
  chainId: number;
  cb: () => void;
};

export const DepositItemOverall: React.FC<DepositItemOverallProps> = ({
  address,
  chainId,
  cb,
}) => {
  const { data: marketInfo } = useMarketInfo(address, chainId);
  const { openModal } = useModalsStore();
  const account = useAccount();

  const result = useCrossChainBalance(
    account.address,
    marketInfo?.underlying,
    chainId,
  );

  const chainInfo = getChainById(chainId);

  const getComptrollerAddress = (chainId: number): `0x${string}` => {
    if (chainId === SEPOLIA_CHAIN_ID) {
      return CONTRACT_ADDRESSES.sepolia.comptroller as `0x${string}`;
    } else if (chainId === ARBITRUM_CHAIN_ID) {
      return CONTRACT_ADDRESSES.arbitrum_sepolia.comptroller as `0x${string}`;
    }
    return CONTRACT_ADDRESSES.sepolia.comptroller as `0x${string}`;
  };

  const { isMember, isLoading } = useCheckCollateralMembership(
    getComptrollerAddress(chainId),
    account.address as `0x${string}`,
    address,
    chainId,
  );

  const handleSupplyClick = () => {
    if (marketInfo) {
      openModal("Supply", {
        cb: cb,
        underlyingDecimals: result.data?.decimals!,
        underlyingBalance: result.data?.formatted,
        underlyingAddress: marketInfo.underlying,
        spenderAddress: address,
        chain: {
          name: chainInfo?.name!,
          icon: chainInfo?.currency!,
          chainId: chainId,
        },
        asset: {
          name: marketInfo.name,
          icon: marketInfo.symbol as Currency,
        },
      });
    }
  };

  return (
    <Table.Row className={styles.row}>
      <Table.ItemAsset
        currency={marketInfo?.name as Currency}
        primaryText={marketInfo && marketInfo.name}
      />
      <Table.ItemAmount
        primaryValue={
          result.data?.formatted
            ? formatTokenAmount(parseFloat(result.data.formatted))
            : "—"
        }
        secondaryValue={`${marketInfo?.symbol}`}
        mobileTitle={"Wallet balance"}
      />
      <Table.Item mobileTitle={"APY"}>
        {marketInfo?.supplyAPY.toFixed(2)}%
      </Table.Item>
      <Table.Item mobileTitle="Collateral">
        {isLoading ? (
          <Skeleton width={16} height={16} />
        ) : isMember ? (
          <Icon glyph="Check" width={16} height={16} className={styles.check} />
        ) : (
          <Icon glyph="Cross" width={16} height={16} className={styles.cross} />
        )}
      </Table.Item>
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
        {marketInfo && account.isConnected && (
          <Button
            className={styles.button}
            size={"small"}
            variant={"purple"}
            onClick={handleSupplyClick}
          >
            <Text size={12} theme={500}>
              Supply
            </Text>
          </Button>
        )}
      </Table.Item>
    </Table.Row>
  );
};
