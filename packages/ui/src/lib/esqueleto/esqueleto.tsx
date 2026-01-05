import React from 'react';
import Skeleton, { SkeletonProps } from '@mui/material/Skeleton';

export interface CodeplexEsqueletoProps extends SkeletonProps {
    // Spanish
    variante?: 'text' | 'rectangular' | 'rounded' | 'circular';
    ancho?: number | string;
    alto?: number | string;
    animacion?: 'pulse' | 'wave' | false;
}

export const CodeplexEsqueleto = ({
    variante = 'text',
    ancho,
    alto,
    animacion = 'pulse',
    ...props
}: CodeplexEsqueletoProps) => {

    return (
        <Skeleton
            variant={variante}
            width={ancho}
            height={alto}
            animation={animacion}
            {...props}
        />
    );
};
export const CodeplexSkeleton = CodeplexEsqueleto;
