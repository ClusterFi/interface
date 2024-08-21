import * as React from 'react'

import { Heading } from '@/components'

import styles from './styles.module.scss'

type TitleProps = {
    text: string
}

export const Title: React.FC<TitleProps> = ({ text }) => (
    <Heading element='h4' as={'h2'} className={styles.title}>
        {text}
    </Heading>
)