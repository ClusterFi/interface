import * as React from 'react'

import { ConnectWalletButton } from '@/components'

import styles from './styles.module.scss'

export const UnauthorizedState: React.FC = () => (
    <div className={styles.unauthorized}>
        <ConnectWalletButton />
    </div>
)