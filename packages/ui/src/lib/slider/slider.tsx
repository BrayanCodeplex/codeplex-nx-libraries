import React from 'react';
import Slider, { SliderProps } from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

export interface CodeplexSliderProps extends SliderProps {
    label?: string;
    helperText?: string;
    // Allow custom marks or specific simplified props if needed, but standard SliderProps are quite rich
}

// Custom styled slider for a premium feel
const CustomSlider = styled(Slider)(({ theme }) => ({
    height: 6,
    '& .MuiSlider-track': {
        border: 'none',
        borderRadius: 3,
        // Gradient or solid color can be applied here
    },
    '& .MuiSlider-thumb': {
        height: 20,
        width: 20,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&::before': {
            display: 'none',
        },
        // Box shadow for depth
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 32,
        height: 32,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: theme.palette.primary.main,
        transformOrigin: 'bottom left',
        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
        '&::before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
        },
        '& > *': {
            transform: 'rotate(45deg)',
        },
    },
    '& .MuiSlider-mark': {
        backgroundColor: '#bfbfbf',
        height: 8,
        width: 1,
        '&.MuiSlider-markActive': {
            opacity: 1,
            backgroundColor: 'currentColor',
        },
    },
}));

export const CodeplexSlider = ({
    label,
    helperText,
    className,
    sx,
    ...props
}: CodeplexSliderProps) => {
    return (
        <Box sx={{ width: '100%', ...sx }} className={className}>
            {label && (
                <Typography gutterBottom variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    {label}
                </Typography>
            )}
            <CustomSlider
                {...props}
            />
            {helperText && (
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                    {helperText}
                </Typography>
            )}
        </Box>
    );
};
