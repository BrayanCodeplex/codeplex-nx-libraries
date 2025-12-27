import React from 'react';
import Badge, { BadgeProps } from '@mui/material/Badge';

export interface CodeplexBadgeProps extends BadgeProps {
    // Extend directly from MUI BadgeProps
    // Common props: badgeContent, color, max, showZero, variant, overlap, anchorOrigin
}

export const CodeplexBadge = ({
    children,
    color = 'primary',
    ...props
}: CodeplexBadgeProps) => {
    return (
        <Badge
            color={color}
            {...props}
        >
            {children}
        </Badge>
    );
};

