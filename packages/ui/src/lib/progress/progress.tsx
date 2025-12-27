import React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export type CodeplexProgressVariant = 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
export type CodeplexProgressSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface CodeplexProgressProps extends Omit<LinearProgressProps, 'variant' | 'color'> {
    value?: number;
    max?: number; // Added to support non-100 max calculations
    label?: string;
    showPercentage?: boolean;
    labelInside?: boolean; // Note: inside labels are hard with standard LinearProgress, effectively separate overlay
    indeterminate?: boolean;
    size?: CodeplexProgressSize;
    variant?: CodeplexProgressVariant; // Maps to color
    color?: LinearProgressProps['color']; // Allow direct MUI color usage
    striped?: boolean; // Custom addition via SX
    animated?: boolean; // Custom addition via SX
}

export const CodeplexProgress = ({
    value = 0,
    max = 100, // Default for compatibility
    label,
    showPercentage = false,
    labelInside = false,
    indeterminate = false,
    size = 'md',
    variant = 'primary',
    color,
    striped = false,
    animated = false,
    className = '',
    sx,
    ...props
}: CodeplexProgressProps) => {

    // Map size to height
    const heightMap = {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
    };
    const height = heightMap[size] || 12;

    // Map proprietary variants to MUI colors
    const muiColorMap: Record<string, LinearProgressProps['color']> = {
        primary: 'primary',
        secondary: 'secondary',
        error: 'error',
        danger: 'error', // Map danger -> error
        info: 'info',
        success: 'success',
        warning: 'warning',
        neutral: 'inherit',
    };

    const muiColor = color || muiColorMap[variant] || 'primary';

    // Normalize value to 0-100 for MUI
    const normalizedValue = Math.min(100, Math.max(0, (value / max) * 100));

    // Custom stripe/animation styles
    const stripeStyles = (striped || animated) ? {
        backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)',
        backgroundSize: '1rem 1rem',
        ...(animated && {
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
            {(!labelInside && (label || showPercentage)) && (
                <Box display="flex" justifyContent="space-between" mb={0.5}>
                    {label && (
                        <Typography variant="body2" color="text.secondary" fontWeight={500}>
                            {label}
                        </Typography>
                    )}
                    {showPercentage && (
                        <Typography variant="body2" color="text.secondary" fontWeight={600}>
                            {`${Math.round(normalizedValue)}%`}
                        </Typography>
                    )}
                </Box>
            )}

            <Box position="relative" width="100%">
                <LinearProgress
                    variant={indeterminate ? 'indeterminate' : 'determinate'}
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
                {labelInside && !indeterminate && height >= 12 && (
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
                            {label} {showPercentage ? `${Math.round(normalizedValue)}%` : ''}
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};
