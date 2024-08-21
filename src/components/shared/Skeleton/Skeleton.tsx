import * as React from 'react'
import cx from 'classnames'
import CustomSkeleton from 'react-loading-skeleton';
import styles from './Skeleton.module.scss'

type SkeletonProps = {
    className?: string
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
    return (
        <CustomSkeleton
            containerClassName={cx(styles.base, className)}
            className={styles.skeleton}
            baseColor={'rgba(185, 187, 241, 0.06)'}
            highlightColor={'rgba(255, 255, 255, 0)'}
        />
    )
}