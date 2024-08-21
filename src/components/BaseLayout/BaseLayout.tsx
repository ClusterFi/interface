'use client'

import * as React from 'react'

import { Footer, Header } from '@/components'
import { useWindowSize } from 'usehooks-ts'
import { Leva } from 'leva'

import styles from './BaseLayout.module.scss'

type BaseLayoutProps = React.PropsWithChildren

const BaseLayout = ({ children }: BaseLayoutProps) => {
    const { width, height } = useWindowSize()

    React.useEffect(() => {
        document.body.style.setProperty('--vw', `${width / 100}px`)
        document.body.style.setProperty('--vh', `${height / 100}px`)
    }, [width, height])

    return (
        <div
            className={styles.base}
        >
            <Header className={styles.header} />
            <main className={styles.content}>{children}</main>
            <Footer className={styles.footer} />
            <Leva />
        </div>
    )
}

export { BaseLayout }
