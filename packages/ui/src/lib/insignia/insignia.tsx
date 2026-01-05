import React from 'react';
import Badge, { BadgeProps } from '@mui/material/Badge';

export interface CodeplexInsigniaProps extends Omit<BadgeProps, 'variant' | 'overlap'> {
    // Spanish
    contenido?: React.ReactNode;
    variante?: 'standard' | 'dot';
    maximo?: number;
    mostrarCero?: boolean;
    superposicion?: 'rectangular' | 'circular';
    color?: BadgeProps['color'];
    invisible?: boolean;
}

export const CodeplexInsignia = ({
    children,
    color = 'primary',
    contenido,
    variante,
    maximo,
    mostrarCero,
    superposicion,
    ...props
}: CodeplexInsigniaProps) => {

    return (
        <Badge
            color={color}
            badgeContent={contenido}
            variant={variante}
            max={maximo}
            showZero={mostrarCero}
            overlap={superposicion}
            {...props}
        >
            {children}
        </Badge>
    );
};
export const CodeplexBadge = CodeplexInsignia;
