import * as React from 'react';
import cx from 'classnames';
import { Button, Skeleton, Table, Text } from '@/components';

import styles from './PendingRewards.module.scss';
import { formatCoin, formatUSD } from '@/utils';

type PendingRewardItemProps = {
  isLoading: boolean;
};

export const PendingRewardItem: React.FC<PendingRewardItemProps> = ({
  isLoading,
}) => {
  return (
    <Table.Row className={styles.row}>
      <Table.ItemAsset
        currency={'USDC'}
        primaryText={'USD Coin'}
        secondaryText={'USDC'}
        isLoading={isLoading}
      />
      <Table.Item mobileTitle={'Amount'}>
        {!isLoading ? (
          <Text size={16} theme={500} className={styles.text}>
            {formatCoin(110.34)} USDC
          </Text>
        ) : (
          <Skeleton className={cx(styles.skeleton, styles.text)} />
        )}
      </Table.Item>
      <Table.Item mobileTitle={'Amount, $'}>
        {!isLoading ? (
          <Text size={16} theme={500} className={styles.text}>
            {formatUSD(1140.64)}
          </Text>
        ) : (
          <Skeleton className={cx(styles.skeleton, styles.text)} />
        )}
      </Table.Item>
      <Table.Item>
        {!isLoading ? (
          <Button size={'small'} variant={'stroke'} className={styles.button}>
            <Text size={12} theme={600}>
              Claim reward
            </Text>
          </Button>
        ) : (
          <Skeleton className={cx(styles.skeleton, styles.button)} />
        )}
      </Table.Item>
    </Table.Row>
  );
};
