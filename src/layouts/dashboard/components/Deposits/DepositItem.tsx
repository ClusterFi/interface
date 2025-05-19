import * as React from 'react';
import { formatCoin, formatUSD } from '@/utils';
import { Table, Switcher, Button, Text } from '@/components';
import styles from './Deposits.module.scss';
import { useModalsStore } from '@/utils/stores';

export const DepositItem: React.FC = () => {
  const { openModal } = useModalsStore();

  const handleWithdrawClick = () => {
    openModal('Withdraw', {
      chain: { name: 'Arbitrum', icon: 'Arbitrum' },
      asset: { name: 'USDC', icon: 'USDC' },
      supply: 0.159,
    });
  };

  return (
    <Table.Row className={styles.row}>
      <Table.ItemAsset currency={'USDC'} primaryText={'USDC'} />
      <Table.ItemAmount
        primaryValue={formatCoin(0.159)}
        secondaryValue={'$' + formatUSD(303.0)}
        mobileTitle={'Deposits'}
      />
      <Table.Item mobileTitle={'APY'}>1.97%</Table.Item>
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
