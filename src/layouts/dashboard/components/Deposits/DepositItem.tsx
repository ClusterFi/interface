import * as React from 'react';
import { Table, Switcher, Button, Text, Icon } from '@/components';
import styles from './Deposits.module.scss';
import { useModalsStore } from '@/utils/stores';
import { useMarketInfo } from '@/utils/evm/hooks/useMarketInfo';
import { Currency } from '@/types';
import { getChainById } from '@/constants';
import { formatUnits } from 'viem';
import {CONTRACT_ADDRESSES} from "@/utils/evm/contracts";
import {useCollateralToggle} from "@/utils/evm/hooks/useCollateralToggle";
import {useAccount} from "wagmi";

type DepositItemProps = {
  address: `0x${string}`;
  amount: bigint;
};

export const DepositItem: React.FC<DepositItemProps> = ({ address, amount }) => {
  const { openModal } = useModalsStore();
  const { address: userAddress } = useAccount();
  const { data: marketInfo, isPending } = useMarketInfo(address);
  const chainInfo = getChainById(11155111);

  let {
    isMember,
    isChecking,
    isPending: isWriting,
    isConfirming,
    toggleCollateral,
    refetch,
  } = useCollateralToggle(CONTRACT_ADDRESSES.sepolia.comptroller as `0x${string}`, userAddress, address);

  const handleWithdrawClick = () => {
    if (marketInfo) {
      openModal('Withdraw', {
        chain: {
          name: chainInfo?.name!,
          icon: chainInfo?.currency!,
        },
        asset: {
          name: marketInfo.name,
          icon: marketInfo.symbol as Currency,
        },
        amount,
        marketInfo,
        cTokenAddress: address,
      });
    }
  };

  if (isPending || !marketInfo) {
    return null;
  }

  const formatted = formatUnits(amount, marketInfo.cTokenDecimals);

  const handleSwitch = async (value: boolean) => {
    await toggleCollateral(value);
    await refetch({ throwOnError: false, cancelRefetch: false });
  };

  return (
    <Table.Row className={styles.row}>
      <Table.ItemAsset
        currency={marketInfo.symbol as Currency}
        primaryText={marketInfo.name}
      />
      <Table.ItemAmount
        primaryValue={formatted}
        secondaryValue={`${marketInfo.symbol}`}
        mobileTitle={'Deposits'}
      />
      <Table.Item mobileTitle={'APY'}>{marketInfo.supplyAPY.toFixed(2)}%</Table.Item>
      <Table.Item mobileTitle="Collateral">
        <Switcher
            className={styles.switcher}
            targetValue={isChecking ? false : isMember}
            onSwitch={handleSwitch}
            disabled={isChecking || isWriting || isConfirming}
        />
      </Table.Item>
      <Table.Item>
        <Button
          className={styles.button}
          size={'small'}
          variant={'stroke'}
          onClick={handleWithdrawClick}
        >
          <Text size={12} theme={500}>
            Withdraw
          </Text>
        </Button>
      </Table.Item>
    </Table.Row>
  );
};
