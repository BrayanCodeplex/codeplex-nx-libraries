import React from 'react';
import Avatar, { AvatarProps } from '@mui/material/Avatar';
import AvatarGroup, { AvatarGroupProps } from '@mui/material/AvatarGroup';
import { SxProps, Theme } from '@mui/material/styles';

export type CodeplexAvatarTamano = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export interface CodeplexAvatarUsuarioProps extends Omit<AvatarProps, 'variant'> {
    // Spanish
    tamano?: CodeplexAvatarTamano | number;
    variante?: AvatarProps['variant'];
}

const mapSize = (size: CodeplexAvatarTamano | number | undefined): SxProps<Theme> => {
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

export const CodeplexAvatarUsuario = ({
    tamano = 'md',
    variante,
    sx,
    children,
    ...props
}: CodeplexAvatarUsuarioProps) => {
    return (
        <Avatar
            variant={variante}
            sx={[
                mapSize(tamano) as any,
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            {...props}
        >
            {children}
        </Avatar>
    );
};

export interface CodeplexGrupoAvataresProps extends Omit<AvatarGroupProps, 'max'> {
    maximo?: number;
    total?: number;
}

export const CodeplexGrupoAvatares = ({
    children,
    spacing = 'medium',
    maximo = 5,
    ...props
}: CodeplexGrupoAvataresProps) => {
    return (
        <AvatarGroup max={maximo} spacing={spacing} {...props}>
            {children}
        </AvatarGroup>
    );
};

// Helper function to generate color from string (common MUI pattern)
export const avatarCadena = (nombre: string) => {
    let hash = 0;
    for (let i = 0; i < nombre.length; i += 1) {
        hash = nombre.charCodeAt(i) + ((hash << 5) - hash);
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
        children: `${nombre.split(' ')[0][0]}${nombre.split(' ')[1]?.[0] || ''}`,
    };
};
export const stringAvatar = avatarCadena;
export const CodeplexAvatarGroup = CodeplexGrupoAvatares;
export const CodeplexAvatar = CodeplexAvatarUsuario;
