import React from 'react';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

export interface CodeplexSelectorFechaProps extends Omit<DatePickerProps<Dayjs>, 'label'> {
    // Spanish
    textoAyuda?: string;
    error?: boolean;
    anchoCompleto?: boolean;
    etiqueta?: string;
}

export const CodeplexSelectorFecha = ({
    slotProps,
    textoAyuda,
    error,
    anchoCompleto = true,
    etiqueta,
    sx,
    ...props
}: CodeplexSelectorFechaProps) => {
    return (
        <DatePicker
            label={etiqueta}
            slotProps={{
                ...slotProps,
                textField: {
                    ...slotProps?.textField,
                    helperText: textoAyuda,
                    error: error,
                    fullWidth: anchoCompleto,
                }
            }}
            sx={{ width: anchoCompleto ? '100%' : undefined, ...sx }}
            {...props}
        />
    );
};

