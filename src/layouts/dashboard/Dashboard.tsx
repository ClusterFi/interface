'use client'

import * as React from 'react'
import { useControls } from 'leva'

import { Heading, Container } from '@/components'

import { Deposits, Borrows, PendingRewards, Overview } from './components'
import { getState } from './common'

import styles from './Dashboard.module.scss'

export const DashboardPage: React.FC = () => {
    const controls = useControls({
        ['Page State']: {
            options: [
                'Default',
                'Loading',
                'Not Authorized',
                'Empty'
            ],
            value: 'Default'
        },
    })
    const componentState = React.useMemo(() => getState(controls['Page State']), [controls['Page State']])

    return (
        <section className={styles.base}>
            <Container className={styles.container}>
                <Heading element='h2' as='h1' className={styles.title}>
                    My Position
                </Heading>
                <div className={styles.grid}>
                    <div className={styles.row}>
                        <Deposits state={componentState} />
                        <Borrows state={componentState} />
                    </div>
                    <PendingRewards state={componentState} />
                </div>
                <Heading element='h2' className={styles.title}>
                    Overview
                </Heading>
                <Overview state={componentState} />
            </Container>
        </section>
    )
}