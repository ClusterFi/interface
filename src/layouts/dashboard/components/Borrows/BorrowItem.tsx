import * as React from 'react';
import Link from 'next/link';
import { Button, Table, Text } from '@/components';

import styles from './Borrows.module.scss';
import { formatCoin, formatUSD } from '@/utils';
import { Currency } from '@/types';
import { useModalsStore } from '@/utils/stores';

type BorrowItemProps = {
  currency: Currency;
  name: string;
};

export const BorrowItem: React.FC<BorrowItemProps> = ({ currency, name }) => {
  const { openModal } = useModalsStore();

  const handleRepayClick = () => {
    openModal('BorrowRepay', {
      destinationChain: {
        name: 'Arbitrum',
        icon: 'Arbitrum',
      },
      asset: {
        name: name,
        icon: currency,
      },
      amount: '1540.05',
    });
  };

  return (
    <Table.Row className={styles.row}>
      <Table.ItemAsset currency={currency} primaryText={name} />
      <Table.ItemAmount
        primaryValue={formatCoin(1540.05)}
        secondaryValue={'$' + formatUSD(1539.9)}
        mobileTitle={'Borrows'}
      />
      <Table.ItemAmount
        primaryValue={'8.33%'}
        secondaryValue={'ARB RATE'}
        isSecondaryWrapped
        mobileTitle={'APY'}
      />
      <Table.Item>
        <div className={styles.buttons}>
          <Button
            className={styles.button}
            size={'small'}
            variant={'stroke'}
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
