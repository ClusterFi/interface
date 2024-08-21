import React from 'react'
import cx from 'classnames'

import styles from './Heading.module.scss'

export type HeadingOwnProps<E extends React.ElementType = React.ElementType> = {
  element: 'h1' | 'h2' | 'h3' | 'h4'
  as?: E
}

export type HeadingProps<E extends React.ElementType> = HeadingOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof HeadingOwnProps>

const defaultElement = 'h1'

const classNameByType: Record<HeadingOwnProps['element'], string> = {
  h1: styles.heading1,
  h2: styles.heading2,
  h3: styles.heading3,
  h4: styles.heading4,
}

export function Heading<E extends React.ElementType = typeof defaultElement>({
  children,
  element = 'h1',
  as,
  className,
  ...props
}: HeadingProps<E>) {
  const Element = as || element || defaultElement

  return (
    <Element
      className={cx(styles.heading, classNameByType[element], className)}
      {...props}
    >
      {children}
    </Element>
  )
}
