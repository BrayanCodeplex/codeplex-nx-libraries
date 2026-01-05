import React from 'react';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export type CodeplexCargandoTamano = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type CodeplexCargandoColor = 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'white' | 'gray';
export type CodeplexCargandoTipo = 'border' | 'dots' | 'ping';

export interface CodeplexCargandoProps extends Omit<CircularProgressProps, 'size' | 'color'> {
    // Spanish
    tamano?: CodeplexCargandoTamano | number;
    color?: CodeplexCargandoColor;
    tipo?: CodeplexCargandoTipo; // Defaults to border (Standard MUI)
    etiqueta?: string;
    posicionEtiqueta?: 'right' | 'bottom';
    pantallaCompleta?: boolean;
}

export const CodeplexCargando = ({
    tamano = 'md',
    color = 'primary',
    tipo = 'border',
    etiqueta,
    posicionEtiqueta = 'right',
    pantallaCompleta = false,

    className = '',
    sx,
    ...props
}: CodeplexCargandoProps) => {

    const sizeMap = {
        xs: 12,
        sm: 16,
        md: 24,
        lg: 32,
        xl: 48,
    };
    const pxSize = typeof tamano === 'number' ? tamano : sizeMap[tamano as CodeplexCargandoTamano];

    const muiColorMap: Record<string, CircularProgressProps['color']> = {
        primary: 'primary',
        secondary: 'secondary',
        error: 'error',
        danger: 'error',
        info: 'info',
        success: 'success',
        warning: 'warning',
        white: 'inherit', // Handle white/gray via SX usually
        gray: 'inherit',
    };

    const muiColor = muiColorMap[color] || 'primary';
    const textColor = color === 'white' ? 'white' : color === 'gray' ? 'gray' : undefined;

    const renderSpinner = () => {
        if (tipo === 'dots') {
            // Custom Dots implementation (kept for 'rich aesthetics')
            return (
                <Box display="flex" gap={0.5} className={className}>
                    {[0, 1, 2].map((i) => (
                        <Box
                            key={i}
                            sx={{
                                width: pxSize / 4,
                                height: pxSize / 4,
                                borderRadius: '50%',
                                bgcolor: textColor || 'currentColor',
                                animation: 'bounce 1.4s infinite ease-in-out both',
                                animationDelay: `${i * 0.16}s`,
                                '@keyframes bounce': {
                                    '0%, 80%, 100%': { transform: 'scale(0)' },
                                    '40%': { transform: 'scale(1)' },
                                }
                            }}
                        />
                    ))}
                </Box>
            );
        }

        if (tipo === 'ping') {
            // Custom Ping implementation
            return (
                <Box position="relative" display="inline-flex" width={pxSize} height={pxSize} className={className}>
                    <Box
                        sx={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            bgcolor: textColor || (muiColor === 'inherit' ? 'currentColor' : `${muiColor}.main`),
                            opacity: 0.75,
                            animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
                            '@keyframes ping': {
                                '75%, 100%': { transform: 'scale(2)', opacity: 0 }
                            }
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            bgcolor: textColor || (muiColor === 'inherit' ? 'currentColor' : `${muiColor}.main`),
                        }}
                    />
                </Box>
            );
        }

        // Default MUI CircularProgress
        return (
            <CircularProgress
                size={pxSize}
                color={muiColor}
                className={className}
                sx={{
                    color: textColor,
                    ...sx
                }}
                {...props}
            />
        );
    };

    const content = (
        <Box
            display="inline-flex"
            flexDirection={posicionEtiqueta === 'bottom' ? 'column' : 'row'}
            alignItems="center"
            gap={posicionEtiqueta === 'bottom' ? 1.5 : 1}
        >
            {renderSpinner()}
            {etiqueta && (
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                    {etiqueta}
                </Typography>
            )}
        </Box>
    );

    if (pantallaCompleta) {
        return (
            <Box
                position="fixed"
                top={0}
                left={0}
                right={0}
                bottom={0}
                zIndex={9999}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                bgcolor="rgba(255, 255, 255, 0.8)"
                sx={{ backdropFilter: 'blur(4px)' }}
            >
                {content}
            </Box>
        );
    }

    return content;
};
export const CodeplexSpinner = CodeplexCargando;
