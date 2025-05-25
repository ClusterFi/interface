import * as React from 'react';
import { Button, Table, Text } from '@/components';
import styles from './Borrows.module.scss';
import { formatCoin, formatUSD } from '@/utils';
import { Currency } from '@/types';
import { useModalsStore } from '@/utils/stores';
import { useAccount } from 'wagmi';

type BorrowItemProps = {
  currency: Currency;
  name: string;
  amount: bigint;
};

export const BorrowItem: React.FC<BorrowItemProps> = ({ currency, name, amount }) => {
  const { openModal } = useModalsStore();
  const { address: userAddress } = useAccount();

  const handleRepayClick = () => {
    if (!userAddress) return;

    openModal('BorrowRepay', {
      destinationChain: {
        name: 'Sepolia',
        icon: 'Ethereum',
        chainId: 11155111,
      },
      asset: {
        name: 'USDC',
        icon: 'USDC',
        address: '0xYourUSDC' as `0x${string}`,
        decimals: 6,
      },
      clgAddress: '0xYourCLGContract' as `0x${string}`,
      borrower: userAddress as `0x${string}`,
      amount: amount,
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
