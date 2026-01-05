import React, { useState } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { styled } from '@mui/material/styles';

export interface CodeplexCampoNumeroProps extends Omit<TextFieldProps, 'onChange'> {
    // Spanish
    minimo?: number;
    maximo?: number;
    paso?: number;
    valor?: number;
    valorPorDefecto?: number;
    alCambiar?: (value: number | null) => void;
}

const CampoNumeroEstilizado = styled(TextField)(({ theme }) => ({
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

export const CodeplexCampoNumero = ({
    InputProps,
    disabled,

    minimo,
    maximo,
    paso = 1,
    valor,
    valorPorDefecto,
    alCambiar,

    ...props
}: CodeplexCampoNumeroProps) => {

    const finalMin = minimo;
    const finalMax = maximo;
    const finalStep = paso;
    const finalValue = valor;
    const finalDefaultValue = valorPorDefecto;
    const finalOnChange = alCambiar;

    const isControlled = finalValue !== undefined;
    const [internalValue, setInternalValue] = useState<string>(
        isControlled
            ? finalValue?.toString() ?? ''
            : finalDefaultValue?.toString() ?? ''
    );

    const displayValue = isControlled ? (finalValue?.toString() ?? '') : internalValue;

    const handleChange = (newValue: string) => {
        if (!isControlled) {
            setInternalValue(newValue);
        }

        if (newValue === '') {
            finalOnChange?.(null);
            return;
        }

        const numVal = parseFloat(newValue);
        if (!isNaN(numVal)) {
            finalOnChange?.(numVal);
        }
    };

    const handleIncrement = () => {
        const current = parseFloat(displayValue || '0');
        const next = current + finalStep;
        if (finalMax !== undefined && next > finalMax) return;
        handleChange(next.toString());
    };

    const handleDecrement = () => {
        const current = parseFloat(displayValue || '0');
        const next = current - finalStep;
        if (finalMin !== undefined && next < finalMin) return;
        handleChange(next.toString());
    };

    // Helper to validate buttons state
    const isDecrementDisabled = disabled || (finalMin !== undefined && parseFloat(displayValue || '0') <= finalMin);
    const isIncrementDisabled = disabled || (finalMax !== undefined && parseFloat(displayValue || '0') >= finalMax);

    return (
        <CampoNumeroEstilizado
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
export const CodeplexNumberField = CodeplexCampoNumero;
