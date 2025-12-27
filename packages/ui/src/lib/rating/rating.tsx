import React, { useState } from 'react';
import Rating, { RatingProps } from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { styled, useTheme } from '@mui/material/styles';

export type CodeplexRatingSize = 'small' | 'medium' | 'large';
// Mapping legacy sizes for backward compat if needed, or stick to MUI standard.
// Let's stick to MUI standard sizes for simplicity in wrapper, but handle the incoming props if we want to be nice.
// Actually, strict wrapper is better.

export type CodeplexRatingVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

export interface CodeplexRatingProps extends Omit<RatingProps, 'onChange'> {
    value?: number;
    showValue?: boolean;
    tooltips?: string[];
    variant?: CodeplexRatingVariant; // We will use this to color the stars
    onChange?: (value: number | null) => void;
}

// Custom styled rating for different colors
const StyledRating = styled(Rating, {
    shouldForwardProp: (prop) => prop !== 'variantColor',
})<{ variantColor?: string }>(({ theme, variantColor }) => ({
    '& .MuiRating-iconFilled': {
        color: variantColor,
    },
    '& .MuiRating-iconHover': {
        color: variantColor,
    },
}));

const getVariantColor = (variant: CodeplexRatingVariant, theme: any) => {
    switch (variant) {
        case 'primary': return theme.palette.primary.main;
        case 'secondary': return theme.palette.secondary.main;
        case 'success': return theme.palette.success.main;
        case 'warning': return theme.palette.warning.main;
        case 'error': return theme.palette.error.main;
        case 'info': return theme.palette.info.main;
        default: return theme.palette.warning.main;
    }
};

export const CodeplexRating = ({
    value,
    max = 5,
    readOnly,
    size = 'medium',
    variant = 'warning',
    showValue = false,
    tooltips = [],
    className,
    onChange,
    ...props
}: CodeplexRatingProps) => {
    const [hover, setHover] = useState(-1);
    // We rely on styled component to handle theme access via prop passing if possible, 
    // but cleaner is to use useTheme hook or just style it dynamically.
    // However, since we want to suppress the prop from DOM, passing it as transient or filtered is correct.
    // Issue: I can't easily use useTheme inside the component to get the string if I don't import useTheme.
    // Let's import useTheme.
    const theme = useTheme();
    const color = getVariantColor(variant, theme);

    return (
        <Box
            className={className}
            sx={{
                width: 200,
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <StyledRating
                name="codeplex-rating"
                value={value}
                max={max}
                readOnly={readOnly}
                size={size}
                variantColor={color}
                onChange={(event, newValue) => {
                    onChange?.(newValue);
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                {...props}
            />
            {showValue && (
                <Box sx={{ ml: 2, fontSize: '0.875rem', color: 'text.secondary' }}>
                    {value !== null && value !== undefined ? `${value}/${max}` : ''}
                </Box>
            )}
            {tooltips.length > 0 && !readOnly && (
                <Box sx={{ ml: 2, minWidth: 80, fontSize: '0.875rem', fontWeight: 500 }}>
                    {tooltips[hover !== -1 ? hover - 1 : (value || 0) - 1]}
                </Box>
            )}
        </Box>
    );
};
