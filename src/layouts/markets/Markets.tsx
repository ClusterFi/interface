'use client'

import * as React from 'react'
import { useControls } from 'leva'

import { Heading, Container } from '@/components'
import { Market } from './Market/Market'

import styles from './Markets.module.scss'

export const MarketsPage: React.FC = () => {
    const controls = useControls({
        ['Is loading?']: false
    })

    return (
        <section className={styles.base}>
            <Container className={styles.container}>
                <Heading element='h2' as='h1' className={styles.title}>
                    Markets
                </Heading>
                <div className={styles.grid}>
                    <Market 
                        isLoading={controls['Is loading?']}
                        icon={'Ethereum'}
                        name={'Ethereum network'}
                    />
                    <Market 
                        isLoading={controls['Is loading?']}
                        icon={'Solana'}
                        name={'Solana network'}
                    />
                </div>
            </Container>
        </section>
    )
}