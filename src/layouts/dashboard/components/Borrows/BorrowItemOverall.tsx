import * as React from 'react';
import Link from 'next/link';
import { Button, Table, Text } from '@/components';
import styles from './Borrows.module.scss';
import { formatCoin, formatUSD } from '@/utils';
import { Currency } from '@/types';
import { useMarketInfo } from '@/utils/evm/hooks/useMarketInfo';
import { useModalsStore } from '@/utils/stores';
import { useAccount } from 'wagmi'; // 👈 dodany import

type BorrowItemOverallProps = {
  address: `0x${string}`;
};

export const BorrowItemOverall: React.FC<BorrowItemOverallProps> = ({
  address,
}) => {
  const { data: marketInfo, isPending, error } = useMarketInfo(address);
  const { openModal } = useModalsStore();
  const { isConnected } = useAccount(); // 👈 sprawdzanie połączenia

  const handleClick = () => {
    if (isConnected) {
      openModal('Borrow', null);
    } else {
      openModal('ConnectWallet', null);
    }
  };

  return (
    <Table.Row className={styles.row} onClick={() => console.log(marketInfo)}>
      <Table.ItemAsset
        currency={marketInfo?.name as Currency}
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
      <Table.Item mobileTitle='APY, borrow rate'>
        {marketInfo?.borrowAPY.toFixed(2)}%
      </Table.Item>
      <Table.Item>
        <div className={styles.buttons}>
          <Button
            className={styles.button}
            size={'small'}
            variant={'purple'}
            onClick={handleClick}
          >
            <Text size={12} theme={500}>
              {isConnected ? 'Borrow' : 'Connect'}
            </Text>
          </Button>
        </div>
      </Table.Item>
    </Table.Row>
  );
};
