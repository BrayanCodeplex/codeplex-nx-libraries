import React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export type CodeplexProgresoVariante = 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
export type CodeplexProgresoTamano = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface CodeplexProgresoProps extends Omit<LinearProgressProps, 'variant' | 'color'> {
    // Spanish
    valor?: number;
    maximo?: number;
    etiqueta?: string;
    mostrarPorcentaje?: boolean;
    etiquetaInterna?: boolean;
    indeterminado?: boolean;
    tamano?: CodeplexProgresoTamano;
    variante?: CodeplexProgresoVariante;
    color?: LinearProgressProps['color'];
    rayado?: boolean;
    animado?: boolean;
}

export const CodeplexProgreso = ({
    valor = 0,
    maximo = 100,
    etiqueta,
    mostrarPorcentaje = false,
    etiquetaInterna = false,
    indeterminado = false,
    tamano = 'md',
    variante = 'primary',
    color,
    rayado = false,
    animado = false,

    className = '',
    sx,
    ...props
}: CodeplexProgresoProps) => {

    // Map size to height
    const heightMap = {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
    };
    const height = heightMap[tamano] || 12;

    // Map proprietary variants to MUI colors
    const muiColorMap: Record<string, LinearProgressProps['color']> = {
        primary: 'primary',
        secondary: 'secondary',
        error: 'error',
        danger: 'error',
        info: 'info',
        success: 'success',
        warning: 'warning',
        neutral: 'inherit',
    };

    const muiColor = color || muiColorMap[variante] || 'primary';

    // Normalize value to 0-100 for MUI
    const normalizedValue = Math.min(100, Math.max(0, (valor / maximo) * 100));

    // Custom stripe/animation styles
    const stripeStyles = (rayado || animado) ? {
        backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)',
        backgroundSize: '1rem 1rem',
        ...(animado && {
            animation: 'progress-stripes 1s linear infinite',
            '@keyframes progress-stripes': {
                '0%': { backgroundPosition: '1rem 0' },
                '100%': { backgroundPosition: '0 0' }
            }
        })
    } : {};


    return (
        <Box width="100%" className={className}>
            {/* Outside Label / Percentage */}
            {(!etiquetaInterna && (etiqueta || mostrarPorcentaje)) && (
                <Box display="flex" justifyContent="space-between" mb={0.5}>
                    {etiqueta && (
                        <Typography variant="body2" color="text.secondary" fontWeight={500}>
                            {etiqueta}
                        </Typography>
                    )}
                    {mostrarPorcentaje && (
                        <Typography variant="body2" color="text.secondary" fontWeight={600}>
                            {`${Math.round(normalizedValue)}%`}
                        </Typography>
                    )}
                </Box>
            )}

            <Box position="relative" width="100%">
                <LinearProgress
                    variant={indeterminado ? 'indeterminate' : 'determinate'}
                    value={normalizedValue}
                    color={muiColor}
                    sx={{
                        height,
                        borderRadius: height / 2,
                        // Apply stripes to the bar itself if determinate
                        '& .MuiLinearProgress-bar': {
                            borderRadius: height / 2,
                            ...stripeStyles
                        },
                        ...sx
                    }}
                    {...props}
                />

                {/* Inside Label (Overlay) */}
                {etiquetaInterna && !indeterminado && height >= 12 && (
                    <Box
                        position="absolute"
                        top={0}
                        left={0}
                        bottom={0}
                        width="100%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        zIndex={1}
                    >
                        <Typography variant="caption" sx={{ color: 'white', fontWeight: 'bold', lineHeight: 1, textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                            {etiqueta} {mostrarPorcentaje ? `${Math.round(normalizedValue)}%` : ''}
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};
export const CodeplexProgress = CodeplexProgreso;
