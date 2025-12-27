import React from 'react';
import ButtonGroup, { ButtonGroupProps } from '@mui/material/ButtonGroup';

export interface CodeplexButtonGroupProps extends ButtonGroupProps {
    // We can add custom props here if needed, or just extend MUI
}

export const CodeplexButtonGroup = ({
    children,
    size = 'medium',
    variant = 'contained',
    color = 'primary',
    ...props
}: CodeplexButtonGroupProps) => {
    return (
        <ButtonGroup
            size={size}
            variant={variant}
            color={color}
            {...props}
        >
            {children}
        </ButtonGroup>
    );
};
