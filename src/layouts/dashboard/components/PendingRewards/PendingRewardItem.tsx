import * as React from 'react'
import cx from 'classnames'
import { Button, Skeleton, Table, Text } from '@/components'

import styles from './PendingRewards.module.scss'

type PendingRewardItemProps = {
    isLoading: boolean
}

export const PendingRewardItem: React.FC<PendingRewardItemProps> = ({ isLoading }) => {
    return (
        <Table.Row className={styles.row}>
            <Table.ItemAsset
                icon={'Ethereum'}
                primaryText={'Ethereum'}
                secondaryText={'ETH'}
                isLoading={isLoading}
            />
            <Table.Item>
                {!isLoading ? (
                    <Text size={16} theme={500} className={styles.text}>
                        0.345 ETH
                    </Text>
                ) : (
                    <Skeleton className={cx(styles.skeleton, styles.text)} />
                )}
            </Table.Item>
            <Table.Item>
                {!isLoading ? (
                    <Text size={16} theme={500} className={styles.text}>
                        1,140.643
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
    )
}