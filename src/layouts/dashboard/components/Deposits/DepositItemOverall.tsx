import * as React from 'react';
import { Table, Button, Text, Icon } from '@/components';
import styles from './Deposits.module.scss';
import { useMarketInfo } from '@/utils/evm/hooks/useMarketInfo';
import { Currency } from '@/types';

type DepositItemOverallProps = {
  address: `0x${string}`;
};

export const DepositItemOverall: React.FC<DepositItemOverallProps> = ({
  address,
}) => {
  const { data: marketInfo, isPending, error } = useMarketInfo(address);
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
        <Button className={styles.button} size={'small'} variant={'purple'}>
          <Text size={12} theme={500}>
            Supply
          </Text>
        </Button>
      </Table.Item>
    </Table.Row>
  );
};
