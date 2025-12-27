import React from 'react';
import Skeleton, { SkeletonProps } from '@mui/material/Skeleton';

export interface CodeplexSkeletonProps extends SkeletonProps {
    // Extend standard MUI Skeleton props:
    // variant: 'text' | 'rectangular' | 'rounded' | 'circular'
    // width, height, animation ('pulse' | 'wave' | false)
}

export const CodeplexSkeleton = ({
    variant = 'text',
    animation = 'pulse',
    ...props
}: CodeplexSkeletonProps) => {
    return (
        <Skeleton
            variant={variant}
            animation={animation}
            {...props}
        />
    );
};
