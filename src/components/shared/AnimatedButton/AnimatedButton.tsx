'use client'

import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import { motion } from 'framer-motion'
import styles from './AnimatedButton.module.scss'

export function AnimatedButton({
  children,
  size,
  containerClassName,
  className,
  as: Tag = 'button',
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    size: 'default' | 'large'
    as?: React.ElementType
    containerClassName?: string
    className?: string
    duration?: number
    clockwise?: boolean
  } & React.HTMLAttributes<HTMLElement>
>) {
  const [hovered, setHovered] = useState<boolean>(false)
  const [direction, setDirection] = useState<
    'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT'
  >('TOP')

  const rotateDirection = (
    currentDirection: 'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT',
  ) => {
    const directions: ('TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT')[] = [
      'TOP',
      'LEFT',
      'BOTTOM',
      'RIGHT',
    ]
    const currentIndex = directions.indexOf(currentDirection)
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length
    return directions[nextIndex]
  }

  const movingMap = {
    TOP: 'radial-gradient(21% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)',
    LEFT: 'radial-gradient(17% 43% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)',
    BOTTOM:
      'radial-gradient(21% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)',
    RIGHT:
      'radial-gradient(16% 42% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)',
  }

  const highlight =
    'radial-gradient(75% 181% at 50% 50%, #9969FF 0%, rgba(255, 255, 255, 0) 100%)'

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState))
      }, duration * 1000)
      return () => clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hovered])

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cx(styles.container, styles[size], containerClassName, {
        dark: 'dark',
      })}
      {...props}
    >
      <div className={cx(styles.inner, className)}>{children}</div>
      <motion.div
        className={cx(styles.motionDiv)}
        style={{
          filter: `blur(${hovered ? 4 : 3}px)`,
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: 'linear', duration: hovered ? 0.5 : duration }}
      />
      <div className={styles.bgOverlay} />
    </Tag>
  )
}