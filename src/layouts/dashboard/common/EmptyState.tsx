import * as React from 'react'

import { Text } from '@/components'

import styles from './styles.module.scss'

type EmptyStateProps = {
    text: string
}

export const EmptyState: React.FC<EmptyStateProps> = ({text}) => (
    <Text size={12} theme={400} className={styles.empty}>
        {text}
    </Text>
)