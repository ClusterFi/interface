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
  amount: bigint;
};

export const BorrowItem: React.FC<BorrowItemProps> = ({ currency, name, amount }) => {
  const { openModal } = useModalsStore();

  const formattedAmount = Number(amount).toFixed(2);

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
      amount: formattedAmount,
    });
  };

  return (
    <Table.Row className={styles.row}>
      <Table.ItemAsset currency={currency} primaryText={name} />
      <Table.ItemAmount
        primaryValue={formatCoin(Number(amount))}
        secondaryValue={'$' + formatUSD(Number(amount))}
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
