import * as React from 'react';
import Link from 'next/link';
import { Button, Table, Text } from '@/components';

import styles from './Borrows.module.scss';
import { formatCoin, formatUSD } from '@/utils';
import { Currency } from '@/types';
import { useMarketInfo } from '@/utils/evm/hooks/useMarketInfo';

type BorrowItemOverallProps = {
  currency: Currency;
  address: `0x${string}`;
};

export const BorrowItemOverall: React.FC<BorrowItemOverallProps> = ({
  currency,
  address,
}) => {
  const { data: marketInfo, isPending, error } = useMarketInfo(address);
  return (
    <Table.Row className={styles.row} onClick={() => console.log(marketInfo)}>
      <Table.ItemAsset
        currency={currency}
        primaryText={marketInfo && marketInfo.name}
        isLoading={isPending}
      />
      <Table.ItemAmount
        primaryValue={formatCoin(
          marketInfo ? Number(marketInfo.cash) / 10 ** marketInfo.decimals : 0
        )}
        secondaryValue={formatCoin(
          marketInfo ? Number(marketInfo.cash) / 10 ** marketInfo.decimals : 0
        )}
        mobileTitle={'Available'}
      />
      <Table.Item mobileTitle='APY, borrow rate'>5.83 - 8.33%</Table.Item>
      <Table.Item>
        <div className={styles.buttons}>
          <Button className={styles.button} size={'small'} variant={'purple'}>
            <Text size={12} theme={500}>
              Borrow
            </Text>
          </Button>
          <Button className={styles.button} size={'small'} variant={'stroke'}>
            <Text size={12} theme={500}>
              Details
            </Text>
          </Button>
        </div>
      </Table.Item>
    </Table.Row>
  );
};
