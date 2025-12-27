import React, { useState } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { styled } from '@mui/material/styles';

export interface CodeplexNumberFieldProps extends Omit<TextFieldProps, 'onChange'> {
    min?: number;
    max?: number;
    step?: number;
    value?: number;
    defaultValue?: number;
    onChange?: (value: number | null) => void;
}

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& input[type=number]': {
        '-moz-appearance': 'textfield',
        '&::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
        },
        '&::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
        },
    },
}));

export const CodeplexNumberField = ({
    min,
    max,
    step = 1,
    value: controlledValue,
    defaultValue,
    onChange,
    InputProps,
    disabled,
    ...props
}: CodeplexNumberFieldProps) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState<string>(
        isControlled
            ? controlledValue?.toString() ?? ''
            : defaultValue?.toString() ?? ''
    );

    const displayValue = isControlled ? (controlledValue?.toString() ?? '') : internalValue;

    const handleChange = (newValue: string) => {
        if (!isControlled) {
            setInternalValue(newValue);
        }

        if (newValue === '') {
            onChange?.(null);
            return;
        }

        const numVal = parseFloat(newValue);
        if (!isNaN(numVal)) {
            onChange?.(numVal);
        }
    };

    const handleIncrement = () => {
        const current = parseFloat(displayValue || '0');
        const next = current + step;
        if (max !== undefined && next > max) return;
        handleChange(next.toString());
    };

    const handleDecrement = () => {
        const current = parseFloat(displayValue || '0');
        const next = current - step;
        if (min !== undefined && next < min) return;
        handleChange(next.toString());
    };

    // Helper to validate buttons state
    const isDecrementDisabled = disabled || (min !== undefined && parseFloat(displayValue || '0') <= min);
    const isIncrementDisabled = disabled || (max !== undefined && parseFloat(displayValue || '0') >= max);

    return (
        <StyledTextField
            type="number"
            value={displayValue}
            onChange={(e) => handleChange(e.target.value)}
            disabled={disabled}
            InputProps={{
                ...InputProps,
                startAdornment: (
                    <InputAdornment position="start">
                        <IconButton
                            onClick={handleDecrement}
                            disabled={isDecrementDisabled}
                            edge="start"
                            size="small"
                            sx={{ color: 'text.secondary' }}
                        >
                            <RemoveIcon fontSize="small" />
                        </IconButton>
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            onClick={handleIncrement}
                            disabled={isIncrementDisabled}
                            edge="end"
                            size="small"
                            sx={{ color: 'text.secondary' }}
                        >
                            <AddIcon fontSize="small" />
                        </IconButton>
                    </InputAdornment>
                ),
                sx: {
                    '& input': { textAlign: 'center' },
                    ...InputProps?.sx
                }
            }}
            {...props}
        />
    );
};
