import React from 'react';
import Avatar, { AvatarProps } from '@mui/material/Avatar';
import AvatarGroup, { AvatarGroupProps } from '@mui/material/AvatarGroup';
import { SxProps, Theme } from '@mui/material/styles';

export type CodeplexAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export interface CodeplexAvatarProps extends AvatarProps {
    size?: CodeplexAvatarSize | number;
    alt?: string;
    src?: string;
}

const mapSize = (size: CodeplexAvatarSize | number | undefined): SxProps<Theme> => {
    if (typeof size === 'number') return { width: size, height: size };
    if (!size) return {};

    const sizes: Record<string, number> = {
        xs: 24,
        sm: 32,
        md: 40,
        lg: 48,
        xl: 64,
        xxl: 80,
    };

    const px = sizes[size as string] || 40;
    return { width: px, height: px, fontSize: px / 2 };
};

export const CodeplexAvatar = ({
    size = 'md',
    sx,
    children,
    ...props
}: CodeplexAvatarProps) => {
    return (
        <Avatar
            sx={[
                mapSize(size) as any,
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            {...props}
        >
            {children}
        </Avatar>
    );
};

export interface CodeplexAvatarGroupProps extends AvatarGroupProps {
    total?: number;
}

export const CodeplexAvatarGroup = ({
    children,
    spacing = 'medium',
    max = 5,
    ...props
}: CodeplexAvatarGroupProps) => {
    return (
        <AvatarGroup max={max} spacing={spacing} {...props}>
            {children}
        </AvatarGroup>
    );
};

// Helper function to generate color from string (common MUI pattern)
export const stringAvatar = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i += 1) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    return {
        sx: {
            bgcolor: color,
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1]?.[0] || ''}`,
    };
};
