import React from 'react';
import Switch, { SwitchProps } from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';

export interface CodeplexInterruptorProps extends Omit<SwitchProps, 'size'> {
    // Spanish
    etiqueta?: string;
    posicionEtiqueta?: 'end' | 'start' | 'top' | 'bottom';
    tamano?: 'small' | 'medium';
}

// Styled Switch for a premium look (iOS-style inspired but adapted)
const InterruptorPersonalizado = styled(Switch)(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.primary.main,
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color: theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
        boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2)', // Nice depth
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

export const CodeplexInterruptor = ({
    etiqueta,
    posicionEtiqueta = 'end',
    tamano = 'medium',
    sx,
    ...props
}: CodeplexInterruptorProps) => {

    const finalSize = tamano || 'medium';

    const switchElement = (
        <InterruptorPersonalizado
            focusVisibleClassName=".Mui-focusVisible"
            disableRipple
            sx={finalSize === 'small' ? { transform: 'scale(0.8)', ...sx } : sx}
            {...props}
        />
    );

    if (etiqueta) {
        return (
            <FormControlLabel
                control={switchElement}
                label={etiqueta}
                labelPlacement={posicionEtiqueta}
            />
        );
    }

    return switchElement;
};
export const CodeplexSwitch = CodeplexInterruptor;
