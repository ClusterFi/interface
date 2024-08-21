import * as React from 'react'
import cx from 'classnames'

import styles from './Section.module.scss'

type SectionProps = React.PropsWithChildren<{
    className?: string
}>

const Section = React.forwardRef<
    React.ElementRef<'section'>,
    React.ComponentPropsWithoutRef<'section'> & SectionProps
>(({ className, children, ...props }, forwardedRef) => (
    <section className={cx(styles.base, className)} {...props} ref={forwardedRef}>
        <div className={styles.container}>
            {children}
        </div>
    </section>
))

Section.displayName = 'Section'
export { Section }
