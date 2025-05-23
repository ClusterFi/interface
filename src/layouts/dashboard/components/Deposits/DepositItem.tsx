import * as React from 'react';
import { formatCoin, formatUSD } from '@/utils';
import { Table, Switcher, Button, Text, Icon } from '@/components';
import styles from './Deposits.module.scss';
import { useModalsStore } from '@/utils/stores';
import { useMarketInfo } from '@/utils/evm/hooks/useMarketInfo';
import { Currency } from '@/types';
import { getChainById } from '@/constants';
import { formatUnits } from 'viem';

type DepositItemProps = {
  address: `0x${string}`;
  amount: bigint;
};



export const DepositItem: React.FC<DepositItemProps> = ({ address, amount }) => {
  const { openModal } = useModalsStore();
  const { data: marketInfo, isPending } = useMarketInfo(address);
  const chainInfo = getChainById(11155111);

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
        supply: Number(amount) / Math.pow(10, marketInfo.decimals),
      });
    }
  };

  if (isPending || !marketInfo) {
    return null;
  }

  const formatted = formatUnits(amount, marketInfo.cTokenDecimals);

  return (
    <Table.Row className={styles.row} onClick={() => console.log(marketInfo.cTokenDecimals, amount)}>
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
      <Table.Item mobileTitle={'Collateral'}>
        <Switcher
          className={styles.switcher}
          targetValue={true}
          onSwitch={(val) => console.log(val)}
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
