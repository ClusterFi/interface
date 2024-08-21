import * as React from 'react'
import cx from 'classnames'

import styles from './Container.module.scss'

type ContainerProps = React.PropsWithChildren<{
  className?: string
}>

const Container = React.forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'> & ContainerProps
>(({ children, className, ...props }, forwardedRef) => (
  <div className={cx(styles.base, className)} {...props} ref={forwardedRef}>
    {children}
  </div>
))

Container.displayName = 'Container'
export { Container }
