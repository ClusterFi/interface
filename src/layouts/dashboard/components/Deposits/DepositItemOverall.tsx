import * as React from 'react';
import { Table, Button, Text, Icon } from '@/components';
import styles from './Deposits.module.scss';
import { useMarketInfo } from '@/utils/evm/hooks/useMarketInfo';
import { Currency } from '@/types';
import { useModalsStore } from '@/utils/stores';
import { useAccount } from 'wagmi';

type DepositItemOverallProps = {
  address: `0x${string}`;
};

export const DepositItemOverall: React.FC<DepositItemOverallProps> = ({
  address,
}) => {
  const { data: marketInfo, isPending, error } = useMarketInfo(address);
  const { openModal } = useModalsStore();
  const account = useAccount();

  return (
    <Table.Row className={styles.row}>
      <Table.ItemAsset
        currency={marketInfo?.name as Currency}
        primaryText={marketInfo && marketInfo.name}
      />
      <Table.Item mobileTitle={'Wallet balance'}>0.59998783</Table.Item>
      <Table.Item mobileTitle={'APY'}>1.97%</Table.Item>
      <Table.Item mobileTitle={'Can be collateral'}>
        <Icon glyph={'Check'} width={16} height={16} className={styles.check} />
      </Table.Item>
      <Table.Item>
        {marketInfo && (
          <Button
            className={styles.button}
            size={'small'}
            variant={'purple'}
            onClick={() =>
              openModal('Supply', {
                underlyingAddress: marketInfo.underlying,
                spenderAddress: address,
                chain: { name: 'Arbitrum', icon: 'Arbitrum' },
                asset: {
                  name: marketInfo.name,
                  icon: marketInfo.symbol as Currency,
                },
              })
            }
          >
            <Text size={12} theme={500}>
              {account.isConnected ? 'Supply' : 'Connect'}
            </Text>
          </Button>
        )}
      </Table.Item>
    </Table.Row>
  );
};
